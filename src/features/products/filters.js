import { DOM } from "../../utils/dom.js";
import { products } from "../../data/products.js";
import { setCurrentProducts } from "../../state/state.js";
import { renderProducts } from "./renderProducts.js";

/** ----------------------------------------------------------------- FILTER FUNCTION ----------------------------------------------------------------------------------- */

/**
 * 
 * FILTER / FILLED / TOPPED / SAVORY / ALL
 * ADDING EVENT LISTENERS TO FILTER BUTTONS
 * 
 */

export function initFilters() {
  DOM.filledFilterBtn.addEventListener('click', filterByFilledCategory);
  DOM.toppedFilterBtn.addEventListener('click', filterByToppedCategory);
  DOM.savoryFilterBtn.addEventListener('click', filterBySavoryCategory);
  DOM.allFilterBtn.addEventListener('click', showAllCategories);
}

/*Adding filter functions for all categories*/

function filterByFilledCategory() {
  setCurrentProducts(products.filter((product) => product.category === "Filled"));
  renderProducts();
}

function filterByToppedCategory() {
  setCurrentProducts(products.filter((product) => product.category === "Topped"));
  renderProducts();
}

function filterBySavoryCategory() {
  setCurrentProducts(products.filter((product) => product.category === "Savory"));
  renderProducts();
}

function showAllCategories() {
  setCurrentProducts([...products]);
  renderProducts();
}