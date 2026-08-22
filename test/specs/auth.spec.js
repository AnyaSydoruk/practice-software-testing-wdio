import { assert } from "chai";
import LoginPage from "#business/pages/login.page.js";
import RegisterPage from "#business/pages/register.page.js";
import AccountPage from "#business/pages/account/account.page.js";
import { EXISTING_USER, newUser } from "#business/data/users.js";

describe("Authentication", () => {
  describe("Scenario: User signs in with valid credentials", () => {
    it("should take the user to the account dashboard", async () => {
      await LoginPage.open();

      await LoginPage.signIn(EXISTING_USER);

      assert.equal(await AccountPage.getPageTitle(), "My account");
    });
  });

  describe("Scenario: User registers a new account", () => {
    it("should create the account successfully", async () => {
      const user = newUser();
      await RegisterPage.open();

      await RegisterPage.register(user);

      await LoginPage.signIn(user);
      assert.equal(await AccountPage.getPageTitle(), "My account");
    });
  });
});
