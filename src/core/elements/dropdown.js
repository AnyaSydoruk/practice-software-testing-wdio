import BaseElement from "#core/elements/base.element.js";

export default class Dropdown extends BaseElement {
  /**
   * @param {string} value the option's value attribute
   * @param {{dispatchChange?: boolean}} [options] dispatch a native change
   *   event afterwards, for selects whose framework binding ignores the
   *   WebDriver selection
   */
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
