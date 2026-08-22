import LoginPage from "#business/pages/login.page.js";
import CheckoutPage from "#business/pages/checkout.page.js";
import { emptyCart, addProductToCart } from "#business/steps/cart.steps.js";
import { placeOrder } from "#business/steps/checkout.steps.js";
import { EXISTING_USER } from "#business/data/users.js";
import { CART_PRODUCT } from "#business/data/constants/products.constants.js";
import {
  BILLING_ADDRESS,
  PAYMENT_METHOD,
} from "#business/data/constants/checkout.constants.js";

describe("Checkout", () => {
  before(async () => {
    await LoginPage.loginAs(EXISTING_USER);
  });

  after(async () => {
    await emptyCart();
  });

  describe("Scenario: User completes checkout for items in the basket", () => {
    it("should confirm the order", async () => {
      await emptyCart();
      await addProductToCart(CART_PRODUCT.name);

      await placeOrder(EXISTING_USER, BILLING_ADDRESS, PAYMENT_METHOD);

      (await CheckoutPage.getSuccessMessage()).should.contain("Payment was successful");
    });
  });
});
