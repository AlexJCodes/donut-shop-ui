import { DOM } from "../../utils/dom.js";
import { cart } from "../../state/state.js";

import { syncPaymentUI, syncInvoiceAvailability } from "./paymentRules.js";
import { hideSuccessView } from "./successView.js";
import { clearOrder } from "./clearOrder.js";

import { startSlownessTimer, stopSlownessTimer } from "./slownessTimer.js";;
import { updateCartTotals } from "../cart/cartView.js";
import { getOrderSummaryUSD } from "./orderSummary.js";

// Helpers


function collapseCheckout() {
  DOM.cartDialog?.classList.remove("is-checkout-open");
}

function expandCheckout() {
  DOM.cartDialog?.classList.add("is-checkout-open");
}

/* ==============================
   CHECKOUT VIEW
   - Ingen checkout om 0 donuts
   - CartView och checkoutView - Öppnar checkout vid klick - Scrollar ner till checkout section.
   - Focus på firta input / förnamn
   - Kollar betalalternativ
   - !!Timern startas i cartDialog.js (dialog open)!!
   ============================== */

function openCheckout() {
  if (cart.length === 0) {
    if (DOM.orderStatus) DOM.orderStatus.textContent = "No donuts, no checkout 😅";
    return;
  }

  if (DOM.shippingInfoEl) {
    DOM.shippingInfoEl.textContent = "🍩 We Will hold your donuts for 15 minutes.";
  }

  expandCheckout();

  requestAnimationFrame(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    // Mobil: scrolla ner till checkout, Desktop: låt cart vara kvar i bild
    if (isMobile) {
      DOM.checkoutView?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    DOM.firstNameInput?.focus();
  });


  syncPaymentUI();
  syncInvoiceAvailability();

  startSlownessTimer(() => {
    clearOrder("Too slow! You snooze, you lose. 🍩💨");
  });
}

/* ==============================
   CART VIEW
   - Function, kollapsar checkout-view
   - Scrollar upp till cartview
   - Stoppar "Slowness timer"
   ============================== */

function closeCheckout() {
  collapseCheckout();

  DOM.cartView?.scrollIntoView({ behavior: "smooth", block: "start" });
  DOM.checkoutBtn?.focus();

  stopSlownessTimer();
}

/* ==============================
   FUNCTION - Discount-fält
   ============================== */

function updateDiscountCodeFieldFeedback() {
  // Hämta rabattkod-inputen
  const input = DOM.discountCodeInput;
  if (!input) return; // Safeguard

  // Hämta wrapper och feedback-element
  const field = input.closest(".field");
  const errorEl = input.previousElementSibling;

  // Säkerställ att HTML-strukturen är korrekt
  if (!field || !errorEl) return;

  // Hämta aktuell ordersammanställning
  const summary = getOrderSummaryUSD();

  /* RESET */

  // Ta bort tidigare valideringsstatus
  field.classList.remove("is-valid", "is-invalid");

  // Dölj feedback-text
  errorEl.classList.add("hidden");
  errorEl.textContent = "";

  if (summary.isFreeOrder) {
    // Markera fältet som giltigt
    field.classList.add("is-valid");

    //
    errorEl.textContent = '🔥 Secret code unlocked — Total: absolutely NOTHING.';

    // Gör feedback synlig (aria-live)
    errorEl.classList.remove("hidden");
    return;
  }

  if (input.value.trim().length > 0) {
    // Markera fältet ogiltigt
    field.classList.add("is-invalid");

    // Visa hint
    errorEl.textContent = "👀 Not quite… try again.";

    errorEl.classList.remove("hidden");
  }
}

/* ==============================
   DOM REG
   - Checkout startar kollapsad
   - Discount code (live feedback / lite skoj :) 
   - Uppdatera totals
   - Nollställer varor och input field
   - Ny order!
   ============================== */

export function initCheckoutView() {
  DOM.checkoutBtn?.addEventListener("click", openCheckout);
  DOM.backToCartBtn?.addEventListener("click", closeCheckout);

  DOM.discountCodeInput?.addEventListener("input", () => {
  updateCartTotals();
  updateDiscountCodeFieldFeedback();
  });

  updateCartTotals();

  DOM.resetOrderBtn?.addEventListener("click", () => {
    clearOrder("Order cleared.");
  });
}
