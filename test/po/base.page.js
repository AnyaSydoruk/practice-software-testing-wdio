export default class BasePage {
  get cartIcon() {
    return $('[data-test="nav-cart"]');
  }
  get cartCounter() {
    return $('[data-test="cart-quantity"]');
  }
  get signInLink() {
    return $('[data-test="nav-sign-in"]');
  }
  get categoriesMenu() {
    return $('[data-test="nav-categories"]');
  }
  get languageSelect() {
    return $('[data-test="language-select"]');
  }

  categoryLink(slug) {
    return $(`[data-test="nav-${slug}"]`);
  }
  languageOption(code) {
    return $(`[data-test="lang-${code}"]`);
  }

  open(path = "") {
    return browser.url(`/${path}`);
  }

  async clickOn(element) {
    await element.waitForClickable({ timeout: 15000 });
    await element.click();
  }

  async typeInto(element, value) {
    await element.waitForDisplayed({ timeout: 15000 });
    await element.clearValue();
    await element.setValue(String(value));
  }

  async getNumber(element) {
    await element.waitForDisplayed({ timeout: 15000 });
    return Number((await element.getText()).replace(/[^0-9.]/g, ""));
  }

  async getTexts(collection) {
    return collection.map((el) => el.getText());
  }

  async getCartCount() {
    await this.cartCounter.waitForDisplayed({ timeout: 15000 });
    return this.getNumber(this.cartCounter);
  }

  async switchLanguage(code) {
    await this.clickOn(this.languageSelect);
    await this.clickOn(this.languageOption(code));
  }
}
