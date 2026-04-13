/**
 * Extracted from initNationalTeamMatches() in calc.user.js for testability.
 * Parses nation_num from HTML response of fed_sborn.php.
 *
 * Looks for a link matching `a[href*="nation.php?num="]` and extracts the num parameter.
 *
 * @param {string} html - HTML string from fed_sborn.php
 * @returns {string|null} The nation_num as a string, or null if not found
 */
export function parseNationNum(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const link = doc.querySelector('a[href*="nation.php?num="]');
  if (link) {
    const m = link.getAttribute('href').match(/num=(\d+)/);
    if (m) {
      return m[1];
    }
  }
  return null;
}
