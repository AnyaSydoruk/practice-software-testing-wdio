import BasePage from "./base.page.js";

class CheckoutPage extends BasePage {
  get proceed2() {
    return $('[data-test="proceed-2"]');
  }
  get emailInput() {
    return $('app-login [data-test="email"]');
  }
  get passwordInput() {
    return $('app-login [data-test="password"]');
  }
  get loginSubmit() {
    return $('app-login [data-test="login-submit"]');
  }

  get countrySelect() {
    return $('app-address [data-test="country"]');
  }
  get postalCode() {
    return $('app-address [data-test="postal_code"]');
  }
  get houseNumber() {
    return $('app-address [data-test="house_number"]');
  }
  get street() {
    return $('app-address [data-test="street"]');
  }
  get city() {
    return $('app-address [data-test="city"]');
  }
  get state() {
    return $('app-address [data-test="state"]');
  }
  get proceed3() {
    return $('[data-test="proceed-3"]');
  }

  get paymentMethod() {
    return $('app-payment [data-test="payment-method"]');
  }
  get finishButton() {
    return $('[data-test="finish"]');
  }
  get successMessage() {
    return $('[data-test="payment-success-message"]');
  }

  async proceedToAddress(user) {
    await browser.waitUntil(
      async () =>
        (await this.proceed2.isExisting()) ||
        (await this.emailInput.isExisting()),
      { timeoutMsg: "Sign in step did not render" },
    );

    if (!(await this.proceed2.isExisting())) {
      await this.typeInto(this.emailInput, user.email);
      await this.typeInto(this.passwordInput, user.password);
      await this.clickOn(this.loginSubmit);
      await this.proceed2.waitForDisplayed();
    }

    await this.clickOn(this.proceed2);
    await this.countrySelect.waitForDisplayed();
  }

  async fillAddress({ country, postalCode, houseNumber, street, city, state }) {
    await this.countrySelect.waitForDisplayed();
    await this.countrySelect.selectByAttribute("value", country);
    await this.setNgValue(this.postalCode, postalCode);
    await this.setNgValue(this.houseNumber, houseNumber);

    await browser.waitUntil(
      async () => (await this.street.getValue()).length > 0,
      { timeoutMsg: "Address autofill did not complete" },
    );

    await this.setNgValue(this.street, street);
    await this.setNgValue(this.city, city);
    await this.setNgValue(this.state, state);

    await this.proceed3.waitForEnabled({
      timeoutMsg: "Address form did not become valid",
    });
    await this.clickOn(this.proceed3);
  }

  async pay(method) {
    await this.paymentMethod.waitForDisplayed();
    await this.paymentMethod.selectByAttribute("value", method);
    await this.finishButton.waitForEnabled({
      timeoutMsg: "Confirm button did not become enabled",
    });
    await this.clickOn(this.finishButton);
  }

  async getSuccessMessage() {
    await this.successMessage.waitForDisplayed({
      timeoutMsg: "No payment confirmation message",
    });
    return (await this.successMessage.getText()).trim();
  }
}

export default new CheckoutPage();
