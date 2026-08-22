import { TIMEOUTS } from "#core/config/timeouts.js";

export default class BasePage {
  get path() {
    throw new Error(`${this.constructor.name} must define a 'path' getter`);
  }

  get uniqueElement() {
    throw new Error(`${this.constructor.name} must define a 'uniqueElement' getter`);
  }

  async open() {
    await browser.url(`/${this.path}`);
    await this.waitForLoaded();
    return this;
  }

  async waitForLoaded(timeout = TIMEOUTS.LONG) {
    await this.uniqueElement.waitForDisplayed(timeout);
    return this;
  }

  async isOpen() {
    return this.uniqueElement.isDisplayed();
  }
}
