import { TIMEOUTS } from "#core/config/timeouts.js";

/**
 * Abstract page.
 *
 * Implements the opening algorithm once (Template Method); subclasses supply
 * only the two things that differ: where the page lives and how to tell that
 * it has finished rendering.
 */
export default class BasePage {
  /**
   * Path relative to the configured baseUrl, without a leading slash.
   * @returns {string}
   */
  get path() {
    throw new Error(`${this.constructor.name} must define a 'path' getter`);
  }

  /**
   * Element whose presence proves the page is rendered.
   * @returns {import("#core/elements/base.element.js").default}
   */
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
