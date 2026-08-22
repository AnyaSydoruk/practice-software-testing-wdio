import { assert } from "chai";
import HomePage from "#business/pages/home.page.js";
import { openCatalog } from "#business/steps/catalog.steps.js";
import {
  LANGUAGE,
  LANGUAGE_LABEL,
  GERMAN_HEADER,
} from "#business/data/constants/languages.constants.js";

describe("Settings", () => {
  beforeEach(async () => {
    await openCatalog();
  });

  describe("Scenario: User changes the application language", () => {
    it("should display the interface in German", async () => {
      assert.equal(await HomePage.header.getSelectedLanguage(), LANGUAGE_LABEL.EN);

      await HomePage.header.switchLanguage(LANGUAGE.DE);

      assert.equal(
        await HomePage.header.getSelectedLanguage(),
        LANGUAGE_LABEL.DE,
        "Language switcher should display DE",
      );
      assert.equal(
        await HomePage.header.contactLink.getText(),
        GERMAN_HEADER.contact,
        "Contact link should be translated",
      );
      assert.equal(
        await HomePage.header.homeLink.getText(),
        GERMAN_HEADER.home,
        "Home link should be translated",
      );
    });
  });
});
