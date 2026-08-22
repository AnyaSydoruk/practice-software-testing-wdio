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
