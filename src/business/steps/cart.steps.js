import HomePage from "#business/pages/home.page.js";
import ProductPage from "#business/pages/product.page.js";
import { openProductByName } from "#business/steps/catalog.steps.js";

/**
 * Starts from an empty basket.
 * The application keeps the basket in session storage, and a successful
 * payment does not clear it, so a run has to reset it explicitly.
 */
export async function emptyCart() {
  await HomePage.open();
  await browser.execute(() => window.sessionStorage.clear());
  await browser.refresh();
  await HomePage.waitForProducts();
}

/**
 * Opens a product and puts it into the basket.
 * @returns {Promise<string>} the product title as shown on its details page
 */
export async function addProductToCart(name) {
  await openProductByName(name);
  const title = await ProductPage.getTitle();
  await ProductPage.addToCart();

  return title;
}
