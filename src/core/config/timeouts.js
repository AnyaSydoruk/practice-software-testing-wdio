/**
 * Single source of truth for wait durations.
 * Named timeouts keep magic numbers out of pages and steps.
 */
export const TIMEOUTS = {
  SHORT: 5_000,
  DEFAULT: 15_000,
  LONG: 30_000,
};
