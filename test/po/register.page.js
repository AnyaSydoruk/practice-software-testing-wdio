import BasePage from "./base.page.js";

class RegisterPage extends BasePage {
  get firstName() {
    return $('[data-test="first-name"]');
  }
  get lastName() {
    return $('[data-test="last-name"]');
  }
  get dob() {
    return $('[data-test="dob"]');
  }
  get countrySelect() {
    return $('[data-test="country"]');
  }
  get postalCode() {
    return $('[data-test="postal_code"]');
  }
  get houseNumber() {
    return $('[data-test="house_number"]');
  }
  get street() {
    return $('[data-test="street"]');
  }
  get city() {
    return $('[data-test="city"]');
  }
  get state() {
    return $('[data-test="state"]');
  }
  get phone() {
    return $('[data-test="phone"]');
  }
  get email() {
    return $('[data-test="email"]');
  }
  get password() {
    return $('[data-test="password"]');
  }
  get submitButton() {
    return $('[data-test="register-submit"]');
  }

  open() {
    return super.open("auth/register");
  }

  async register(user) {
    await this.typeInto(this.firstName, user.firstName);
    await this.typeInto(this.lastName, user.lastName);
    await this.typeInto(this.dob, user.dob);
    await this.countrySelect.selectByAttribute("value", user.country);
    await this.typeInto(this.postalCode, user.postalCode);
    await this.typeInto(this.houseNumber, user.houseNumber);
    await this.typeInto(this.street, user.street);
    await this.typeInto(this.city, user.city);
    await this.typeInto(this.state, user.state);
    await this.typeInto(this.phone, user.phone);
    await this.typeInto(this.email, user.email);
    await this.typeInto(this.password, user.password);
    await this.clickOn(this.submitButton);
  }
}

export default new RegisterPage();
