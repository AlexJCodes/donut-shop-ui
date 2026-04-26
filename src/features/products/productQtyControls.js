/** ------------------------------------------------------- MENU, REMOVING AND ADDING PRODUCTS -------------------------------------------------------------------------- */

export function increaseProductCount(e) { /* Triggered when user is pressing + */
  const clickedBtnId = Number(e.currentTarget.dataset.id); /* Get the id from the buttons dataset */
  const input = document.querySelector(`#amount-${clickedBtnId}`); /* Finding the input for the specific product */

  if (!input) { /* Check if input euqals = null */
    console.error('Could not find input for product id:', clickedBtnId); /* log error message in the console */
    return; /* Abort function */
  }

  input.value = Number(input.value) + 1; /* Add value by 1 to the input (important with Number, else it'd be string value) */

  console.log(`+ clicked | productId=${clickedBtnId} | newValue=${input.value}`);
}

export function decreaseProductCount(e) {
  const clickedBtnId = e.currentTarget.dataset.id;
  const input = document.querySelector(`#amount-${clickedBtnId}`);

  if (!input) {
    console.error('Could not find input for product id:', clickedBtnId);
    return;
  }

  input.value = Math.max(0, Number(input.value) - 1); /* Decrease product by -1, but never below 0 - this function will stop negative donuts */

  console.log(`- clicked | productId=${clickedBtnId} | newValue=${input.value}`);
}