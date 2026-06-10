/**
 * Parses HTML from v2champ.php page, extracting the division standings table.
 *
 * The division table is a `table.tbl` with a header row `tr[bgcolor="#006600"]`
 * containing "Команда". Data rows follow with:
 * - Position: nested `table.nil` → first `<b>` tag
 * - Team: `a[href*="roster.php"]` → textContent for name, href for link
 * - Games, Wins, Draws, Losses: simple `<td>` cells after team
 * - Goals: `td[colspan="2"]` with nested table → goalsFor, "-", goalsAgainst
 * - GoalDiff, Points, Vs, (Vs change skipped), RM: remaining cells
 *
 * @param {string} html - HTML string from v2champ.php
 * @returns {DivisionTableData|null} Parsed table data, or null if table not found
 *
 * @typedef {Object} DivisionTableData
 * @property {DivisionRow[]} rows - Array of team rows
 *
 * @typedef {Object} DivisionRow
 * @property {string} position - Place in table ("1", "2", ...)
 * @property {string} teamName - Team name
 * @property {string} teamLink - URL to roster.php
 * @property {string} games - Games played
 * @property {string} wins - Wins
 * @property {string} draws - Draws
 * @property {string} losses - Losses
 * @property {string} goalsFor - Goals scored
 * @property {string} goalsAgainst - Goals conceded
 * @property {string} goalDiff - Goal difference (e.g. "+6", "-2")
 * @property {string} points - Points
 * @property {string} vs - Vs rating
 * @property {string} rm - Manager rating
 */
export function parseDivisionTable(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  // Find the division standings table: table.tbl with header tr[bgcolor="#006600"]
  // that contains "Команда" (to distinguish from other tables like rating tables)
  const tables = doc.querySelectorAll('table.tbl');
  let targetTable = null;

  for (const table of tables) {
    const headerRow = table.querySelector('tr[bgcolor="#006600"]');
    if (!headerRow) continue;
    const text = headerRow.textContent;
    if (text.includes('Команда') && text.includes('М')) {
      targetTable = table;
      break;
    }
  }

  if (!targetTable) return null;

  const rows = [];
  const allRows = targetTable.querySelectorAll(':scope > tbody > tr, :scope > tr');

  for (const row of allRows) {
    // Skip header rows (bgcolor="#006600")
    if (row.getAttribute('bgcolor') === '#006600') continue;

    // A data row must contain a roster.php link
    const teamAnchor = row.querySelector('a[href*="roster.php"]');
    if (!teamAnchor) continue;

    const teamName = teamAnchor.textContent.trim();
    const teamLink = teamAnchor.getAttribute('href') || '';

    // Position: from nested table.nil → first <b> tag
    const posTable = row.querySelector('table.nil');
    let position = '';
    if (posTable) {
      const b = posTable.querySelector('b');
      if (b) position = b.textContent.trim();
    }

    // Collect top-level <td> cells of this row (not nested ones)
    const cells = row.querySelectorAll(':scope > td');

    // Find the cell index that contains the team anchor
    let teamCellIndex = -1;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].querySelector('a[href*="roster.php"]')) {
        teamCellIndex = i;
        break;
      }
    }
    if (teamCellIndex < 0) continue;

    // After team cell: games, wins, draws, losses (4 simple cells)
    const games = cells[teamCellIndex + 1]?.textContent.trim() || '';
    const wins = cells[teamCellIndex + 2]?.textContent.trim() || '';
    const draws = cells[teamCellIndex + 3]?.textContent.trim() || '';
    const losses = cells[teamCellIndex + 4]?.textContent.trim() || '';

    // Goals cell: td[colspan="2"] with nested table
    const goalsCell = cells[teamCellIndex + 5];
    let goalsFor = '';
    let goalsAgainst = '';
    if (goalsCell) {
      const goalsTds = goalsCell.querySelectorAll('table td');
      if (goalsTds.length >= 3) {
        goalsFor = goalsTds[0].textContent.trim();
        goalsAgainst = goalsTds[2].textContent.trim();
      }
    }

    // Remaining cells after goals: goalDiff, points, vs, vsChange, rm
    const goalDiff = cells[teamCellIndex + 6]?.textContent.trim() || '';
    const points = cells[teamCellIndex + 7]?.textContent.trim() || '';
    const vs = cells[teamCellIndex + 8]?.textContent.trim() || '';
    // cells[teamCellIndex + 9] is Vs change — skip it
    const rm = cells[teamCellIndex + 10]?.textContent.trim() || '';

    // Movement: find go_up.gif / go_down.gif img anywhere in the row
    let movement = 'neutral';
    const moveImgs = row.querySelectorAll('img');
    for (const img of moveImgs) {
      const msrc = img.getAttribute('src') || '';
      if (msrc.includes('go_up.gif')) { movement = 'up'; break; }
      if (msrc.includes('go_down.gif')) { movement = 'down'; break; }
    }

    rows.push({
      position,
      teamName,
      teamLink,
      games,
      wins,
      draws,
      losses,
      goalsFor,
      goalsAgainst,
      goalDiff,
      points,
      vs,
      rm,
      movement,
    });
  }

  if (rows.length === 0) return null;

  return { rows };
}
