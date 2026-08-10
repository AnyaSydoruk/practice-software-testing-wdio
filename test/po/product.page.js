import BasePage from "./base.page.js";

class ProductPage extends BasePage {
  get title() {
    return $('h1[data-test="product-name"]');
  }
  get unitPrice() {
    return $('[data-test="unit-price"]');
  }
  get addToCartButton() {
    return $('[data-test="add-to-cart"]');
  }

  get favouritesButton() {
    return $('[data-test="add-to-favorites"]');
  }
  get brandBadge() {
    return $('span[aria-label="brand"]');
  }

  get categoryBadge() {
    return $('span[aria-label="category"]');
  }

  get toast() {
    return $("#toast-container");
  }

  async getTitle() {
    await this.title.waitForDisplayed({ timeout: 15000 });
    return (await this.title.getText()).trim();
  }

  async getPrice() {
    return this.getNumber(this.unitPrice);
  }

  async addToCart() {
    await this.clickOn(this.addToCartButton);
    await this.cartCounter.waitForDisplayed({ timeout: 15000 });
  }

  async addToFavourites() {
    await this.clickOn(this.favouritesButton);
    await this.toast.waitForDisplayed({
      timeoutMsg: "No confirmation after adding to favourites",
    });
  }

  async getBrand() {
    await this.brandBadge.waitForDisplayed();
    return (await this.brandBadge.getText()).trim();
  }

  async getCategory() {
    await this.categoryBadge.waitForDisplayed();
    return (await this.categoryBadge.getText()).trim();
  }
}

export default new ProductPage();
