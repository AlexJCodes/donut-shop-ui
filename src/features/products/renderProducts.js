import { DOM } from "../../utils/dom.js";
import { currentProducts } from "../../state/state.js";
import { addProductToCart } from "../cart/cartActions.js";
import { increaseProductCount, decreaseProductCount } from "./productQtyControls.js";

/** ---------------------------------------------------- RENDER THE PRODUCT ARRAY TO TEMPLATE --------------------------------------------------------------------------- */

/**
 * Create function to render products from a product list
 * Empty product grid - making sure its empty before adding new content
 * aria-live feedback for screen readers
 * Loop through products in list
 * Cloning template for each product
 * Fill in product data in cloned template
 * Print products to DOM as product cards
 * @param {Array} list - List of products to render
 * 
 * -----------------------------------------------------
 * 
 * ADD, DECREASE AND BUY PRODUCTS DESCRIPTION BELOW:
 * 
 * Find minus value button
 * Find add value button
 * Find add (buy) button
 * Find the input field
 * 
 * Set data-id to add-button
 * Set data-id to decrease-button
 * Set data-id to buy-button
 * 
 * Set data-id to input
 * Starting value, amount = 0.
 */

export function renderProducts() {
  DOM.productGrid.innerHTML = '';
  DOM.resultStatus.innerHTML = `Showing ${currentProducts.length} donuts.`;

  for (let i = 0; i < currentProducts.length; i++) {
    const product = currentProducts[i];
    const clone = DOM.templateCard.content.cloneNode(true);

    const img = clone.querySelector('.product-card__img');
    img.src = product.img;
    img.alt = product.name;

    const name = clone.querySelector('.product-card__name');
    name.textContent = product.name;

    const price = clone.querySelector('.product-card__price');
    price.textContent = `${product.price} $`;

    const rating = clone.querySelector('.product-card__rating');
    rating.textContent = `Rating: ${product.rating} / 5`;

    const category = clone.querySelector('.product-card__category');
    category.textContent = product.category;

    const decreaseBtn = clone.querySelector('button.decrease');
    const increaseBtn = clone.querySelector('button.increase');
    const buyBtn = clone.querySelector('button.buy');
    const amountInput = clone.querySelector('input.amount');

    increaseBtn.dataset.id = product.id;
    decreaseBtn.dataset.id = product.id;
    buyBtn.dataset.id = product.id;

    amountInput.id = `amount-${product.id}`;
    amountInput.value = 0;

    DOM.productGrid.appendChild(clone);
  }

  /* Get all add (buy) button in the product grid */
  const buyButtons = document.querySelectorAll('#productGrid button.buy')

  /* Loop trough every add-button */
  buyButtons.forEach((btn) => {
    btn.addEventListener('click', addProductToCart);      /* When click on the add button the product is added to cart */
  });

  /* Same principle for add and minus buttons below except different action when button is clicked */
  const increaseButtons = document.querySelectorAll('#productGrid button.increase')

  increaseButtons.forEach((btn) => {
    btn.addEventListener('click', increaseProductCount);
  });

  const decreaseButtons = document.querySelectorAll('#productGrid button.decrease')

  decreaseButtons.forEach((btn) => {
    btn.addEventListener('click', decreaseProductCount);
  });
}