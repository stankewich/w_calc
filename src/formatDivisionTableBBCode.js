/**
 * Formats DivisionTableData into a BB-code string for posting as a federation news item.
 * Follows the same pattern as formatGroupTableBBCode.
 *
 * @param {DivisionTableData} data - Parsed division table data
 * @param {string} divisionName - Division name (e.g. "D1", "D3-A")
 * @returns {string} BB-code string
 *
 * @typedef {Object} DivisionTableData
 * @property {DivisionRow[]} rows - Array of team rows
 *
 * @typedef {Object} DivisionRow
 * @property {string} position - Place in table
 * @property {string} teamName - Team name
 * @property {string} teamLink - URL to roster.php
 * @property {string} games - Games played
 * @property {string} wins - Wins
 * @property {string} draws - Draws
 * @property {string} losses - Losses
 * @property {string} goalsFor - Goals scored
 * @property {string} goalsAgainst - Goals conceded
 * @property {string} goalDiff - Goal difference
 * @property {string} points - Points
 * @property {string} vs - Vs rating
 * @property {string} rm - Manager rating
 */
export function formatDivisionTableBBCode(data, divisionName) {
  var lines = [];

  // Header row
  var headers = ['М', 'Команда', 'И', 'В', 'Н', 'П', 'М', '+/-', 'О', 'Vs', 'РМ'];
  var headerCells = headers.map(function(h) { return '[td]' + h + '[/td]'; }).join('');
  lines.push('[tr]' + headerCells + '[/tr]');

  // Data rows
  for (var i = 0; i < data.rows.length; i++) {
    var row = data.rows[i];
    var teamCell = '[a href=' + row.teamLink + ' target="_blank"]' + row.teamName + '[/a]';
    var goals = row.goalsFor + ' - ' + row.goalsAgainst;
    var cells = [
      row.position,
      teamCell,
      row.games,
      row.wins,
      row.draws,
      row.losses,
      goals,
      row.goalDiff,
      row.points,
      row.vs,
      row.rm,
    ];
    var rowCells = cells.map(function(c) { return '[td]' + c + '[/td]'; }).join('');
    lines.push('[tr]' + rowCells + '[/tr]');
  }

  return '[b]' + divisionName + '[/b]\n\n[table width=70% align=center]\n' + lines.join('\n') + '\n[/table]';
}
