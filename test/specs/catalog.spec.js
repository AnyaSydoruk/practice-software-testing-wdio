import { expect } from "chai";
import HomePage from "../po/home.page.js";
import ProductPage from "../po/product.page.js";
import {
  PRODUCT,
  HAND_TOOLS_SUBCATEGORIES,
  SORT_PRICE_ASC,
} from "../data/products.js";

describe("Catalog", () => {
  beforeEach(async () => {
    await HomePage.open();
    await HomePage.waitForProducts();
  });

  describe("Scenario: User searches for an exact product by name", () => {
    it("should display the searched product in the results", async () => {
      await HomePage.searchFor(PRODUCT.name);
      const names = await HomePage.getProductNames();
      expect(names).to.include(PRODUCT.name);
    });
  });

  describe("Scenario: User browses products in a specific category", () => {
    it("should list products from the selected category", async () => {
      await HomePage.openCategory(PRODUCT.categorySlug);

      const names = await HomePage.getProductNames();
      expect(names).to.not.be.empty;
      await HomePage.openProduct(names[0]);
      expect(await ProductPage.getCategory()).to.be.oneOf(
        HAND_TOOLS_SUBCATEGORIES,
      );
    });
  });

  describe("Scenario: User filters products by brand", () => {
    it("should display only products of the selected brand", async () => {
      await HomePage.filterByBrand(PRODUCT.brand);
      const names = await HomePage.getProductNames();
      expect(names).to.not.be.empty;
      await HomePage.openProduct(names[0]);
      expect(await ProductPage.getBrand()).to.equal(PRODUCT.brand);
    });
  });

  describe("Scenario: User sorts products by price", () => {
    it("should order the products from the cheapest to the most expensive", async () => {
      await HomePage.sortBy(SORT_PRICE_ASC);
      const prices = await HomePage.getProductPrices();
      expect(prices).to.not.be.empty;
      expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
    });
  });
});
