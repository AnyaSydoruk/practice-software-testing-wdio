import BasePage from "./base.page.js";

class CartPage extends BasePage {
  get productTitles() {
    return $$('[data-test="product-title"]');
  }
  get quantityInputs() {
    return $$('[data-test="product-quantity"]');
  }
  get unitPrices() {
    return $$('app-cart [data-test="product-price"]');
  }
  get total() {
    return $('[data-test="cart-total"]');
  }
  get proceedButton() {
    return $('[data-test="proceed-1"]');
  }

  open() {
    return super.open("checkout");
  }

  async openFromIcon() {
    await this.clickOn(this.cartIcon);
    await this.total.waitForDisplayed({ timeout: 15000 });
  }

  async getProductTitles() {
    return (await this.getTexts(this.productTitles)).map((t) => t.trim());
  }

  async getQuantity(index = 0) {
    const inputs = await this.quantityInputs;
    return Number(await inputs[index].getValue());
  }

  async setQuantity(index, value) {
    const before = await this.getTotal();
    const inputs = await this.quantityInputs;
    await inputs[index].click();
    await browser.keys(["Meta", "a"]);
    await inputs[index].setValue(String(value));
    await browser.keys("Tab");
    await browser.waitUntil(async () => (await this.getTotal()) !== before, {
      timeout: 15000,
      timeoutMsg: "Cart total did not recalculate",
    });
  }

  async getUnitPrice(index = 0) {
    const prices = await this.unitPrices;
    return this.getNumber(prices[index]);
  }

  async getTotal() {
    return this.getNumber(this.total);
  }
}

export default new CartPage();
