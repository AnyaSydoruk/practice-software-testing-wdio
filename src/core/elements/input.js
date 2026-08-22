import BaseElement from "#core/elements/base.element.js";

export default class Input extends BaseElement {
  async setValue(value) {
    const element = await this.waitForDisplayed();
    await element.clearValue();
    await element.setValue(String(value));
  }

  async getValue() {
    const element = await this.waitForDisplayed();
    return element.getValue();
  }
}
