import { assert } from "chai";
import LoginPage from "../po/login.page.js";
import RegisterPage from "../po/register.page.js";
import AccountPage from "../po/account.page.js";
import { EXISTING_USER, newUser } from "../data/users.js";

describe("Authentication", () => {
  describe("Scenario: User signs in with valid credentials", () => {
    it("should take the user to the account dashboard", async () => {
      await LoginPage.open();

      await LoginPage.signIn(EXISTING_USER);

      await browser.waitUntil(
        async () => (await browser.getUrl()).includes("/account"),
        { timeoutMsg: "Login did not redirect to the account page" },
      );
      assert.equal(await AccountPage.getPageTitle(), "My account");
    });
  });

  describe("Scenario: User registers a new account", () => {
    it("should create the account successfully", async () => {
      const user = newUser();

      await RegisterPage.open();

      await RegisterPage.register(user);

      await browser.waitUntil(
        async () => (await browser.getUrl()).includes("/auth/login"),
        { timeoutMsg: "Registration did not redirect to the login page" },
      );

      await LoginPage.signIn(user);
      assert.equal(await AccountPage.getPageTitle(), "My account");
    });
  });
});
