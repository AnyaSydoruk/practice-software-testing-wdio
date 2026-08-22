import HomePage from "#business/pages/home.page.js";
import ProductPage from "#business/pages/product.page.js";
import { openProductByName } from "#business/steps/catalog.steps.js";

export async function emptyCart() {
  await HomePage.open();
  await browser.execute(() => window.sessionStorage.clear());
  await browser.refresh();
  await HomePage.waitForProducts();
}

export async function addProductToCart(name) {
  await openProductByName(name);
  const title = await ProductPage.getTitle();
  await ProductPage.addToCart();

  return title;
}
