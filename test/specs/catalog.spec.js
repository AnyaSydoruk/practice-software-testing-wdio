import { expect } from "chai";
import HomePage from "#business/pages/home.page.js";
import ProductPage from "#business/pages/product.page.js";
import { openCatalog, openProductByName } from "#business/steps/catalog.steps.js";
import {
  CATALOG_PRODUCT,
  HAND_TOOLS_SUBCATEGORIES,
} from "#business/data/constants/products.constants.js";
import { SORT } from "#business/data/constants/sorting.constants.js";

describe("Catalog", () => {
  beforeEach(async () => {
    await openCatalog();
  });

  describe("Scenario: User searches for an exact product by name", () => {
    it("should display the searched product in the results", async () => {
      await HomePage.searchFor(CATALOG_PRODUCT.name);

      expect(await HomePage.getProductNames()).to.include(CATALOG_PRODUCT.name);
    });
  });

  describe("Scenario: User browses products in a specific category", () => {
    it("should list products from the selected category", async () => {
      await HomePage.openCategory(CATALOG_PRODUCT.categorySlug);

      const names = await HomePage.getProductNames();
      expect(names).to.not.be.empty;

      await HomePage.openProduct(names[0]);
      expect(await ProductPage.getCategory()).to.be.oneOf(HAND_TOOLS_SUBCATEGORIES);
    });
  });

  describe("Scenario: User filters products by brand", () => {
    it("should display only products of the selected brand", async () => {
      await HomePage.filterByBrand(CATALOG_PRODUCT.brand);

      const names = await HomePage.getProductNames();
      expect(names).to.not.be.empty;

      await HomePage.openProduct(names[0]);
      expect(await ProductPage.getBrand()).to.equal(CATALOG_PRODUCT.brand);
    });
  });

  describe("Scenario: User sorts products by price", () => {
    it("should order the products from the cheapest to the most expensive", async () => {
      await HomePage.sortBy(SORT.PRICE_ASC);

      const prices = await HomePage.getProductPrices();
      expect(prices).to.not.be.empty;
      expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
    });
  });
});
