/**
 * Extracted from initInterseasonCupResults() in calc.user.js for testability.
 * Formats cup entries into a BB-code table with [table][tr][td] tags.
 *
 * @param {Array<{nn: number, rowNum: string, div: string, teamName: string, teamLink: string, cols: string[]}>} entries
 * @param {string[]} headers
 * @returns {string}
 */
export function formatBBCode(entries, headers) {
  var lines = [];
  var headerCells = headers.map(function(h) { return '[td]' + h + '[/td]'; }).join('');
  lines.push('[tr]' + headerCells + '[/tr]');
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i];
    var teamCell = '[a href=' + e.teamLink + ' target="_blank"]' + e.teamName + '[/a]';
    var parts = [e.rowNum || String(i + 1), e.div || '', String(e.nn), teamCell];
    for (var j = 0; j < e.cols.length; j++) {
      parts.push(e.cols[j]);
    }
    var rowCells = parts.map(function(p) { return '[td]' + p + '[/td]'; }).join('');
    lines.push('[tr]' + rowCells + '[/tr]');
  }
  return '[table width="100%"]\n' + lines.join('\n') + '\n[/table]';
}
