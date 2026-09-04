import Input from "#core/elements/input.js";

export default class AngularInput extends Input {
  async setValue(value) {
    const element = await this.waitForDisplayed();

    await browser.execute(
      (el, newValue) => {
        const setter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value",
        ).set;
        setter.call(el, String(newValue));
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
        el.blur();
      },
      element,
      value,
    );
  }
}
