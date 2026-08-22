import { TIMEOUTS } from "#core/config/timeouts.js";

/**
 * Waits until the current URL contains the given fragment.
 * @param {string} fragment
 * @param {number} [timeout]
 */
export async function waitForUrlToContain(fragment, timeout = TIMEOUTS.DEFAULT) {
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes(fragment),
    { timeout, timeoutMsg: `URL did not contain "${fragment}"` },
  );
}

/**
 * Waits until the predicate resolves truthy, forcing every wait to carry
 * a message that explains what was expected.
 *
 * @param {() => Promise<boolean>} predicate
 * @param {string} message
 * @param {number} [timeout]
 */
export async function waitForCondition(predicate, message, timeout = TIMEOUTS.DEFAULT) {
  await browser.waitUntil(predicate, { timeout, timeoutMsg: message });
}
