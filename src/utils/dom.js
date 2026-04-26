/**
 * SELECTED DOM ELEMENTS BELOW -----------------------------------------------------------------------------------------------------------------------------------------
 */

/* DOM elements for all filter buttons */
const filledFilterBtn = document.querySelector('[data-category="Filled"]');
const toppedFilterBtn = document.querySelector('[data-category="Topped"]');
const savoryFilterBtn = document.querySelector('[data-category="Savory"]');
const allFilterBtn = document.querySelector('[data-category="All"]');

/* DOM div element for product grid */
const productGrid = document.querySelector('#productGrid');
const templateCard = document.querySelector('#productCardTemplate');

/* Select aria-live status element for screen readers */
const resultStatus = document.querySelector('#resultStatus');

/* DOM select element for sorting */
const sortSelect = document.querySelector('#sortSelect');

/* DOM element for the cart and badge */
const cartBadge = document.querySelector('.cart-badge');
const cartBtn = document.querySelector('.cart-btn');
const cartSection = document.querySelector('#cart');
const cartTotalEl = document.querySelector('#cartTotal');
const checkoutBtn = document.querySelector('#checkoutBtn');
const cartView = document.querySelector('#cartView');
const backToCartBtn = document.querySelector('#backToCartBtn');
const cartSubtotalEl = document.querySelector("#cartSubtotal");
const cartDiscountEl = document.querySelector("#cartDiscount");
const cartShippingEl = document.querySelector("#cartShipping");
const shippingInfoEl = document.querySelector("#shippingInfo");
const discountCodeInput = document.querySelector("#discountCode");
const discountInfoEl = document.querySelector("#discountInfo");
const cartStatus = document.querySelector("#cartStatus");

/* DOM Dialog and content */
const cartDialog = document.querySelector('#cartDialog');
const closeCartBtn = document.querySelector('.cart-dialog__close');
const clearCartBtn = document.querySelector('#clearCartBtn');

const checkoutForm = document.querySelector('#checkoutForm');
const placeOrderBtn = document.querySelector('#placeOrderBtn');
const resetOrderBtn = document.querySelector('#resetOrderBtn');
const checkoutView = document.querySelector('#checkoutView');

const successView = document.querySelector("#successView");
const successMessage = document.querySelector("#successMessage");
const newOrderBtn = document.querySelector("#newOrderBtn");
const orderStatus = document.querySelector('#orderStatus');

const invoiceOption = document.querySelector('#invoiceOption');
const invoiceBlockInfo = document.querySelector('#invoiceBlockInfo');

const invoiceFields = document.querySelector('#invoiceFields');
const cardFields = document.querySelector('#cardFields');
const ssn = document.querySelector('#ssn');

/* Creating a const for later focus (firstName) - for improved UX and A11Y */
const firstNameInput = document.querySelector('#firstName');

export const DOM = {
    filledFilterBtn,
    toppedFilterBtn,
    savoryFilterBtn,
    allFilterBtn,

    productGrid,
    templateCard,
    resultStatus,
    sortSelect,

    cartBadge,
    cartBtn,
    cartSection,
    cartTotalEl,
    checkoutBtn,
    cartView,
    backToCartBtn,
    cartSubtotalEl,
    cartDiscountEl,
    cartShippingEl,
    shippingInfoEl,
    discountCodeInput,
    discountInfoEl,
    cartStatus,

    cartDialog,
    closeCartBtn,
    clearCartBtn,

    checkoutForm,
    placeOrderBtn,
    resetOrderBtn,
    checkoutView,

    successView,
    successMessage,
    newOrderBtn,
    orderStatus,

    invoiceOption,
    invoiceBlockInfo,

    invoiceFields,
    cardFields,
    ssn,

    firstNameInput,
};

/*--------------------------------------------------- A LINE TO SEPARATE SECTIONS ----------------------------------------------------------------------------------------*/

/* Safeguards, if not found or debugging */
export function assertDom() {
    if (!DOM.productGrid) console.error('Could not find product grid element');
    if (!DOM.templateCard) console.error('Could not find #productCardTemplate');
    if (!DOM.resultStatus) console.error('Could not find #resultStatus');
    if (!DOM.cartBadge) console.error('Could not find.cart-badge');
    if (!DOM.cartDialog) console.error('Could not find #cartDialog');
    if (!DOM.cartSection) console.error('Could not find #cart');
    if (!DOM.cartBtn) console.error('Could not find .cart-btn');
    if (!DOM.cartTotalEl) console.error('Could not find #cartTotal');
    if (!DOM.cartView) console.error('Could not find #cartView');
    if (!DOM.checkoutView) console.error('Could not find #checkoutView');
    if (!DOM.backToCartBtn) console.error('Could not find #backToCartBtn');
    if (!DOM.checkoutForm) console.error('Could not find #checkoutForm');
    if (!DOM.placeOrderBtn) console.error('Could not find #placeOrderBtn');
    if (!DOM.resetOrderBtn) console.error('Could not find #resetOrderBtn');
    if (!DOM.invoiceOption) console.error('Could not find #invoiceOption');
    if (!DOM.invoiceFields) console.error('Could not find #invoiceFields');
    if (!DOM.cardFields) console.error('Could not find #cardFields');
    if (!DOM.orderStatus) console.error('Could not find #orderStatus');
    if (!DOM.discountCodeInput) console.error("Could not find #discountCode");
    if (!DOM.cartSubtotalEl) console.error("Could not find #cartSubtotal");
    if (!DOM.cartDiscountEl) console.error("Could not find #cartDiscount");
    if (!DOM.cartShippingEl) console.error("Could not find #cartShipping");
    if (!DOM.discountInfoEl) console.error("Could not find #discountInfo");
    if (!DOM.shippingInfoEl) console.error("Could not find #shippingInfo");
    if (!DOM.successView) console.error("Could not find #successView");
    if (!DOM.successMessage) console.error("Could not find #successMessage");
    if (!DOM.newOrderBtn) console.error("Could not find #newOrderBtn");
    if (!DOM.cartStatus) console.error("Could not find #cartStatus");
}
