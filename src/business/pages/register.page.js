import BaseAppPage from "#business/pages/base.app.page.js";
import BaseElement from "#core/elements/base.element.js";
import Input from "#core/elements/input.js";
import Dropdown from "#core/elements/dropdown.js";
import { waitForUrlToContain } from "#core/utils/wait.helper.js";

class RegisterPage extends BaseAppPage {
  get path() {
    return "auth/register";
  }

  get uniqueElement() {
    return this.submitButton;
  }

  get firstNameInput() {
    return new Input('[data-test="first-name"]', "First name input");
  }

  get lastNameInput() {
    return new Input('[data-test="last-name"]', "Last name input");
  }

  get dateOfBirthInput() {
    return new Input('[data-test="dob"]', "Date of birth input");
  }

  get countrySelect() {
    return new Dropdown('[data-test="country"]', "Country select");
  }

  get postalCodeInput() {
    return new Input('[data-test="postal_code"]', "Postal code input");
  }

  get houseNumberInput() {
    return new Input('[data-test="house_number"]', "House number input");
  }

  get streetInput() {
    return new Input('[data-test="street"]', "Street input");
  }

  get cityInput() {
    return new Input('[data-test="city"]', "City input");
  }

  get stateInput() {
    return new Input('[data-test="state"]', "State input");
  }

  get phoneInput() {
    return new Input('[data-test="phone"]', "Phone input");
  }

  get emailInput() {
    return new Input('[data-test="email"]', "Email input");
  }

  get passwordInput() {
    return new Input('[data-test="password"]', "Password input");
  }

  get submitButton() {
    return new BaseElement('[data-test="register-submit"]', "Register submit button");
  }

  async register(user) {
    await this.firstNameInput.setValue(user.firstName);
    await this.lastNameInput.setValue(user.lastName);
    await this.dateOfBirthInput.setValue(user.dateOfBirth);
    await this.countrySelect.selectByValue(user.country);
    await this.postalCodeInput.setValue(user.postalCode);
    await this.houseNumberInput.setValue(user.houseNumber);
    await this.streetInput.setValue(user.street);
    await this.cityInput.setValue(user.city);
    await this.stateInput.setValue(user.state);
    await this.phoneInput.setValue(user.phone);
    await this.emailInput.setValue(user.email);
    await this.passwordInput.setValue(user.password);
    await this.submitButton.click();
    await waitForUrlToContain("auth/login");
  }
}

export default new RegisterPage();
