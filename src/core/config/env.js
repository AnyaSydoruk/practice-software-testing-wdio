/**
 * Reads an environment variable.
 * Throws when a variable without a fallback is missing, so a misconfigured
 * environment fails with a clear message instead of an obscure test failure.
 *
 * @param {string} key
 * @param {string} [fallback]
 * @returns {string}
 */
export function getEnv(key, fallback) {
  const value = process.env[key];

  if (value === undefined || value === "") {
    if (fallback === undefined) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    return fallback;
  }

  return value;
}
