import { TIMEOUTS } from "#core/config/timeouts.js";

export async function waitForUrlToContain(fragment, timeout = TIMEOUTS.DEFAULT) {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes(fragment),
    { timeout, timeoutMsg: `URL did not contain "${fragment}"` },
  );
}

export async function waitForCondition(predicate, message, timeout = TIMEOUTS.DEFAULT) {
  await browser.waitUntil(predicate, { timeout, timeoutMsg: message });
}
