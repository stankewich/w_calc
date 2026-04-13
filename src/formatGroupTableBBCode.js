/**
 * Extracted from initPlayedNationalTeamMatches() in calc.user.js for testability.
 * Formats GroupTableData into a BB-code table with highlight for the user's federation row.
 *
 * @param {GroupTableData} tableData
 * @returns {string} BB-code string
 *
 * @typedef {Object} GroupTableData
 * @property {string[]} headers - Column headers
 * @property {GroupRow[]} rows - Table rows
 * @property {number} highlightIndex - Index of the user's federation row (-1 if not found)
 *
 * @typedef {Object} GroupRow
 * @property {string} position - Position in group
 * @property {string} teamName - Team name
 * @property {string} teamLink - Link to team
 * @property {string[]} stats - Stats columns
 * @property {boolean} isCurrentFed - Whether this is the user's federation row
 */
export function formatGroupTableBBCode(tableData) {
  var lines = [];

  // Header row
  var headerCells = tableData.headers.map(function(h) { return '[td]' + h + '[/td]'; }).join('');
  lines.push('[tr]' + headerCells + '[/tr]');

  // Data rows
  for (var i = 0; i < tableData.rows.length; i++) {
    var row = tableData.rows[i];
    var cells = [row.position, row.teamName];
    for (var j = 0; j < row.stats.length; j++) {
      cells.push(row.stats[j]);
    }
    var highlight = (i === tableData.highlightIndex);
    var rowCells = cells.map(function(c) {
      return highlight ? '[td bgcolor=#FFFFBF]' + c + '[/td]' : '[td]' + c + '[/td]';
    }).join('');
    lines.push('[tr]' + rowCells + '[/tr]');
  }

  return '[table width=70% align=center]\n' + lines.join('\n') + '\n[/table]';
}
