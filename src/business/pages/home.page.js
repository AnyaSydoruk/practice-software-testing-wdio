import BaseAppPage from "#business/pages/base.app.page.js";
import BaseElement from "#core/elements/base.element.js";
import Input from "#core/elements/input.js";
import Dropdown from "#core/elements/dropdown.js";
import ElementList from "#core/elements/element.list.js";
import { TIMEOUTS } from "#core/config/timeouts.js";
import { waitForCondition, waitForUrlToContain } from "#core/utils/wait.helper.js";

class HomePage extends BaseAppPage {
  get path() {
    return "";
  }

  get uniqueElement() {
    return this.searchInput;
  }

  get searchInput() {
    return new Input('[data-test="search-query"]', "Search input");
  }

  get searchButton() {
    return new BaseElement('[data-test="search-submit"]', "Search button");
  }

  get sortSelect() {
    return new Dropdown('[data-test="sort"]', "Sort dropdown");
  }

  get productNames() {
    return new ElementList('[data-test="product-name"]', "Product names");
  }

  get productPrices() {
    return new ElementList('[data-test="product-price"]', "Product prices");
  }

  productCard(name) {
    return new BaseElement(
      `//h5[@data-test="product-name" and contains(normalize-space(.), "${name}")]/ancestor::a[contains(@class,"card")]`,
      `Product card "${name}"`,
    );
  }

  brandFilter(name) {
    return new BaseElement(
      `//label[contains(normalize-space(.), "${name}")]/input[@name="brand_id"]`,
      `Brand filter "${name}"`,
    );
  }

  /** The demo site occasionally serves an empty grid; one reload is allowed. */
  async waitForProducts(timeout = TIMEOUTS.LONG) {
    try {
      await this.productNames.waitForAny(timeout);
    } catch {
      await browser.refresh();
      await this.productNames.waitForAny(timeout);
    }
  }

  /**
   * Runs an action that re-queries the catalog and waits for the grid to change.
   * @param {() => Promise<void>} action
   */
  async withGridUpdate(action, timeout = TIMEOUTS.LONG) {
    const namesBefore = (await this.getProductNames()).join("|");

    await action();

    try {
      await waitForCondition(
        async () => {
          const namesNow = (await this.getProductNames()).join("|");
          return namesNow !== "" && namesNow !== namesBefore;
        },
        "Product grid did not update",
        timeout,
      );
    } catch (error) {
      await browser.refresh();
      await this.waitForProducts();
      throw error;
    }
  }

  async searchFor(term) {
    await this.withGridUpdate(async () => {
      await this.searchInput.setValue(term);
      await this.searchButton.click();
    });
  }

  async filterByBrand(name) {
    await this.withGridUpdate(() => this.brandFilter(name).click());
  }

  async sortBy(value) {
    await this.withGridUpdate(() =>
      this.sortSelect.selectByValue(value, { dispatchChange: true }),
    );
  }

  async getProductNames() {
    return this.productNames.getTexts();
  }

  async getProductPrices() {
    return this.productPrices.getNumbers();
  }

  async openProduct(name) {
    await this.productCard(name).scrollAndClick();
    await waitForUrlToContain("/product/", TIMEOUTS.LONG);
  }

  async openCategory(slug) {
    await this.header.openCategory(slug);
    await this.waitForProducts();
  }
}

export default new HomePage();
