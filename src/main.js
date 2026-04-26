import "./styles/style.scss";

/* Vite base URL - images work locally and on GitHub Pages
   `${import.meta.env.BASE_URL}`
*/

import { assertDom } from "./utils/dom.js";

/* Products */
import { renderProducts } from "./features/products/renderProducts.js";
import { initFilters } from "./features/products/filters.js";
import { initSorting } from "./features/products/sorting.js";

/* Cart */
import { initCartDialog } from "./features/cart/cartDialog.js";

/* Checkout */
import { initCheckoutView } from "./features/checkout/checkoutView.js";
import { initCheckoutValidation } from "./features/checkout/checkoutValidation.js";

/* Success view */
import { initSuccessView } from "./features/checkout/successView.js";

/* ==============================
   BOOTSTRAP
   ============================== */
assertDom();

/* ==============================
   INIT (event listeners)
   ============================== */
initFilters();
initSorting();

initCartDialog();

initCheckoutView();
initCheckoutValidation();
initSuccessView(); // ← viktigt

/* ==============================
   INITIAL RENDER
   ============================== */
renderProducts();
