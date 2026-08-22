import "dotenv/config";
import { should } from "chai";
import { TIMEOUTS } from "#core/config/timeouts.js";
import { getEnv } from "#core/config/env.js";

export const config = {
  runner: "local",

  // Paths are relative to this file, which lives in the tests layer.
  specs: ["./specs/**/*.js"],

  maxInstances: 1,
  capabilities: [{ browserName: "chrome" }],

  logLevel: "error",
  bail: 0,

  baseUrl: getEnv("BASE_URL", "https://practicesoftwaretesting.com"),
  waitforTimeout: TIMEOUTS.DEFAULT,
  connectionRetryTimeout: 120_000,
  connectionRetryCount: 3,

  framework: "mocha",
  reporters: ["spec", ["allure", { outputDir: "allure-results" }]],

  mochaOpts: {
    ui: "bdd",
    timeout: 60_000,
  },

  /**
   * Installs chai's should interface once per worker, so no spec has to
   * repeat the call at module level.
   */
  before: function () {
    should();
  },

  /**
   * Captures the failing state. The Allure reporter attaches screenshots
   * taken during a test to the report on its own.
   */
  afterTest: async function (test, context, { passed }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },
};
