import { products } from "../data/products.js";

/* Shopping cart const */
export const cart = [];

/* Current products to display */
export let currentProducts = [...products];

export function setCurrentProducts(next) {
    currentProducts = next;
}

