import { expect, assert } from "chai";
import AccountPage from "../po/account.page.js";
import HomePage from "../po/home.page.js";
import ProductPage from "../po/product.page.js";
import { createAndLoginUser } from "../utils/user.helper.js";
import { PRODUCT } from "../data/products.js";

describe("Account", () => {
  before(async () => {
    await createAndLoginUser();
  });

  describe("Scenario: User updates the profile details", () => {
    it("should save the updated phone number to the profile", async () => {
      await AccountPage.openProfile();

      const newPhone = `05${Date.now().toString().slice(-8)}`;

      await AccountPage.updatePhone(newPhone);

      await browser.refresh();
      expect(await AccountPage.getPhone()).to.equal(newPhone);
    });
  });

  describe("Scenario: User adds a product to favorites", () => {
    beforeEach(async () => {
      await AccountPage.clearFavorites();
    });

    it("should show the product in the list of favorite products", async () => {
      await HomePage.open();
      await HomePage.waitForProducts();
      await HomePage.searchFor(PRODUCT.name);
      await HomePage.openProduct(PRODUCT.name);
      const title = await ProductPage.getTitle();

      await ProductPage.addToFavourites();

      await AccountPage.openFavorites();
      await AccountPage.waitForFavorites();
      assert.include(await AccountPage.getFavoriteNames(), title);
    });
  });
});
