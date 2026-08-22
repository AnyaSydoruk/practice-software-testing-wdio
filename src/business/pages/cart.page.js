import BaseAppPage from "#business/pages/base.app.page.js";
import BaseElement from "#core/elements/base.element.js";
import ElementList from "#core/elements/element.list.js";
import AngularInput from "#core/elements/angular.input.js";
import { waitForCondition } from "#core/utils/wait.helper.js";

/** Basket contents. Reached from the header cart icon, so it has no static path. */
class CartPage extends BaseAppPage {
  get uniqueElement() {
    return this.total;
  }

  get productTitles() {
    return new ElementList('[data-test="product-title"]', "Cart product titles");
  }

  get quantityInputs() {
    return new ElementList(
      '[data-test="product-quantity"]',
      "Cart quantity inputs",
      AngularInput,
    );
  }

  get unitPrices() {
    return new ElementList('app-cart [data-test="product-price"]', "Cart unit prices");
  }

  get total() {
    return new BaseElement('[data-test="cart-total"]', "Cart total");
  }

  get proceedButton() {
    return new BaseElement('[data-test="proceed-1"]', "Proceed to checkout button");
  }

  async openFromIcon() {
    await this.header.openCart();
    await this.waitForLoaded();
  }

  async getProductTitles() {
    return this.productTitles.getTexts();
  }

  async getQuantity(index = 0) {
    return Number(await this.quantityInputs.get(index).getValue());
  }

  async setQuantity(index, value) {
    const totalBefore = await this.getTotal();

    await this.quantityInputs.get(index).setValue(value);

    await waitForCondition(async () => {
      const currentTotal = await this.getTotal();
      return currentTotal !== totalBefore && currentTotal > 0;
    }, "Cart total did not recalculate");
  }

  async getUnitPrice(index = 0) {
    return this.unitPrices.get(index).getNumber();
  }

  async getTotal() {
    return this.total.getNumber();
  }

  async proceedToCheckout() {
    await this.proceedButton.click();
  }
}

export default new CartPage();
