/**
 * Parses HTML from teams_cntr.php page, extracting all division links (v2champ.php).
 *
 * @param {string} html - HTML string from teams_cntr.php
 * @returns {DivisionLink[]} Array of division links in document order, empty if none found
 *
 * @typedef {Object} DivisionLink
 * @property {string} name - Division name, e.g. "D1", "D2", "D3-A"
 * @property {string} url - Full URL to v2champ.php?num={id}
 * @property {string} divisionId - Numeric division id extracted from the num parameter
 */
export function parseDivisionLinks(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const anchors = doc.querySelectorAll('a[href*="v2champ.php"]');
  const results = [];

  for (const a of anchors) {
    const name = a.textContent.trim();
    // Skip empty names and purely numeric names (team position numbers in per-team rows)
    if (!name || /^\d+$/.test(name)) continue;

    const url = a.getAttribute('href') || '';
    const match = url.match(/[?&]num=(\d+)/);
    const divisionId = match ? match[1] : '';

    results.push({ name, url, divisionId });
  }

  return results;
}
