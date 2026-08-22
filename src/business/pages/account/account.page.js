import BaseAppPage from "#business/pages/base.app.page.js";

class AccountPage extends BaseAppPage {
  get path() {
    return "account";
  }

  get uniqueElement() {
    return this.pageTitle;
  }
}

export default new AccountPage();
