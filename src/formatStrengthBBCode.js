/**
 * Formats MatchStrength data into BB-code tables matching the viewmatch.php visual style.
 *
 * Each row becomes a [table] with:
 * - Label cell (left-aligned)
 * - Home team cell (left)
 * - Away team cell (right)
 * - Stronger team gets green bg (#87e878), weaker gets red bg (#ff967e)
 * - +diff shown on the stronger side
 *
 * Home is always on the left, away on the right (matching viewmatch.php order).
 *
 * @param {MatchStrength|null} strength - Parsed strength data
 * @returns {string} BB-code string, or empty string if no data
 */
export function formatStrengthBBCode(strength) {
  if (!strength) return '';

  var lines = [];
  if (strength.start) {
    lines.push(formatStrengthRowBBCode(strength.start));
  }
  if (strength.end) {
    lines.push(formatStrengthRowBBCode(strength.end));
  }

  return lines.join('\n');
}

/**
 * Formats a single strength row into BB-code.
 * Home always left (red), away always right (green) — fixed layout.
 * +diff shown on the stronger side.
 *
 * @param {StrengthRow} row
 * @returns {string}
 */
function formatStrengthRowBBCode(row) {
  var diff = Math.abs(row.awayValue - row.homeValue);
  var diffStr = diff > 0 ? '[small]+' + diff + '[/small]' : '';
  var homeWidth = Math.max(row.homePercent - 10, 5);
  var awayWidth = Math.max(row.awayPercent - 10, 5);

  // Fixed: home=red, away=green; +diff on the stronger side
  var homeBg = '#ff967e'; var homeFg = '#620';
  var awayBg = '#87e878'; var awayFg = '#060';
  var homeDiff = row.homeValue >= row.awayValue ? diffStr : '';
  var awayDiff = row.awayValue > row.homeValue ? diffStr : '';

  return '[table width=100%][tr]' +
    '[td align=left]' + row.label + '[/td]' +
    '[td bgcolor=' + homeBg + ' width=' + homeWidth + '% align=center][b][color=' + homeFg + ']' + row.homeValue + homeDiff + '[/color][/b][/td]' +
    '[td bgcolor=' + awayBg + ' width=' + awayWidth + '%][b][color=' + awayFg + ']' + row.awayValue + awayDiff + '[/color][/b][/td]' +
    '[/tr][/table]';
}
