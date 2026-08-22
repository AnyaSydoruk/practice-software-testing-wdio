import BaseAppPage from "#business/pages/base.app.page.js";
import BaseElement from "#core/elements/base.element.js";

/** Product details. Reached by navigation from the catalog, so it has no static path. */
class ProductPage extends BaseAppPage {
  get uniqueElement() {
    return this.title;
  }

  get title() {
    return new BaseElement('h1[data-test="product-name"]', "Product title");
  }

  get unitPrice() {
    return new BaseElement('[data-test="unit-price"]', "Unit price");
  }

  get addToCartButton() {
    return new BaseElement('[data-test="add-to-cart"]', "Add to cart button");
  }

  get addToFavoritesButton() {
    return new BaseElement('[data-test="add-to-favorites"]', "Add to favorites button");
  }

  get brandBadge() {
    return new BaseElement('span[aria-label="brand"]', "Brand badge");
  }

  get categoryBadge() {
    return new BaseElement('span[aria-label="category"]', "Category badge");
  }

  get toast() {
    return new BaseElement("#toast-container", "Toast notification");
  }

  async getTitle() {
    return this.title.getText();
  }

  async getPrice() {
    return this.unitPrice.getNumber();
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.header.cartCounter.waitForDisplayed();
  }

  async addToFavorites() {
    await this.addToFavoritesButton.click();
    await this.toast.waitForDisplayed();
  }

  async getBrand() {
    return this.brandBadge.getText();
  }

  async getCategory() {
    return this.categoryBadge.getText();
  }
}

export default new ProductPage();
