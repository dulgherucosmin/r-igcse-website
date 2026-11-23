import { cacheLife } from "next/cache";

/**
 * Whether it is the winter season (November, December and January, UTC),
 * when Discord role icons switch to their winter versions. Cached and
 * refreshed hourly so pages can stay prerendered.
 */
export async function isWinter() {
  "use cache";

  cacheLife("hours");

  const month = new Date().getUTCMonth();
  return month >= 10 || month === 0;
}
