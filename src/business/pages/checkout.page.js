import BaseAppPage from "#business/pages/base.app.page.js";
import BaseElement from "#core/elements/base.element.js";
import Input from "#core/elements/input.js";
import AngularInput from "#core/elements/angular.input.js";
import Dropdown from "#core/elements/dropdown.js";
import { waitForCondition } from "#core/utils/wait.helper.js";

class CheckoutPage extends BaseAppPage {
  get signInStepButton() {
    return new BaseElement('[data-test="proceed-2"]', "Proceed to address button");
  }

  get emailInput() {
    return new Input('app-login [data-test="email"]', "Checkout email input");
  }

  get passwordInput() {
    return new Input('app-login [data-test="password"]', "Checkout password input");
  }

  get loginSubmitButton() {
    return new BaseElement('app-login [data-test="login-submit"]', "Checkout login button");
  }

  get countrySelect() {
    return new Dropdown('app-address [data-test="country"]', "Country select");
  }

  get postalCodeInput() {
    return new AngularInput('app-address [data-test="postal_code"]', "Postal code input");
  }

  get houseNumberInput() {
    return new AngularInput('app-address [data-test="house_number"]', "House number input");
  }

  get streetInput() {
    return new AngularInput('app-address [data-test="street"]', "Street input");
  }

  get cityInput() {
    return new AngularInput('app-address [data-test="city"]', "City input");
  }

  get stateInput() {
    return new AngularInput('app-address [data-test="state"]', "State input");
  }

  get addressStepButton() {
    return new BaseElement('[data-test="proceed-3"]', "Proceed to payment button");
  }

  get paymentMethodSelect() {
    return new Dropdown('app-payment [data-test="payment-method"]', "Payment method select");
  }

  get finishButton() {
    return new BaseElement('[data-test="finish"]', "Confirm order button");
  }

  get successMessage() {
    return new BaseElement('[data-test="payment-success-message"]', "Payment success message");
  }

  async proceedToAddress(user) {
    await waitForCondition(
      async () =>
        (await this.signInStepButton.isExisting()) || (await this.emailInput.isExisting()),
      "Sign in step did not render",
    );

    if (!(await this.signInStepButton.isExisting())) {
      await this.emailInput.setValue(user.email);
      await this.passwordInput.setValue(user.password);
      await this.loginSubmitButton.click();
      await this.signInStepButton.waitForDisplayed();
    }

    await this.signInStepButton.click();
    await this.countrySelect.waitForDisplayed();
  }

  async fillAddress({ country, postalCode, houseNumber, street, city, state }) {
    await this.countrySelect.selectByValue(country);
    await this.postalCodeInput.setValue(postalCode);
    await this.houseNumberInput.setValue(houseNumber);

    await waitForCondition(
      async () => (await this.streetInput.getValue()).length > 0,
      "Address autofill did not complete",
    );

    await this.streetInput.setValue(street);
    await this.cityInput.setValue(city);
    await this.stateInput.setValue(state);

    await this.addressStepButton.waitForEnabled();
    await this.addressStepButton.click();
  }

  async pay(method) {
    await this.paymentMethodSelect.selectByValue(method);
    await this.finishButton.waitForEnabled();
    await this.finishButton.click();
  }

  async getSuccessMessage() {
    return this.successMessage.getText();
  }
}

export default new CheckoutPage();
