import { assert } from "chai";
import HomePage from "../po/home.page.js";
import { LANG, HEADER_DE } from "../data/products.js";

import { LANG, HEADER_DE } from "../data/products.js";

describe("Settings", () => {
  beforeEach(async () => {
    await HomePage.open();
    await HomePage.waitForProducts();
  });

  describe("Scenario: User changes the application language", () => {
    it("should display the interface in German", async () => {
      assert.equal(await HomePage.getSelectedLanguage(), "EN");

      await HomePage.switchLanguage(LANG.DE);

      assert.equal(
        await HomePage.getSelectedLanguage(),
        "DE",
        "Language switcher should display DE",
      );

      assert.equal(
        (await HomePage.contactLink.getText()).trim(),
        HEADER_DE.contact,
        "Contact link should be translated",
      );

      assert.equal(
        (await HomePage.homeLink.getText()).trim(),
        HEADER_DE.home,
        "Home link should be translated",
      );
    });
  });
});
