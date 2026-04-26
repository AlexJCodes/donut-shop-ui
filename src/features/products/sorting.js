import { DOM } from "../../utils/dom.js";
import { products } from "../../data/products.js";
import { currentProducts, setCurrentProducts } from "../../state/state.js";
import { renderProducts } from "./renderProducts.js";

/** --------------------------------------------------------------- SORTING FUNCTIONS ----------------------------------------------------------------------------------- */

/**
 * 
 * SORTING / PRICE / RATING / NAME / CATEGORY
 * ADDING EVENT LISTENER TO SORT SELECT
 * ADDING SORT FUNCTIONS
 * Rendering products after sorting
 * 
 */

export function initSorting() {
  DOM.sortSelect.addEventListener('change', sortProducts);
}

/* Adding event listener to sort select example, "price-asc" , "name-asc" */
function sortProducts() {
  const value = DOM.sortSelect.value; /* Get selected value from sort select */

  /* Standard list (default) */
  if (value === 'default') {
    setCurrentProducts([...products]);
    renderProducts();
    return;
  }

  const list = [...currentProducts];

  /* Sorting by name ascending from A-Z */
  if (value === 'name-asc') {
    list.sort(function (a, b) {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }

  /* Sorting by price ascending from LOW-TO-HIGH */
  if (value === 'price-asc') {
    list.sort(function (a, b) {
      return a.price - b.price;
    });
  }

  /* Sorting by rating descending from HIGH-TO-LOW */
  if (value === 'rating-desc') {
    list.sort(function (a, b) {
      return b.rating - a.rating;
    });
  }

  /* Sorting by category descending from A-Z */
  if (value === 'category-desc') {
    list.sort(function (a, b) {
      const categoryA = a.category.toUpperCase();
      const categoryB = b.category.toUpperCase();

      if (categoryA < categoryB) return -1;
      if (categoryA > categoryB) return 1;
      return 0;
    });
  }

  setCurrentProducts(list);
  renderProducts();
}