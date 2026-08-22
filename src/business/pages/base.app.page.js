import BasePage from "#core/pages/base.page.js";
import BaseElement from "#core/elements/base.element.js";
import HeaderComponent from "#business/components/header.component.js";

export default class BaseAppPage extends BasePage {
  #header = new HeaderComponent();

  get header() {
    return this.#header;
  }

  get pageTitle() {
    return new BaseElement('[data-test="page-title"]', "Page title");
  }

  async getPageTitle() {
    return this.pageTitle.getText();
  }
}
