/**
 * Extracted from initPlayedNationalTeamMatches() in calc.user.js for testability.
 * Parses the last played match data from nation.php HTML.
 *
 * The nation.php page has match results in the right column as compact divs:
 * - Played matches: contain viewmatch.php links with actual scores (e.g. "1:0")
 * - Future matches: contain previewmatch.php links with "?:?"
 *
 * The LAST viewmatch.php link in the page is the most recent played match.
 * The opponent name is in a nation.php link in the same div.
 * The home team country is in the page header (td.hdr2l).
 *
 * @param {string} html - HTML string from nation.php
 * @returns {MatchData|null} Parsed match data, or null if no played match found
 *
 * @typedef {Object} MatchData
 * @property {string} matchUrl - Match URL (viewmatch.php?...)
 * @property {string} country1 - Home team country name
 * @property {string} country2 - Away team country name
 * @property {string} score - Match score (e.g. "1:0")
 * @property {boolean} isAway - True if our team played away (Г)
 */
export function parsePlayedMatch(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  // Find the LAST viewmatch.php link (not previewmatch.php) — this is the most recent played match
  const viewMatchLinks = doc.querySelectorAll('a[href*="viewmatch.php"]');
  let viewMatchLink = null;
  for (const link of viewMatchLinks) {
    const href = link.getAttribute('href') || '';
    if (href.includes('previewmatch.php')) continue;
    viewMatchLink = link; // keep overwriting — last one wins
  }
  if (!viewMatchLink) return null;

  const matchUrl = viewMatchLink.getAttribute('href') || '';
  const score = viewMatchLink.textContent.trim();

  // Find the parent div containing this link
  const parentDiv = viewMatchLink.closest('div');

  // Extract opponent country and home/away indicator from the div text
  let country2 = '';
  let isAway = false;
  if (parentDiv) {
    // Check for "- Г -" (away) or "- Д -" (home) in the div text
    const divText = parentDiv.textContent;
    if (/- Г -/.test(divText)) {
      isAway = true;
    }

    const opponentLink = parentDiv.querySelector('a[href*="nation.php?num="]');
    if (opponentLink) {
      const opponentText = opponentLink.textContent.trim();
      country2 = opponentText.replace(/\s*\((?:юн|мол|нац)\.?\)\s*$/, '').trim();
    }
  }

  // Extract home team country from page header
  let country1 = extractCountryFromHeader(doc);

  if (!matchUrl || !score) return null;

  return { matchUrl, country1, country2, score, isAway };
}

/**
 * Extracts the worldcup.php link from nation.php HTML.
 * The link looks like:
 *   <a href="...worldcup.php?num=126628&type=u&continent_num=4#group_NA-D">Отборочный турнир...</a>
 *
 * Returns the URL without the hash/anchor part.
 *
 * @param {string} html - HTML string from nation.php
 * @returns {string|null} worldcup.php URL (without hash), or null if not found
 */
export function parseWorldcupLink(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const link = doc.querySelector('a[href*="worldcup.php"]');
  if (!link) return null;

  let href = link.getAttribute('href') || '';
  // Strip the hash/anchor part
  const hashIndex = href.indexOf('#');
  if (hashIndex !== -1) {
    href = href.substring(0, hashIndex);
  }
  return href || null;
}

/**
 * Extracts the home team's country name from the nation.php page header.
 * Looks for: <td class="lh20 hdr2l"><a ...>Канада (юношеская)</a></td>
 * Strips suffixes like "(юношеская)", "(молодёжная)", "(национальная)".
 *
 * @param {Document} doc - Parsed HTML document
 * @returns {string} Country name, or empty string if not found
 */
function extractCountryFromHeader(doc) {
  // Strategy 1: Look for td.hdr2l with a link
  const hdr = doc.querySelector('td.hdr2l a');
  if (hdr) {
    const text = hdr.textContent.trim();
    const cleaned = text.replace(/\s*\([^)]+\)\s*$/, '').trim();
    if (cleaned) return cleaned;
  }

  // Strategy 2: Look for any element with class containing "hdr2l"
  const hdrCells = doc.querySelectorAll('[class*="hdr2l"]');
  for (const cell of hdrCells) {
    const link = cell.querySelector('a');
    if (link) {
      const text = link.textContent.trim();
      const cleaned = text.replace(/\s*\([^)]+\)\s*$/, '').trim();
      if (cleaned) return cleaned;
    }
  }

  return '';
}
