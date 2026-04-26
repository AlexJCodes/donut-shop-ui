import { DOM } from "../../utils/dom.js";
import { printCart, updateCartTotals } from "./cartView.js";
import {
  clearCart,
  deleteProductFromCart,
  decreaseProductFromCart,
  increaseProductFromCart,
} from "./cartActions.js";


/* ==============================
   CART DIALOG
   - Öppna/stäng dialog
   - Render cart + totals
   - Event delegation för cart-rader (+ / - / delete)
   ============================== */

export function initCartDialog() {
  // Öppna dialog
  DOM.cartBtn?.addEventListener("click", () => {
    DOM.cartDialog.showModal();

    DOM.cartDialog.classList.remove("is-checkout-open");

    // Render när dialogen öppnas
    printCart();
    updateCartTotals();
  });

    // Stäng dialog
    DOM.closeCartBtn?.addEventListener("click", () => {
    DOM.cartDialog.close();
  });

  // Clear cart
  DOM.clearCartBtn?.addEventListener("click", () => {
    clearCart();
  });

  // ==============================
  // EVENT DELEGATION 
  // ==============================
  DOM.cartSection?.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    const deleteBtn = target.closest("button.delete-product");
    if (deleteBtn) {
      deleteProductFromCart({ currentTarget: deleteBtn });
      return;
    }

    const decBtn = target.closest("button.decrease-cart-product");
    if (decBtn) {
      decreaseProductFromCart({ currentTarget: decBtn });
      return;
    }

    const incBtn = target.closest("button.increase-cart-product");
    if (incBtn) {
      increaseProductFromCart({ currentTarget: incBtn });
      return;
    }
  });
}
