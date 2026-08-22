import BaseElement from "#core/elements/base.element.js";

export default class Dropdown extends BaseElement {
  async selectByValue(value, { dispatchChange = false } = {}) {
    const element = await this.waitForDisplayed();
    await element.selectByAttribute("value", value);

    if (dispatchChange) {
      await browser.execute(
        (el) => el.dispatchEvent(new Event("change", { bubbles: true })),
        element,
      );
    }
  }
}
