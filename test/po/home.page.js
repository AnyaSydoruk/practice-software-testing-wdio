import BasePage from "./base.page.js";

class HomePage extends BasePage {
  get searchInput() {
    return $('[data-test="search-query"]');
  }
  get searchButton() {
    return $('[data-test="search-submit"]');
  }
  get sortSelect() {
    return $('[data-test="sort"]');
  }
  get productNames() {
    return $$('[data-test="product-name"]');
  }
  get productPrices() {
    return $$('[data-test="product-price"]');
  }

  productCard(name) {
    return $(
      `//h5[@data-test="product-name" and contains(normalize-space(.), "${name}")]/ancestor::a[contains(@class,"card")]`,
    );
  }

  brandCheckbox(name) {
    return $(
      `//label[contains(normalize-space(.), "${name}")]/input[@name="brand_id"]`,
    );
  }

  /** сайт часом гальмує — одна спроба з перезавантаженням */
  async waitForProducts(timeout = 30000) {
    try {
      await browser.waitUntil(
        async () => (await this.productNames).length > 0,
        { timeout, timeoutMsg: "Products did not appear" },
      );
    } catch {
      await browser.refresh();
      await browser.waitUntil(
        async () => (await this.productNames).length > 0,
        { timeout, timeoutMsg: "Products did not appear after reload" },
      );
    }
  }

  /** будь-яка дія, після якої сітка має перемалюватись */
  async withGridUpdate(action) {
    const before = (await this.getProductNames()).join("|");
    await action();
    await browser.waitUntil(
      async () => {
        const now = (await this.getProductNames()).join("|");
        return now !== "" && now !== before;
      },
      { timeout: 20000, timeoutMsg: "Product grid did not update" },
    );
  }

  async searchFor(term) {
    await this.withGridUpdate(async () => {
      await this.typeInto(this.searchInput, term);
      await this.clickOn(this.searchButton);
    });
  }

  async filterByBrand(name) {
    await this.withGridUpdate(() => this.clickOn(this.brandCheckbox(name)));
  }

  /** Angular слухає change, який WebDriver сам не генерує — кидаємо вручну */
  async sortBy(value) {
    await this.withGridUpdate(async () => {
      await this.sortSelect.waitForDisplayed();
      await this.sortSelect.selectByAttribute("value", value);
      await browser.execute(
        (el) => el.dispatchEvent(new Event("change", { bubbles: true })),
        await this.sortSelect,
      );
    });
  }

  async getProductNames() {
    return (await this.getTexts(this.productNames)).map((n) => n.trim());
  }

  async getProductPrices() {
    const texts = await this.getTexts(this.productPrices);
    return texts.map((t) => Number(t.replace(/[^0-9.]/g, "")));
  }

  async openProduct(name) {
    const card = await this.productCard(name);
    await card.scrollIntoView({ block: "center" });
    await this.clickOn(card);
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/product/"),
      { timeout: 20000, timeoutMsg: "Product page did not open" },
    );
  }

  async openCategory(slug) {
    await this.clickOn(this.categoriesMenu);
    await this.clickOn(this.categoryLink(slug));
    await this.waitForProducts();
  }
}

export default new HomePage();
