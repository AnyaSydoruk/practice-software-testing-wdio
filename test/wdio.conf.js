import "dotenv/config";
import { should } from "chai";
import { TIMEOUTS } from "#core/config/timeouts.js";
import { getEnv } from "#core/config/env.js";

export const config = {
  runner: "local",

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

  before: function () {
    should();
  },

  afterTest: async function (test, context, { passed }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },
};
