import { expect, assert } from "chai";
import ProfilePage from "#business/pages/account/profile.page.js";
import FavoritesPage from "#business/pages/account/favorites.page.js";
import ProductPage from "#business/pages/product.page.js";
import { registerAndLogin } from "#business/steps/auth.steps.js";
import { openCatalog, openProductByName } from "#business/steps/catalog.steps.js";
import { CATALOG_PRODUCT } from "#business/data/constants/products.constants.js";

describe("Account", () => {
  before(async () => {
    await registerAndLogin();
  });

  describe("Scenario: User updates the profile details", () => {
    it("should save the updated phone number to the profile", async () => {
      await ProfilePage.open();
      const newPhone = `05${Date.now().toString().slice(-8)}`;

      await ProfilePage.updatePhone(newPhone);

      await browser.refresh();
      expect(await ProfilePage.getPhone()).to.equal(newPhone);
    });
  });

  describe("Scenario: User adds a product to favorites", () => {
    beforeEach(async () => {
      await FavoritesPage.clearFavorites();
    });

    it("should show the product in the list of favorite products", async () => {
      await openCatalog();
      await openProductByName(CATALOG_PRODUCT.name);
      const title = await ProductPage.getTitle();

      await ProductPage.addToFavorites();

      await FavoritesPage.open();
      await FavoritesPage.waitForFavorites();
      assert.include(await FavoritesPage.getFavoriteNames(), title);
    });
  });
});
