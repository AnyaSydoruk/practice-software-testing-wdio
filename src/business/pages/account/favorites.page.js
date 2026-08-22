import BaseAppPage from "#business/pages/base.app.page.js";
import ElementList from "#core/elements/element.list.js";
import { waitForCondition } from "#core/utils/wait.helper.js";

class FavoritesPage extends BaseAppPage {
  get path() {
    return "account/favorites";
  }

  get uniqueElement() {
    return this.pageTitle;
  }

  get favoriteCards() {
    return new ElementList('[data-test^="favorite-"]', "Favorite cards");
  }

  get favoriteNames() {
    return new ElementList(
      '[data-test^="favorite-"] [data-test="product-name"]',
      "Favorite product names",
    );
  }

  get deleteButtons() {
    return new ElementList(
      '[data-test^="favorite-"] [data-test="delete"]',
      "Favorite delete buttons",
    );
  }

  async waitForFavorites() {
    await this.favoriteCards.waitForAny();
  }

  async getFavoriteNames() {
    return this.favoriteNames.getTexts();
  }

  async clearFavorites() {
    await this.open();

    while ((await this.favoriteCards.count()) > 0) {
      const countBefore = await this.favoriteCards.count();

      await this.deleteButtons.get(0).click();

      await waitForCondition(
        async () => (await this.favoriteCards.count()) < countBefore,
        "Favorite item was not removed",
      );
    }
  }
}

export default new FavoritesPage();
