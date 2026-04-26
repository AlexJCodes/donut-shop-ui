import { DOM } from "../../utils/dom.js";
import { cart } from "../../state/state.js";
import { products } from "../../data/products.js";
import { printCart, updateCartTotals } from "./cartView.js";

/** ---------------------------------------------------------- CART ANIMATION, CART COUNT ------------------------------------------------------------------------------- */

function animateCartAdd() { /* A function to animate the cart when adding products */
  if (!DOM.cartBtn) return; /* If cart is empty, abort */

  DOM.cartBtn.classList.add('is-add'); /*Adding a class who will trigger the animation */
  setTimeout(() => {
    DOM.cartBtn.classList.remove('is-add');
  }, 220); /* 220ms animation time by removing the class */
}

export function addProductToCart(e) { // Will be triggered when the user press "ADD"
  const clickedBtnId = Number(e.currentTarget.dataset.id); // Get the product by data-id

  const input = document.querySelector(`#amount-${clickedBtnId}`); // Finding the input for the specific product
  if (!input) {
    console.error('Could not find input for product id:', clickedBtnId); // Log message if <- status message
    return; // Abort
  }

  const amountToAdd = Number(input.value);    // This will read the input value as a number

  if (Number.isNaN(amountToAdd) || amountToAdd <= 0) {    // If amountToAdd is not a valid number, 0 or negative number, do nothing (return)
    console.log('Nothing added (amount is 0 or invalid).');
    return;
  }

  const product = products.find((p) => p.id === clickedBtnId);    // Finding the first product id that is clicked in product array
  if (product === undefined) { // If product not found - (return)
    return;
  }

  const index = cart.findIndex((item) => item.id === clickedBtnId);   // Find the item id in cart

  if (index === -1) {     // Ff theres no product in the cart index would be -1
    const productToCart = { ...product };   //Creates a copy of product so the originalproduct wont be changed
    productToCart.amount = Number(amountToAdd);     // Creates a new property, amount. Convert it to a number with Number.
    cart.push(productToCart);   // Adding a NEW product to the cart.
  }

  else {
    cart[index].amount = Number(cart[index].amount) + amountToAdd;      // If the product is already in the cart add 1.
  }

  if (DOM.cartDialog?.open) {     // This will help update the total in dialog directly
    printCart();
  }

  console.table(cart); // This will help me debug, check what id is clicked and how many that should be added.

  animateCartAdd(); // By running the function it'll trigger the function in my header.

  const btn = e.currentTarget; // Save referens to the button

  btn.classList.add('is-bump'); // Add a class to the button
  setTimeout(() => {
    btn.classList.remove('is-bump'); // Will shortly remove the class
  }, 240);    // 240ms

  input.value = 0; //Will reset input after "buy"

  updateCartTotals(); // Update total amount and badge
}

/* ------------------ Subtract, Add and Remove products in cart --------------------- */
export function decreaseProductFromCart(e) {
  const rowId = Number(e.currentTarget.dataset.id);

  const product = cart.find((p) => p.id === rowId);   // When button is clicked - find product in cart with same id
  if (!product) return;

  product.amount -= 1;    // Subtract 1

  if (product.amount <= 0) {      // Controll if the product could be removed
    const index = cart.findIndex((p) => p.id === rowId);    // Searching for product in cart - return position for product.
    if (index !== -1) cart.splice(index, 1);    // Remove item by one, only if product count is higher than -1
  }

  /* Render and update total */
  printCart();
  updateCartTotals();
}

/* Same principles but add instead */
export function increaseProductFromCart(e) {
  const rowId = Number(e.currentTarget.dataset.id);

  const product = cart.find((p) => p.id === rowId);
  if (!product) return;

  product.amount += 1; // ADD

  printCart();
  updateCartTotals();
}

export function deleteProductFromCart(e) {     // Fetching row index from button
  const rowIndex = Number(e.currentTarget.dataset.id);

  cart.splice(rowIndex, 1);     // Remove product, by 1

  printCart();
  updateCartTotals();   // Re-render the cart and update
}

export function clearCart() {
  cart.length = 0;    // Empty the array
  printCart();    // Render empty cart
  updateCartTotals();     // Total turn 0, badge turn 0
}