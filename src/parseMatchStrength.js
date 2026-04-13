/**
 * Parses "Сила в начале матча" and "Сила в конце матча" tables from viewmatch.php HTML.
 *
 * Each strength row has:
 * - td with label text containing "Сила в начале матча" or "Сила в конце матча"
 * - td.rdl with home team value + percentage
 * - td.gdl with away team value + difference + percentage
 *
 * @param {string} html - HTML string from viewmatch.php
 * @returns {MatchStrength|null} Parsed strength data, or null if not found
 *
 * @typedef {Object} StrengthRow
 * @property {string} label - "Сила в начале матча" or "Сила в конце матча"
 * @property {number} homeValue - Home team strength value
 * @property {number} homePercent - Home team percentage
 * @property {number} awayValue - Away team strength value
 * @property {number} awayPercent - Away team percentage
 * @property {number} diff - Absolute difference (away - home, can be negative)
 *
 * @typedef {Object} MatchStrength
 * @property {StrengthRow|null} start - "Сила в начале матча"
 * @property {StrengthRow|null} end - "Сила в конце матча"
 */
export function parseMatchStrength(html) {
  if (!html) return null;

  var doc = new DOMParser().parseFromString(html, 'text/html');

  var startRow = parseStrengthRow(doc, 'Сила в начале матча');
  var endRow = parseStrengthRow(doc, 'Сила в конце матча');

  if (!startRow && !endRow) return null;

  return { start: startRow, end: endRow };
}

/**
 * Finds and parses a single strength row by label text.
 *
 * @param {Document} doc
 * @param {string} labelText - e.g. "Сила в начале матча"
 * @returns {StrengthRow|null}
 */
function parseStrengthRow(doc, labelText) {
  // Find the td containing the label text
  var allTds = doc.querySelectorAll('td');
  var labelTd = null;
  for (var i = 0; i < allTds.length; i++) {
    // Check direct text content (excluding button children)
    var td = allTds[i];
    var text = '';
    for (var j = 0; j < td.childNodes.length; j++) {
      if (td.childNodes[j].nodeType === 3) { // TEXT_NODE
        text += td.childNodes[j].textContent;
      }
    }
    if (text.trim() === labelText) {
      labelTd = td;
      break;
    }
  }
  if (!labelTd) return null;

  var tr = labelTd.closest('tr');
  if (!tr) return null;

  var rdl = tr.querySelector('td.rdl');
  var gdl = tr.querySelector('td.gdl');
  if (!rdl || !gdl) return null;

  var homeData = parseStrengthCell(rdl);
  var awayData = parseStrengthCell(gdl);
  if (!homeData || !awayData) return null;

  var diff = awayData.value - homeData.value;

  return {
    label: labelText,
    homeValue: homeData.value,
    homePercent: homeData.percent,
    awayValue: awayData.value,
    awayPercent: awayData.percent,
    diff: diff
  };
}

/**
 * Parses a strength cell (td.rdl or td.gdl).
 * The cell contains: value as direct text, percentage in a <b> inside a <div>.
 *
 * @param {Element} td
 * @returns {{value: number, percent: number}|null}
 */
function parseStrengthCell(td) {
  // Value is the first text content of the td (before any child elements)
  var valueText = '';
  for (var i = 0; i < td.childNodes.length; i++) {
    if (td.childNodes[i].nodeType === 3) { // TEXT_NODE
      valueText += td.childNodes[i].textContent;
    }
  }
  var value = parseInt(valueText.trim(), 10);
  if (isNaN(value)) return null;

  // Percentage is in a <b> tag inside a <div>
  var boldEl = td.querySelector('b');
  if (!boldEl) return null;
  var percentText = boldEl.textContent.trim();
  var percent = parseInt(percentText.replace('%', ''), 10);
  if (isNaN(percent)) return null;

  return { value: value, percent: percent };
}
