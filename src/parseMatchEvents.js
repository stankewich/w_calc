/**
 * Extracted from initPlayedNationalTeamMatches() in calc.user.js for testability.
 * Parses match events from the Chronicle_Table on viewmatch.php.
 *
 * The viewmatch.php page has a Chronicle_Table with event rows:
 * - Rows with bgcolor="#c9f2c5" (home team) or bgcolor="#eddac7" (away team)
 * - First td — event minute (e.g. "67")
 * - Event icon — img or td with title attribute:
 *   - title="Гол" — goal
 *   - title="Желтая карточка" — yellow card
 *   - title="Красная карточка" — red card
 *   - title="Замена" — substitution
 * - Player names — links a.mnu (or a.mnu.qf)
 * - For goals: last td contains current score (e.g. "1:0")
 * - For substitutions: two a.mnu links — first = out, second = in
 *
 * @param {string} html - HTML string from viewmatch.php
 * @returns {MatchEvent[]} Array of match events sorted by minute (stable)
 *
 * @typedef {Object} MatchEvent
 * @property {'goal'} type
 * @property {string} minute
 * @property {string} playerName
 * @property {string} [score]            - score after the goal
 * @property {string} [descriptionBBCode] - full goal description with BB-code player links
 */
export function parseMatchEvents(html) {
  if (!html) return [];

  var doc = new DOMParser().parseFromString(html, 'text/html');
  var rows = doc.querySelectorAll('tr[bgcolor="#c9f2c5"], tr[bgcolor="#eddac7"]');
  var events = [];

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var event = parseEventRow(row);
    if (event) {
      events.push(event);
    }
  }

  // Stable sort by minute (ascending, numeric comparison)
  events.sort(function (a, b) {
    return parseMinute(a.minute) - parseMinute(b.minute);
  });

  return events;
}

/**
 * Determines event type from a row by checking title attributes on images and tds,
 * and also background-image CSS on tds.
 *
 * @param {Element} row - A tr element from Chronicle_Table
 * @returns {'goal'|'yellow'|'red'|'sub'|null} Event type or null if unknown
 */
function detectEventType(row) {
  var titleMap = {
    'Гол': 'goal',
    'Желтая карточка': 'yellow',
    'Красная карточка': 'red',
    'Замена': 'sub'
  };

  // Check title attributes on img elements
  var imgs = row.querySelectorAll('img[title]');
  for (var i = 0; i < imgs.length; i++) {
    var title = imgs[i].getAttribute('title') || '';
    if (titleMap[title]) return titleMap[title];
  }

  // Check title attributes on td elements
  var tds = row.querySelectorAll('td[title]');
  for (var j = 0; j < tds.length; j++) {
    var tdTitle = tds[j].getAttribute('title') || '';
    if (titleMap[tdTitle]) return titleMap[tdTitle];
  }

  // Fallback: check background-image in style attributes on tds
  var allTds = row.querySelectorAll('td');
  for (var k = 0; k < allTds.length; k++) {
    var style = allTds[k].getAttribute('style') || '';
    if (style.indexOf('gol.gif') !== -1) return 'goal';
    if (style.indexOf('zhk.gif') !== -1) return 'yellow';
    if (style.indexOf('kk.gif') !== -1) return 'red';
  }

  return null;
}

/**
 * Parses a single Chronicle_Table row into a MatchEvent.
 * Only parses goal events — other event types are skipped.
 *
 * @param {Element} row - A tr element from Chronicle_Table
 * @returns {MatchEvent|null} Parsed event or null if row is not a goal or incomplete
 */
function parseEventRow(row) {
  var type = detectEventType(row);
  if (type !== 'goal') return null;

  var tds = row.querySelectorAll('td');
  if (tds.length === 0) return null;

  // Minute from first td
  var minute = tds[0].textContent.trim();
  if (!minute) return null;

  // Player names from a.mnu links (also matches a.mnu.qf since it has class mnu)
  var playerLinks = row.querySelectorAll('a.mnu');
  if (playerLinks.length === 0) return null;

  var playerName = playerLinks[0].textContent.trim();
  if (!playerName) return null;

  // Score from last td
  var score = tds[tds.length - 1].textContent.trim();

  // Full description from the description td (the one containing a.mnu links)
  // This is typically the 4th td (index 3) in the row
  var descriptionHtml = '';
  for (var i = 0; i < tds.length; i++) {
    if (tds[i].querySelector('a.mnu')) {
      descriptionHtml = convertDescriptionTobbcode(tds[i]);
      break;
    }
  }

  return {
    type: type,
    minute: minute,
    playerName: playerName,
    score: score || undefined,
    descriptionBBCode: descriptionHtml || undefined
  };
}

/**
 * Parses minute string to a numeric value for sorting.
 * Handles formats like "67", "45+2", "90+3".
 *
 * @param {string} minuteStr
 * @returns {number}
 */
function parseMinute(minuteStr) {
  var parts = minuteStr.split('+');
  var base = parseInt(parts[0], 10) || 0;
  var extra = parts.length > 1 ? (parseInt(parts[1], 10) || 0) : 0;
  return base + extra * 0.01;
}

/**
 * Converts the description td's content to BB-code format.
 * Replaces <a href="...">Name</a> with [a href=... target="_blank"]Name[/a]
 * and preserves plain text. Ensures all hrefs start with /.
 *
 * @param {Element} td - The description td element
 * @returns {string} BB-code formatted description
 */
function convertDescriptionTobbcode(td) {
  var result = '';
  for (var i = 0; i < td.childNodes.length; i++) {
    var node = td.childNodes[i];
    if (node.nodeType === 3) { // TEXT_NODE
      result += node.textContent;
    } else if (node.nodeType === 1 && node.tagName === 'A') { // ELEMENT_NODE, anchor
      var href = node.getAttribute('href') || '';
      if (href && !href.startsWith('http') && !href.startsWith('/')) {
        href = '/' + href;
      }
      var text = node.textContent.trim();
      result += '[a href=' + href + ' target="_blank"]' + text + '[/a]';
    }
  }
  return result.trim();
}
