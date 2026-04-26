import { DOM } from "../../utils/dom.js";
import { getOrderSummaryUSD } from "./orderSummary.js";

/* ==============================
   PAYMENT RULES
   - Invoice blocked if total > $80 
   ============================== */

export function isInvoiceSelected() {
  return DOM.checkoutForm?.elements.payment?.value === "invoice";
}

export function syncPaymentUI() {
  const invoice = isInvoiceSelected();

  DOM.invoiceFields.hidden = !invoice;
  DOM.cardFields.hidden = invoice;

  // Om man byter från invoice → rensa SSN + validation state
  if (!invoice) {
    const input = document.getElementById("ssn");
    if (input) {
      const field = input.closest(".field");
      const errorEl = input.previousElementSibling;

      if (field && errorEl && errorEl.classList.contains("field__error")) {
        input.value = "";
        field.classList.remove("is-invalid", "is-valid");
        errorEl.textContent = "";
        delete input.dataset.touched;
      }
    }
  }
}

export function syncInvoiceAvailability() {
  const { total } = getOrderSummaryUSD();

  // Total > 800 kr (=> > $80) ska invoice inte gå att välja
  const invoiceAllowed = total <= 80;

  DOM.invoiceOption.disabled = !invoiceAllowed;

  if (!invoiceAllowed) {
    DOM.invoiceBlockInfo.textContent =
      "Invoice says: nope. Orders over $80 must be paid by card";

    // Om invoice redan var valt - tvinga card
    if (isInvoiceSelected()) {
      DOM.checkoutForm.elements.payment.value = "card";
      syncPaymentUI();
    }
  } else {
    DOM.invoiceBlockInfo.textContent = "";
  }
}
