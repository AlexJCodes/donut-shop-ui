import { DOM } from "../../utils/dom.js";
import { stopSlownessTimer } from "./slownessTimer.js";
import { clearOrder } from "./clearOrder.js";

/* ==============================
   SUCCESS VIEW
   ============================== */

export function showSuccessView(message = "Est delivery time: 30 min.") {
  // Stoppa timern när ordern är lagd / success visas
  stopSlownessTimer();

  // Växla vyer
  DOM.cartView.hidden = true;
  DOM.checkoutView.hidden = true;
  DOM.successView.hidden = false;

  // Sätt meddelande
  if (DOM.successMessage) DOM.successMessage.textContent = message;

  // Fokus på new order
  DOM.newOrderBtn?.focus();
}

/* Export*/
export function hideSuccessView() {
  DOM.successView.hidden = true;
}

/* Återställ dialogens UI-state */
export function restoreCartDialogUI() {
  DOM.successView.hidden = true;
  DOM.cartView.hidden = false;
  DOM.checkoutView.hidden = false;

  // Checkout ska starta kollapsad när man kommer tillbaka
  DOM.cartDialog?.classList.remove("is-checkout-open");
}

/* Init: koppla NEW ORDER + close-reset */
export function initSuccessView() {
  // NEW ORDER
  DOM.newOrderBtn?.addEventListener("click", () => {
    clearOrder("New order started.");
    restoreCartDialogUI();
    DOM.checkoutBtn?.focus();
  });

  // CLOSE-knappar med data-close-dialog
  DOM.cartDialog?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-close-dialog]");
    if (!btn) return;
    DOM.cartDialog.close();
  });

  // När dialogen stängs, återställ UI state
  DOM.cartDialog?.addEventListener("close", () => {
    restoreCartDialogUI();
  });
}
