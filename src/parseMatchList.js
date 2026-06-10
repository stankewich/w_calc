/**
 * Parses HTML from v2champ.php page, extracting the list of played matches for the selected tour.
 *
 * Match rows are <tr> elements in a classless <table>, each containing:
 * - Two a[href*="roster.php"] links — home and away teams
 * - One a[href*="viewmatch.php"] link with the score in <b>
 *
 * Rows containing a[href*="previewmatch.php"] (unplayed matches) are ignored.
 *
 * @param {string} html - HTML string from v2champ.php
 * @returns {MatchEntry[]} Array of match entries in document order
 *
 * @typedef {Object} MatchEntry
 * @property {string} matchId  - Match ID extracted from match_id=... in href
 * @property {string} day      - Day extracted from day=... in href
 * @property {string} homeTeam - Name of the home team (first roster.php link)
 * @property {string} awayTeam - Name of the away team (second roster.php link)
 * @property {string} score    - Score text from <b> inside the viewmatch.php link
 * @property {string} matchUrl - Full URL: viewmatch.php?day={day}&match_id={matchId}
 */
export function parseMatchList(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  // Find all <tr> rows that contain a viewmatch.php link (played matches)
  const allRows = doc.querySelectorAll('tr');
  const results = [];
  const seenIds = new Set();

  for (const row of allRows) {
    // Skip rows with previewmatch.php (unplayed matches)
    if (row.querySelector('a[href*="previewmatch.php"]')) continue;

    const viewmatchLink = row.querySelector('a[href*="viewmatch.php"]');
    if (!viewmatchLink) continue;

    const rosterLinks = row.querySelectorAll('a[href*="roster.php"]');
    if (rosterLinks.length < 2) continue;

    const href = viewmatchLink.getAttribute('href') || '';

    const matchIdMatch = href.match(/[?&]match_id=(\d+)/);
    const dayMatch = href.match(/[?&]day=(\d+)/);

    if (!matchIdMatch || !dayMatch) continue;

    const matchId = matchIdMatch[1];
    if (seenIds.has(matchId)) continue;
    seenIds.add(matchId);

    const day = dayMatch[1];

    const homeTeam = rosterLinks[0].textContent.trim();
    const awayTeam = rosterLinks[1].textContent.trim();
    const homeUrl = rosterLinks[0].getAttribute('href') || '';
    const awayUrl = rosterLinks[1].getAttribute('href') || '';

    const scoreEl = viewmatchLink.querySelector('b');
    const score = scoreEl ? scoreEl.textContent.trim() : '';

    if (!homeTeam || !awayTeam || !score) continue;

    const matchUrl = `https://www.virtualsoccer.ru/viewmatch.php?day=${day}&match_id=${matchId}`;

    results.push({ matchId, day, homeTeam, awayTeam, homeUrl, awayUrl, score, matchUrl });
  }

  return results;
}
