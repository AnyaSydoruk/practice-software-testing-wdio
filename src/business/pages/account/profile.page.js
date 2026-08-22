import BaseAppPage from "#business/pages/base.app.page.js";
import BaseElement from "#core/elements/base.element.js";
import Input from "#core/elements/input.js";
import AngularInput from "#core/elements/angular.input.js";
import { TIMEOUTS } from "#core/config/timeouts.js";
import { waitForCondition } from "#core/utils/wait.helper.js";

class ProfilePage extends BaseAppPage {
  get path() {
    return "account/profile";
  }

  get uniqueElement() {
    return this.firstNameInput;
  }

  get firstNameInput() {
    return new Input('app-profile [data-test="first-name"]', "First name input");
  }

  get phoneInput() {
    return new AngularInput('app-profile [data-test="phone"]', "Phone input");
  }

  get updateButton() {
    return new BaseElement('[data-test="update-profile-submit"]', "Update profile button");
  }

  get successAlert() {
    return new BaseElement("app-profile .alert-success", "Profile success alert");
  }

  get dangerAlert() {
    return new BaseElement("app-profile .alert-danger", "Profile error alert");
  }

  async waitForLoaded(timeout = TIMEOUTS.LONG) {
    await super.waitForLoaded(timeout);
    await waitForCondition(
      async () => (await this.firstNameInput.getValue()).length > 0,
      "Profile form did not load user data",
      timeout,
    );
    return this;
  }

  async getPhone() {
    await this.waitForLoaded();
    return this.phoneInput.getValue();
  }

  async updatePhone(phone) {
    await this.waitForLoaded();
    await this.phoneInput.setValue(phone);
    await this.updateButton.click();

    await waitForCondition(
      async () =>
        (await this.successAlert.isDisplayed()) || (await this.dangerAlert.isDisplayed()),
      "No response after profile update",
    );

    if (await this.dangerAlert.isDisplayed()) {
      throw new Error(`Profile update failed: ${await this.dangerAlert.getText()}`);
    }
  }
}

export default new ProfilePage();
