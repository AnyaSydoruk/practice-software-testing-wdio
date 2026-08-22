import { TIMEOUTS } from "#core/config/timeouts.js";

/**
 * Lazy wrapper around a WebdriverIO element.
 *
 * The locator is resolved on every interaction, so a cached instance never
 * holds a stale reference. Every action waits for the element first, and the
 * element name is put into the timeout message to make failures readable.
 */
export default class BaseElement {
  #locator;
  #name;

  /**
   * @param {string|Function} locator selector string, or a resolver function
   * @param {string} [name] human readable name used in error messages
   */
  constructor(locator, name) {
    this.#locator = locator;
    this.#name = name ?? String(locator);
  }

  get name() {
    return this.#name;
  }

  async getElement() {
    return typeof this.#locator === "function" ? this.#locator() : $(this.#locator);
  }

  async waitForDisplayed(timeout = TIMEOUTS.DEFAULT) {
    const element = await this.getElement();
    await element.waitForDisplayed({
      timeout,
      timeoutMsg: `${this.#name} is not displayed`,
    });
    return element;
  }

  async waitForClickable(timeout = TIMEOUTS.DEFAULT) {
    const element = await this.getElement();
    await element.waitForClickable({
      timeout,
      timeoutMsg: `${this.#name} is not clickable`,
    });
    return element;
  }

  async waitForEnabled(timeout = TIMEOUTS.DEFAULT) {
    const element = await this.getElement();
    await element.waitForEnabled({
      timeout,
      timeoutMsg: `${this.#name} did not become enabled`,
    });
    return element;
  }

  async click() {
    const element = await this.waitForClickable();
    await element.click();
  }

  async scrollAndClick() {
    const element = await this.waitForDisplayed();
    await element.scrollIntoView({ block: "center" });
    await this.click();
  }

  async getText() {
    const element = await this.waitForDisplayed();
    return (await element.getText()).trim();
  }

  /** Text stripped down to its numeric part, e.g. "$14.50" becomes 14.5. */
  async getNumber() {
    return Number((await this.getText()).replace(/[^0-9.]/g, ""));
  }

  async isDisplayed() {
    const element = await this.getElement();
    return element.isDisplayed();
  }

  async isExisting() {
    const element = await this.getElement();
    return element.isExisting();
  }
}
