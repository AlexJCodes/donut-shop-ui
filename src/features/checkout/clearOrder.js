import { DOM } from "../../utils/dom.js";
import { cart } from "../../state/state.js";
import { printCart, updateCartTotals } from "../cart/cartView.js";
import { syncPaymentUI, syncInvoiceAvailability } from "./paymentRules.js";
import { stopSlownessTimer } from "./slownessTimer.js";

/* ==============================
   CLEAR ORDER
   - Tömmer cart + resetar form + rensar validation state
   - Synkar payment/invoice regler
   - Renderar om cart + totals
   - Återställer vy till cart
   - Stoppar 15-min timern
   ============================== */

export function clearOrder(message = "Too slow! You snooze, you lose. Order cleared..") {
  console.log("cartStatus element:", DOM.cartStatus);
  // Stoppa timern så den inte ligger kvar
  stopSlownessTimer();

  // Töm varukorgen
  cart.length = 0;

  // Reset checkout-form
  DOM.checkoutForm?.reset();

  // Rensa validation state (touched + classes + error text)
  DOM.checkoutForm?.querySelectorAll("input").forEach((input) => {
    delete input.dataset.touched;

    const field = input.closest(".field");
    if (field) field.classList.remove("is-valid", "is-invalid");

    const errorEl = input.previousElementSibling;
    if (errorEl && errorEl.classList.contains("field__error")) {
      errorEl.textContent = "";
      errorEl.classList.add("hidden");
    }
  });

  // Synka payment UI + invoice-regeln
  syncPaymentUI();
  syncInvoiceAvailability();

  // Rendera om cart + totals
  printCart();
  updateCartTotals();

  /* ==============================
   Statusmeddelande (synligt i cart)
   ============================== */

  // Visa i cartens info-rad 

  if (DOM.cartStatus) {
    DOM.cartStatus.textContent = message;

    window.setTimeout(() => {
      if (DOM.cartStatus) DOM.cartStatus.textContent = "";
    }, 3500);

    console.log("cartView hidden?", DOM.cartView?.hidden);
  }
}