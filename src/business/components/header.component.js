import BaseComponent from "#core/components/base.component.js";
import BaseElement from "#core/elements/base.element.js";

export default class HeaderComponent extends BaseComponent {
  constructor() {
    super("nav");
  }

  get cartIcon() {
    return new BaseElement(this.child('[data-test="nav-cart"]'), "Cart icon");
  }

  get cartCounter() {
    return new BaseElement(this.child('[data-test="cart-quantity"]'), "Cart counter");
  }

  get homeLink() {
    return new BaseElement(this.child('[data-test="nav-home"]'), "Home link");
  }

  get contactLink() {
    return new BaseElement(this.child('[data-test="nav-contact"]'), "Contact link");
  }

  get categoriesMenu() {
    return new BaseElement(this.child('[data-test="nav-categories"]'), "Categories menu");
  }

  get languageSelect() {
    return new BaseElement(this.child('[data-test="language-select"]'), "Language select");
  }

  categoryLink(slug) {
    return new BaseElement(this.child(`[data-test="nav-${slug}"]`), `Category link "${slug}"`);
  }

  languageOption(code) {
    return new BaseElement(this.child(`[data-test="lang-${code}"]`), `Language option "${code}"`);
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async getCartCount() {
    if (!(await this.cartCounter.isExisting())) {
      return 0;
    }
    return this.cartCounter.getNumber();
  }

  async openCategory(slug) {
    await this.categoriesMenu.click();
    await this.categoryLink(slug).click();
  }

  async switchLanguage(code) {
    await this.languageSelect.click();
    await this.languageOption(code).click();
  }

  async getSelectedLanguage() {
    return this.languageSelect.getText();
  }
}
