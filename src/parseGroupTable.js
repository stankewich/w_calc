/**
 * Extracted from initPlayedNationalTeamMatches() in calc.user.js for testability.
 * Parses the group tournament table from worldcup.php HTML.
 *
 * worldcup.php contains multiple groups. Each group has:
 * - A match results table (class="nil")
 * - A standings table (class="tbl") with header row bgcolor="#006600"
 *
 * The standings table header contains: №, Команда, И, В, Н, П, М, Р, О, Vs, Р
 * Data rows contain nation.php links for team names.
 * Position cells have trailing dots (e.g., "1.", "2.") which are stripped.
 *
 * We find the group containing our fedNationNum by checking team links.
 *
 * @param {string} html - HTML string from worldcup.php
 * @param {string} fedNationNum - The nation_num of the user's federation team
 * @returns {GroupTableData|null} Parsed group table data, or null if table not found
 *
 * @typedef {Object} GroupTableData
 * @property {string[]} headers - Column headers
 * @property {GroupRow[]} rows - Table rows
 * @property {number} highlightIndex - Index of the user's federation row (-1 if not found)
 *
 * @typedef {Object} GroupRow
 * @property {string} position - Position in group (№), dot stripped
 * @property {string} teamName - Team name
 * @property {string} teamLink - Link to team (nation.php?num=...)
 * @property {string[]} stats - Stats columns (И, В, Н, П, М, Р, О, Vs, Р)
 * @property {boolean} isCurrentFed - Whether this is the user's federation row
 */
export function parseGroupTable(html, fedNationNum) {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  // Find ALL header rows with bgcolor="#006600" that contain "Команда"
  const headerRows = doc.querySelectorAll('tr[bgcolor="#006600"]');
  let targetTable = null;

  for (const headerRow of headerRows) {
    const text = headerRow.textContent;
    if (!text.includes('Команда')) continue;

    // Get the parent table
    const parentTable = headerRow.closest('table');
    if (!parentTable) continue;

    // Check if this table contains our fedNationNum
    const nationLink = parentTable.querySelector('a[href*="nation.php?num=' + fedNationNum + '"]');
    if (nationLink) {
      targetTable = parentTable;
      break;
    }
  }

  if (!targetTable) return null;

  // Find the header row within the target table
  const headerRow = targetTable.querySelector('tr[bgcolor="#006600"]');
  if (!headerRow) return null;

  // Extract headers
  const headerCells = headerRow.querySelectorAll('td');
  const headers = [];
  for (const cell of headerCells) {
    headers.push(cell.textContent.trim());
  }

  if (headers.length < 3) return null;

  const rows = [];
  let highlightIndex = -1;
  const allRows = targetTable.querySelectorAll('tr');

  for (const row of allRows) {
    if (row === headerRow) continue;
    const cells = row.querySelectorAll('td');
    if (cells.length < 3) continue;

    // Find the cell with a nation.php link
    let teamName = '';
    let teamLink = '';
    let linkCellIndex = -1;

    for (let i = 0; i < cells.length; i++) {
      const link = cells[i].querySelector('a[href*="nation.php"]');
      if (link) {
        teamName = link.textContent.trim();
        teamLink = link.getAttribute('href') || '';
        linkCellIndex = i;
        break;
      }
    }

    if (!teamName || linkCellIndex < 0) continue;

    // Position is the first cell — strip trailing dot
    const position = cells[0].textContent.trim().replace(/\.$/, '');

    // Stats are all cells after the team name cell
    const stats = [];
    for (let i = linkCellIndex + 1; i < cells.length; i++) {
      stats.push(cells[i].textContent.trim());
    }

    // Check if this row belongs to the user's federation
    const isCurrentFed = teamLink.includes('num=' + fedNationNum);

    if (isCurrentFed) {
      highlightIndex = rows.length;
    }

    rows.push({ position, teamName, teamLink, stats, isCurrentFed });
  }

  if (rows.length === 0) return null;

  return { headers, rows, highlightIndex };
}
