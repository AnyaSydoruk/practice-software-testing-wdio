import CartPage from "#business/pages/cart.page.js";
import CheckoutPage from "#business/pages/checkout.page.js";

/**
 * Walks the checkout wizard from the basket to the payment confirmation.
 * @param {object} user credentials, used when the wizard asks to sign in
 * @param {object} address billing address
 * @param {string} paymentMethod value of the payment method option
 */
export async function placeOrder(user, address, paymentMethod) {
  await CartPage.openFromIcon();
  await CartPage.proceedToCheckout();
  await CheckoutPage.proceedToAddress(user);
  await CheckoutPage.fillAddress(address);
  await CheckoutPage.pay(paymentMethod);
}
