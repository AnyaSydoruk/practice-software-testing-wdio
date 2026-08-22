import ProductPage from "#business/pages/product.page.js";
import CartPage from "#business/pages/cart.page.js";
import { emptyCart, addProductToCart } from "#business/steps/cart.steps.js";
import { openProductByName } from "#business/steps/catalog.steps.js";
import { CART_PRODUCT } from "#business/data/constants/products.constants.js";

describe("Cart", () => {
  beforeEach(async () => {
    await emptyCart();
  });

  describe("Scenario: User adds a product to the basket from the product details page", () => {
    it("should show the added product in the basket", async () => {
      await openProductByName(CART_PRODUCT.name);
      const title = await ProductPage.getTitle();

      await ProductPage.addToCart();

      (await ProductPage.header.getCartCount()).should.equal(1);
      await CartPage.openFromIcon();
      (await CartPage.getProductTitles()).should.include(title);
    });
  });

  describe("Scenario: User updates the quantity of a product in the basket", () => {
    it("should reflect the new quantity and recalculate the order total", async () => {
      await addProductToCart(CART_PRODUCT.name);
      await CartPage.openFromIcon();
      const unitPrice = await CartPage.getUnitPrice(0);

      await CartPage.setQuantity(0, 3);

      (await CartPage.getQuantity(0)).should.equal(3);
      (await CartPage.getTotal()).should.be.closeTo(unitPrice * 3, 0.01);
    });
  });
});
