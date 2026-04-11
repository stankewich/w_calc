/**
 * Extracted from initInterseasonCupResults() in calc.user.js for testability.
 * Parses HTML from roster_m.php and extracts the season number.
 *
 * @param {string} html - HTML string from roster_m.php
 * @returns {string|null} season number as string, or null if not found
 */
export function parseSeasonFromHtml(html) {
  if (!html) return null;
  const match = html.match(/season=(\d+)/);
  return match ? match[1] : null;
}
