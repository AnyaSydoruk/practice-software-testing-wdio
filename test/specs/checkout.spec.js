import { should } from "chai";
import LoginPage from "../po/login.page.js";
import HomePage from "../po/home.page.js";
import ProductPage from "../po/product.page.js";
import CartPage from "../po/cart.page.js";
import CheckoutPage from "../po/checkout.page.js";
import { EXISTING_USER } from "../data/users.js";
import { CART_PRODUCT } from "../data/products.js";
import { BILLING_ADDRESS, PAYMENT_METHOD } from "../data/checkout.js";

should();

describe("Checkout", () => {
  before(async () => {
    await LoginPage.loginAs(EXISTING_USER);
  });

  after(async () => {
    await HomePage.open();
    await browser.execute(() => window.sessionStorage.clear());
  });

  describe("Scenario: User completes checkout for items in the basket", () => {
    it("should confirm the order", async () => {
      await HomePage.open();
      await browser.execute(() => window.sessionStorage.clear());
      await browser.refresh();
      await HomePage.waitForProducts();
      await HomePage.searchFor(CART_PRODUCT.name);
      await HomePage.openProduct(CART_PRODUCT.name);
      await ProductPage.addToCart();

      await CartPage.openFromIcon();
      await CartPage.proceedToCheckout();
      await CheckoutPage.proceedToAddress(EXISTING_USER);
      await CheckoutPage.fillAddress(BILLING_ADDRESS);
      await CheckoutPage.pay(PAYMENT_METHOD);

      (await CheckoutPage.getSuccessMessage()).should.contain(
        "Payment was successful",
      );
    });
  });
});
