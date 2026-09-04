import HomePage from "#business/pages/home.page.js";

export async function openCatalog() {
  await HomePage.open();
  await HomePage.waitForProducts();
}

export async function openProductByName(name) {
  await HomePage.searchFor(name);
  await HomePage.openProduct(name);
}
