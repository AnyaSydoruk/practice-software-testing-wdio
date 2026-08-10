import BasePage from "./base.page.js";

class AccountPage extends BasePage {
  get userMenu() {
    return $('[data-test="nav-menu"]');
  }
  get myAccountLink() {
    return $('[data-test="nav-my-account"]');
  }
  get favoritesLink() {
    return $('[data-test="nav-my-favorites"]');
  }
  get profileLink() {
    return $('[data-test="nav-my-profile"]');
  }
  get signOutLink() {
    return $('[data-test="nav-sign-out"]');
  }

  get pageTitle() {
    return $('[data-test="page-title"]');
  }

  get firstNameInput() {
    return $('app-profile [data-test="first-name"]');
  }

  get phoneInput() {
    return $('app-profile [data-test="phone"]');
  }

  get updateButton() {
    return $('[data-test="update-profile-submit"]');
  }

  get favoriteNames() {
    return $$('[data-test^="favorite-"] [data-test="product-name"]');
  }

  get favoriteCards() {
    return $$('[data-test^="favorite-"]');
  }
  get deleteButtons() {
    return $$('[data-test^="favorite-"] [data-test="delete"]');
  }

  get successAlert() {
    return $("app-profile .alert-success");
  }

  open() {
    return super.open("account");
  }
  openProfile() {
    return super.open("account/profile");
  }
  openFavorites() {
    return super.open("account/favorites");
  }

  async waitForProfileLoaded() {
    await this.firstNameInput.waitForDisplayed();
    await browser.waitUntil(
      async () => (await this.firstNameInput.getValue()).length > 0,
      { timeoutMsg: "Profile form did not load user data" },
    );
  }

  async getUserName() {
    await this.userMenu.waitForDisplayed();
    return (await this.userMenu.getText()).trim();
  }

  async getPageTitle() {
    await this.pageTitle.waitForDisplayed();
    return (await this.pageTitle.getText()).trim();
  }

  async getPhone() {
    return this.phoneInput.getValue();
  }

  async updatePhone(phone) {
    await this.waitForProfileLoaded();

    await browser.execute(
      (el, v) => {
        const setter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value",
        ).set;
        setter.call(el, String(v));
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
        el.blur();
      },
      await this.phoneInput,
      phone,
    );

    await this.clickOn(this.updateButton);
    await this.successAlert.waitForDisplayed({
      timeoutMsg: "No success message after profile update",
    });
  }

  async waitForFavorites() {
    await this.pageTitle.waitForDisplayed();
    await browser.waitUntil(async () => (await this.favoriteCards).length > 0, {
      timeoutMsg: "Favorites list is empty",
    });
  }

  async getFavoriteNames() {
    return (await this.getTexts(this.favoriteNames)).map((n) => n.trim());
  }

  async clearFavorites() {
    await this.openFavorites();
    await this.pageTitle.waitForDisplayed();

    while ((await this.favoriteCards).length > 0) {
      const countBefore = (await this.favoriteCards).length;
      const buttons = await this.deleteButtons;
      await this.clickOn(buttons[0]);
      await browser.waitUntil(
        async () => (await this.favoriteCards).length < countBefore,
        { timeoutMsg: "Favorite item was not removed" },
      );
    }
  }
}

export default new AccountPage();
