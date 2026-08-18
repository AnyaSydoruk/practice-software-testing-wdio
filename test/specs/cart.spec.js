import { should } from "chai";
import HomePage from "../po/home.page.js";
import ProductPage from "../po/product.page.js";
import CartPage from "../po/cart.page.js";
import { CART_PRODUCT } from "../data/products.js";

should();

describe("Cart", () => {
  beforeEach(async () => {
    await HomePage.open();
    await browser.execute(() => window.sessionStorage.clear());
    await browser.refresh();
    await HomePage.waitForProducts();
    await HomePage.searchFor(CART_PRODUCT.name);
    await HomePage.openProduct(CART_PRODUCT.name);
  });

  describe("Scenario: User adds a product to the basket from the product details page", () => {
    it("should show the added product in the basket", async () => {
      const title = await ProductPage.getTitle();

      await ProductPage.addToCart();

      (await ProductPage.getCartCount()).should.equal(1);
      await CartPage.openFromIcon();
      (await CartPage.getProductTitles()).should.include(title);
    });
  });

  describe("Scenario: User updates the quantity of a product in the basket", () => {
    it("should reflect the new quantity and recalculate the order total", async () => {
      // Given the user has a product in the basket
      await ProductPage.addToCart();
      await CartPage.openFromIcon();
      const unitPrice = await CartPage.getUnitPrice(0);

      await CartPage.setQuantity(0, 3);

      (await CartPage.getQuantity(0)).should.equal(3);
      (await CartPage.getTotal()).should.be.closeTo(unitPrice * 3, 0.01);
    });
  });
});
