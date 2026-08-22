import BaseAppPage from "#business/pages/base.app.page.js";
import BaseElement from "#core/elements/base.element.js";
import Input from "#core/elements/input.js";
import { waitForUrlToContain } from "#core/utils/wait.helper.js";

class LoginPage extends BaseAppPage {
  get path() {
    return "auth/login";
  }

  get uniqueElement() {
    return this.submitButton;
  }

  get emailInput() {
    return new Input('[data-test="email"]', "Email input");
  }

  get passwordInput() {
    return new Input('[data-test="password"]', "Password input");
  }

  get submitButton() {
    return new BaseElement('[data-test="login-submit"]', "Login submit button");
  }

  /** Fills the form and waits for the redirect to the account area. */
  async signIn({ email, password }) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.submitButton.click();
    await waitForUrlToContain("/account");
  }

  async loginAs(user) {
    await this.open();
    await this.signIn(user);
  }
}

export default new LoginPage();
