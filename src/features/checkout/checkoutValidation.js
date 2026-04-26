import { DOM } from "../../utils/dom.js";
import { REGEX } from "../../utils/regex.js";
import { showSuccessView } from "./successView.js";
import { stopSlownessTimer } from "./slownessTimer.js";

import {
  syncPaymentUI,
  syncInvoiceAvailability,
  isInvoiceSelected,
} from "./paymentRules.js";

/* ==============================
   HELPERS: hitta input + wrapper + error-element
   ============================== */
function getFieldParts(inputId) {
  const input = document.getElementById(inputId);

  if (!input) {
    console.error("Missing input:", inputId);
    return null;
  }

  const field = input.closest(".field");
  const errorEl = field?.querySelector(".field__error");

  if (!field || !errorEl) {
    console.error("HTML structure mismatch for:", inputId);
    return null;
  }

  return { input, field, errorEl };
}


/* ==============================
   HELPERS: sätt valid/invalid styles + error text
   ============================== */
function setInvalid(field, errorEl, message) {
  field.classList.add("is-invalid");
  field.classList.remove("is-valid");

  errorEl.textContent = message;
  errorEl.hidden = false; // 
}

function setValid(field, errorEl) {
  field.classList.remove("is-invalid");
  field.classList.add("is-valid");

  errorEl.textContent = "";
  errorEl.hidden = true; 
}

/* ==============================
   SWEDISH SSN (Luhn)
   ============================== */
function isValidSwedishSSN(raw) {
  const match = raw.match(REGEX.ssnFormat);
  if (!match) return false;

  const datePart = match[1];
  const last4 = match[2];

  const yyMMdd = datePart.length === 8 ? datePart.slice(2) : datePart;

  const digits = (yyMMdd + last4).replace(/\D/g, "");
  if (digits.length !== 10) return false;

  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    let num = Number(digits[i]);

    if (i % 2 === 0) {
      num *= 2;
      if (num > 9) num -= 9;
    }

    sum += num;
  }

  return sum % 10 === 0;
}

/* ==============================
   VALIDATION: validate ett fält
   special: postal / email / phone / ssn / name / address
   ============================== */
function validateInput(inputId, special = "") {
  const parts = getFieldParts(inputId);
  if (!parts) return false;

  const { input, field, errorEl } = parts;
  const value = input.value.trim();

  // Required-check
  if (input.required && value.length === 0) {
    setInvalid(field, errorEl, "This field is required");
    return false;
  }

  // Name
  if (special === "name" && value.length > 0 && !REGEX.name.test(value)) {
    setInvalid(field, errorEl, "Please enter a valid name.");
    return false;
  }

  // Address
  if (special === "address" && value.length > 0 && !REGEX.address.test(value)) {
    setInvalid(field, errorEl, "Please enter a valid address.");
    return false;
  }

  // Only validate formats if user actually typed something
  if (value.length > 0) {
    if (special === "postal" && !REGEX.postalSE.test(value)) {
      setInvalid(field, errorEl, "Postal code must be 12345 or 123 45.");
      return false;
    }

    if (special === "email" && !REGEX.email.test(value)) {
      setInvalid(field, errorEl, "Please enter a valid email.");
      return false;
    }

    if (special === "phone" && !REGEX.phoneSE.test(value)) {
      setInvalid(field, errorEl, "Enter a valid Swedish phone number.");
      return false;
    }

    if (special === "ssn") {
      if (!REGEX.ssnFormat.test(value) || !isValidSwedishSSN(value)) {
        setInvalid(field, errorEl, "Invalid personal number.");
        return false;
      }
    }
  }

  setValid(field, errorEl);
  return true;
}

/* ==============================
   TOUCHED-LOGIK (UX)
   ============================== */
function isTouched(input) {
  return input.dataset.touched === "true";
}

function markTouched(input) {
  input.dataset.touched = "true";
}

function validateIfTouched(inputId, special = "") {
  const parts = getFieldParts(inputId);
  if (!parts) return false;

  // Ingen validering om user inte "touchat" fältet
  if (!isTouched(parts.input)) return true;

  // Validera inte SSN om invoice inte är vald
  if (inputId === "ssn" && !isInvoiceSelected()) return true;

  return validateInput(inputId, special);
}

/* ==============================
   FORM VALIDITY → enable/disable "Place order"
   ============================== */
function checkFormFieldsValidity() {
  // Safe mode: börja med disabled
  DOM.placeOrderBtn.disabled = true;

  const firstNameOk = validateIfTouched("firstName", "name");
  if (!firstNameOk) return;

  const lastNameOk = validateIfTouched("lastName", "name");
  if (!lastNameOk) return;

  const streetOk = validateIfTouched("street", "address");
  if (!streetOk) return;

  const postalOk = validateIfTouched("postal", "postal");
  if (!postalOk) return;

  const cityOk = validateIfTouched("city", "name");
  if (!cityOk) return;

  const phoneOk = validateIfTouched("phone", "phone");
  if (!phoneOk) return;

  const emailOk = validateIfTouched("email", "email");
  if (!emailOk) return;

  if (isInvoiceSelected()) {
    const ssnOk = validateIfTouched("ssn", "ssn");
    if (!ssnOk) return;
  }

  // Consent måste vara ikryssad
  const consent = document.querySelector("#consent");
  if (!consent || !consent.checked) return;

  // Allt OK → enable
  DOM.placeOrderBtn.disabled = false;
}

/* ==============================
   EVENT LISTENERS
   ============================== */
export function initCheckoutValidation() {
  // Safeguard
  if (!DOM.checkoutForm || !DOM.placeOrderBtn) return;

  // När man lämnar ett inputfält → mark touched + re-check
  DOM.checkoutForm.addEventListener("focusout", (e) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    markTouched(e.target);

    // Om SSN och invoice inte är vald → hoppa
    if (e.target.id === "ssn" && !isInvoiceSelected()) return;

    checkFormFieldsValidity();
  });

  // När något ändras (inkl payment-radio) → synca UI + re-check
  DOM.checkoutForm.addEventListener("change", (e) => {
    if (e.target instanceof HTMLInputElement && e.target.name === "payment") {
      syncPaymentUI();
      syncInvoiceAvailability();
    }

    checkFormFieldsValidity();
  });

  // Submit → mark ALLA touched → check → om OK: success
  DOM.checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    DOM.checkoutForm.querySelectorAll("input").forEach((input) => markTouched(input));

    checkFormFieldsValidity();
    if (DOM.placeOrderBtn.disabled) return;

    console.log("ORDER PLACED");

    // Stoppa timern när order läggs
    stopSlownessTimer();

    // Visa success view
    showSuccessView("Order placed. Your donuts are glazing… Est delivery time: 30 min.");
  });

  // Initial sync
  syncPaymentUI();
  syncInvoiceAvailability();
  checkFormFieldsValidity();
}