import CartPage from "#business/pages/cart.page.js";
import CheckoutPage from "#business/pages/checkout.page.js";

export async function placeOrder(user, address, paymentMethod) {
  await CartPage.openFromIcon();
  await CartPage.proceedToCheckout();
  await CheckoutPage.proceedToAddress(user);
  await CheckoutPage.fillAddress(address);
  await CheckoutPage.pay(paymentMethod);
}
