import BasePage from "./base.page.js";

class LoginPage extends BasePage {
  get emailInput() {
    return $('[data-test="email"]');
  }
  get passwordInput() {
    return $('[data-test="password"]');
  }
  get submitButton() {
    return $('[data-test="login-submit"]');
  }

  open() {
    return super.open("auth/login");
  }

  async signIn({ email, password }) {
    await this.typeInto(this.emailInput, email);
    await this.typeInto(this.passwordInput, password);
    await this.clickOn(this.submitButton);
  }

  async loginAs(user) {
    await this.open();
    await this.signIn(user);
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/account"),
      { timeoutMsg: "Login did not redirect to the account page" },
    );
  }
}

export default new LoginPage();
