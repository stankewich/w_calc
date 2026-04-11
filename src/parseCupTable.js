/**
 * Extracted from initInterseasonCupResults() in calc.user.js for testability.
 * Parses HTML table from cupm_table.php and extracts cup entries.
 *
 * Table structure: №, Див, №№, [icon], Команда, И, В, Н, П, М, Р, Д, Г, О, Vs
 *
 * @param {string} html - HTML string from cupm_table.php
 * @returns {{ headers: string[], entries: Array<{nn: number, rowNum: string, div: string, teamName: string, teamLink: string, cols: string[]}> }}
 */
export function parseCupTable(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const headerRow = doc.querySelector('tr[bgcolor="#006600"]');
  if (!headerRow) return { headers: [], entries: [] };

  const headerCells = headerRow.querySelectorAll('td');
  const headers = [];
  for (const cell of headerCells) {
    headers.push(cell.textContent.trim());
  }

  const entries = [];
  const allRows = doc.querySelectorAll('tr');
  for (const row of allRows) {
    if (row === headerRow) continue;
    const cells = row.querySelectorAll('td');
    if (cells.length < 6) continue;

    const rowNum = cells[0]?.textContent.trim().replace(/\.$/, '');
    const div = cells[1]?.textContent.trim();
    const nnText = cells[2]?.textContent.replace(/[^0-9]/g, '');
    const nn = parseInt(nnText, 10);
    if (isNaN(nn)) continue;

    var teamName = '';
    var teamHref = '';
    var ci = 3;
    for (; ci < cells.length; ci++) {
      var link = cells[ci].querySelector('a[href*="roster.php"]');
      if (link) {
        teamName = link.textContent.trim();
        teamHref = link.getAttribute('href') || '';
        break;
      }
    }
    if (!teamName) continue;

    const cols = [];
    for (let i = ci + 1; i < cells.length; i++) {
      cols.push(cells[i].textContent.trim());
    }

    entries.push({ nn, rowNum, div, teamName, teamLink: teamHref, cols });
  }

  return { headers, entries };
}
