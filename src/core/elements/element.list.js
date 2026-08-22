import BaseElement from "#core/elements/base.element.js";
import { TIMEOUTS } from "#core/config/timeouts.js";

/**
 * Lazy wrapper around a collection of elements.
 *
 * Items are produced as wrappers of the requested type, so an indexed item
 * keeps the same interface as any other element.
 */
export default class ElementList {
  #selector;
  #name;
  #ItemType;

  /**
   * @param {string} selector
   * @param {string} name
   * @param {typeof BaseElement} [ItemType] wrapper class used for items
   */
  constructor(selector, name, ItemType = BaseElement) {
    this.#selector = selector;
    this.#name = name ?? selector;
    this.#ItemType = ItemType;
  }

  get name() {
    return this.#name;
  }

  /** Un-awaited WebdriverIO collection, kept chainable on purpose (see getTexts). */
  #collection() {
    return $$(this.#selector);
  }

  async getElements() {
    return this.#collection();
  }

  async count() {
    return (await this.#collection()).length;
  }

  /** @returns {BaseElement} */
  get(index) {
    const ItemType = this.#ItemType;
    return new ItemType(
      async () => (await this.getElements())[index],
      `${this.#name} [${index}]`,
    );
  }

  /**
   * WebdriverIO overrides map() on a collection so that it resolves the
   * mapped promises itself. Wrapping it in Promise.all would hand Promise.all
   * a promise instead of an array, so the chainable form is used directly.
   */
  async getTexts() {
    const texts = await this.#collection().map((element) => element.getText());
    return texts.map((text) => String(text).trim());
  }

  async getNumbers() {
    const texts = await this.getTexts();
    return texts.map((text) => Number(text.replace(/[^0-9.]/g, "")));
  }

  async waitForAny(timeout = TIMEOUTS.LONG) {
    await browser.waitUntil(async () => (await this.count()) > 0, {
      timeout,
      timeoutMsg: `${this.#name}: no items appeared`,
    });
  }
}
