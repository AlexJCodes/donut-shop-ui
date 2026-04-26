import { DOM } from "../../utils/dom.js";
import { cart } from "../../state/state.js";


// FORCERA måndag före 10.00 (For testing)
const FORCE_MONDAY_DISCOUNT = false;
// FORCERA helgpåslag 15% (For testing)
const FORCE_WEEKEND_MARKUP = false;

/* ==============================
   ORDER SUMMARY (USD)
   Regler:
   - Mån före 10: 10% rabatt på hela beställningen (subtotal + shipping)
     (visas som text: "Måndagsrabatt: 10 % på hela beställningen")
   - Fre 15:00 -> Mån 03:00: helgpåslag +15% på alla donuts
   - 10+ av samma sort: -10% på den sorten 
   - Frakt: gratis om >15 donuts, annars $2.50 + 10% av subtotal 
   - Invoice: Visas i paymentRules via total > $80
   ============================== */

const MONDAY = 1;
const FRIDAY = 5;
const SUNDAY = 0;

const FREE_ORDER_CODE = "a_damn_fine-cup_of-coffee";

/* ----- Time rules ----- */
export function isMondayDiscountActive(date = new Date()) {
   return date.getDay() === MONDAY && date.getHours() < 10;
}

export function isWeekendMarkupActive(date = new Date()) {

  const day = date.getDay();
  const hour = date.getHours();

  if (day === FRIDAY && hour >= 15) return true; // Fri after 15
  if (day === 6) return true; // Sat
  if (day === SUNDAY) return true; // Sun
  if (day === MONDAY && hour < 3) return true; // Mon before 03:00

  return false;
}

/**
 * getEffectiveUnitPrice(produkt)
 * - helgpåslag +15% (dolt)
 * - bulk -10% om amount >= 10
 */
export function getEffectiveUnitPrice(item, date = new Date()) {
  let unit = Number(item.price);

  if (isWeekendMarkupActive(date)) {
    unit *= 1.15;
  }

  if (Number(item.amount) >= 10) {
    unit *= 0.9;
  }
  return unit;
}

/**
 * getOrderSummaryUSD()
 * Returnerar totals 
 */
export function getOrderSummaryUSD(date = new Date()) {
  // Count donuts
  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    count += Number(cart[i].amount);
  }

  const weekendActive = isWeekendMarkupActive(date);
  const mondayActive = isMondayDiscountActive(date);

  // Subtotal BEFORE bulk discount (men med ev helgpåslag)
  let subtotalBeforeDiscounts = 0;

  // Bulk discount amount 
  let bulkDiscount = 0;

  // För “innan 10”-text
  let closestToBulk = null; // { name, left }

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const amount = Number(item.amount);

    // pris per donut innan bulk men efter helg-påslag
    let unit = Number(item.price);
    if (weekendActive) unit *= 1.15;

    subtotalBeforeDiscounts += unit * amount;

    // bulk-rabatt: 10% på denna sort om amount > 10
    if (amount >= 10) {
      bulkDiscount += unit * amount * 0.10;
    } else {
      const left = 10 - amount;
      if (!closestToBulk || left < closestToBulk.left) {
        closestToBulk = { name: item.name, left };
      }
    }
  }

  // Subtotal AFTER bulk 
  const subtotal = subtotalBeforeDiscounts - bulkDiscount;

  // Shipping
  const freeShipping = count > 15;
  const shipping = freeShipping ? 0 : (2.5 + 0.10 * subtotal);

  // Monday discount: 10% på hela beställningen (subtotal + shipping)
  const mondayDiscount = mondayActive ? 0.10 * (subtotal + shipping) : 0;

  // Total discount 
  const discountTotal = bulkDiscount + mondayDiscount;

  // Discount code override
  const discountCode = DOM.discountCodeInput?.value.trim().toLowerCase() ?? "";
  let total = (subtotal + shipping) - mondayDiscount;

  if (discountCode === FREE_ORDER_CODE) {
    // Discount = ALLT rensas :)
    return {
      count,
      subtotal: 0,
      shipping: 0,
      discount: subtotal + shipping, // visar “hela beloppet” som rabatt
      total: 0,

      mondayActive,
      freeShipping,
      discountCode,
      isFreeOrder: true,

      bulkDiscount,
      mondayDiscount,
      discountTotal: subtotal + shipping,
      closestToBulk,
    };
  }

  return {
    count,
    subtotal,
    shipping,

    // Discount-rad = (bulk + monday)
    discount: discountTotal,

    total: (subtotal + shipping) - mondayDiscount,

    mondayActive,
    freeShipping,
    discountCode,
    isFreeOrder: false,

    // extra info för UI-texter
    bulkDiscount,
    mondayDiscount,
    discountTotal,
    closestToBulk,
  };
}