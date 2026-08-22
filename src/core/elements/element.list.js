import BaseElement from "#core/elements/base.element.js";
import { TIMEOUTS } from "#core/config/timeouts.js";

export default class ElementList {
  #selector;
  #name;
  #ItemType;

  constructor(selector, name, ItemType = BaseElement) {
    this.#selector = selector;
    this.#name = name ?? selector;
    this.#ItemType = ItemType;
  }

  get name() {
    return this.#name;
  }

  #collection() {
    return $$(this.#selector);
  }

  async getElements() {
    return this.#collection();
  }

  async count() {
    return (await this.#collection()).length;
  }

  get(index) {
    const ItemType = this.#ItemType;
    return new ItemType(
      async () => (await this.getElements())[index],
      `${this.#name} [${index}]`,
    );
  }

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
