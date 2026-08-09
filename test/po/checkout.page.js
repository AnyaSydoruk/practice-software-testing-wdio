import BasePage from "./base.page.js";
import LoginPage from "./login.page.js";

class CheckoutPage extends BasePage {
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
  get proceed3() {
    return $('[data-test="proceed-3"]');
  }

  get paymentMethod() {
    return $('[data-test="payment-method"]');
  }
  get finishButton() {
    return $('[data-test="finish"]');
  }

  signIn(user) {
    return LoginPage.signIn(user);
  }

  async fillAddress({ country, postalCode, houseNumber, street, city, state }) {
    await this.countrySelect.waitForDisplayed({ timeout: 15000 });
    await this.countrySelect.selectByAttribute("value", country);
    await this.typeInto(this.postalCode, postalCode);
    await this.typeInto(this.houseNumber, houseNumber);
    await this.typeInto(this.street, street);
    await this.typeInto(this.city, city);
    await this.typeInto(this.state, state);
    await this.proceed3.waitForEnabled({ timeout: 15000 });
    await this.clickOn(this.proceed3);
  }

  async pay(method) {
    await this.paymentMethod.waitForDisplayed({ timeout: 15000 });
    await this.paymentMethod.selectByAttribute("value", method);
    await this.finishButton.waitForEnabled({ timeout: 15000 });
    await this.clickOn(this.finishButton);
  }
}

export default new CheckoutPage();
