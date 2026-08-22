import HomePage from "#business/pages/home.page.js";

/** Opens the catalog and waits for the product grid to render. */
export async function openCatalog() {
  await HomePage.open();
  await HomePage.waitForProducts();
}

/** Searches the catalog for an exact product name and opens its details page. */
export async function openProductByName(name) {
  await HomePage.searchFor(name);
  await HomePage.openProduct(name);
}
