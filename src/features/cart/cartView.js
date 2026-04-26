import { DOM } from "../../utils/dom.js";
import { cart } from "../../state/state.js";
import { syncInvoiceAvailability } from "../checkout/paymentRules.js";
import { getOrderSummaryUSD, getEffectiveUnitPrice } from "../checkout/orderSummary.js";

/* SVG delete Icon for removing products in dialog */
const deleteIconUrl = `${import.meta.env.BASE_URL}assets/delete_items.svg`;

/* ==============================
   UI: animate total change
   ============================== */
function highlightCartTotalChange() {
  if (!DOM.cartTotalEl) return;

  DOM.cartTotalEl.classList.add("highlight-price");
  setTimeout(() => DOM.cartTotalEl.classList.remove("highlight-price"), 220);
}

function trashSvg() {
  return `<img src="${deleteIconUrl}" alt="" aria-hidden="true" class="trash-icon" />`;
}

/* ==============================
   Bulk discount (10+ same donut)
   - Visas alltid (innan och efter)
   ============================== */
function getBulkDiscountText(amount) {
  const qty = Number(amount);

  if (qty >= 10) {
    return `🍩 Bulk discount applied: -10% (10+ of the same donut)`;
  }

  const left = 10 - qty;
  return `🍩 Bulk deal: buy 10+ of this donut to get -10% (need ${left} more)`;
}

/* ==============================
   TOTALS + SUMMARY UI (USD)
   ============================== */
export function updateCartTotals() {
  const summary = getOrderSummaryUSD();

  DOM.cartSubtotalEl.textContent = `${summary.subtotal.toFixed(2)} $`;
  DOM.cartDiscountEl.textContent = summary.discount > 0 ? `-${summary.discount.toFixed(2)} $` : `0.00 $`;
  DOM.cartShippingEl.textContent = `${summary.shipping.toFixed(2)} $`;
  DOM.cartTotalEl.textContent = `${summary.total.toFixed(2)} $`;

  if (DOM.discountInfoEl) {

    // Discount code
    if (summary.isFreeOrder) {
      DOM.discountInfoEl.textContent = '🔥 Secret code unlocked — Total: absolutely NOTHING.';
    }

    // MÅNDAGSRABATT
    else if (summary.mondayActive) {
      DOM.discountInfoEl.textContent = "Who likes monday mornings anyways? Here, 10% on EVERYTHING";
    }

    // Bulk-rabatt aktiv (10+ av samma sort)
    else if (summary.bulkSavings > 0) {
      DOM.discountInfoEl.textContent = "🍩 Bulk discount unlocked! Donut math is on your side.";
    }

    // Innan 10 (progress-text)
    else if (summary.closestToBulk) {
      DOM.discountInfoEl.textContent = "🍩 Keep stacking… 10+ unlocks the bulk magic.";
    }

    // Annars tomt
      else {
        DOM.discountInfoEl.textContent = "";
      }
  }



  if (DOM.shippingInfoEl) {
    DOM.shippingInfoEl.textContent = summary.freeShipping
      ? "🚚 Free shipping unlocked — your donuts ride first class."
      : "🚚 Shipping: $2.50 + 10% of subtotal. (Tip: More than 15 donuts = free shipping)";
  }

  if (DOM.cartBadge) DOM.cartBadge.textContent = String(summary.count);

  DOM.resetOrderBtn.disabled = cart.length === 0;
  DOM.checkoutBtn.disabled = cart.length === 0;

  highlightCartTotalChange();
  syncInvoiceAvailability();
}

/* ==============================
   PRINT CART
   - Radsummor speglar helgpåslag + bulk-rabatt (dolt i priset)
   - Bulk-rabatten VISAS som info-text
   ============================== */
export function printCart() {

  DOM.cartSection.innerHTML = "";

  if (cart.length === 0) {
    DOM.cartSection.innerHTML = `<p class="cart-empty">No donuts in the stash… yet 🍩</p>`;
    return;
  }

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    // Pris per donut efter helgpåslag + 10% rabatt
    const unit = getEffectiveUnitPrice(item);
    const rowSum = unit * Number(item.amount);

    // Bulk discount text 
    const bulkText = getBulkDiscountText(item.amount);

    DOM.cartSection.innerHTML += `
      <article class="cart-row cart-item" data-product-id="${item.id}">
        <div class="cart-row__name">
          ${item.name}
          <div class="cart-row__bulk">${bulkText}</div>
        </div>

        <button
          type="button"
          class="cart-row__delete delete-product"
          data-id="${i}"
          aria-label="Remove ${item.name} from cart"
        >
          ${trashSvg()}
        </button>

        <div class="cart-row__qty" aria-label="Change amount">
          <button
            type="button"
            class="decrease-cart-product"
            data-id="${item.id}"
            aria-label="Decrease"
          >-</button>

          <span class="cart-row__amount" aria-live="polite">${item.amount}</span>

          <button
            type="button"
            class="increase-cart-product"
            data-id="${item.id}"
            aria-label="Increase"
          >+</button>
        </div>

        <div class="cart-row__sum">${rowSum.toFixed(2)} $</div>
      </article>
    `;
  }
}
