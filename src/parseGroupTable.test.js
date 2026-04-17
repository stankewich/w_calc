// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { parseGroupTable } from './parseGroupTable.js';

/**
 * Builds a worldcup.php-style HTML with one or more group tables.
 */
function buildWorldcupHtml(groups) {
  let html = '<html><body>';
  for (const group of groups) {
    html += `<p><a name="group_${group.id}"><b>Группа ${group.name}</b>:</a></p>`;
    // Standings table
    html += '<table width="80%" align="center" class="tbl">';
    html += '<tr bgcolor="#006600">';
    html += '<td><b>№</b></td><td><b>Команда</b></td><td><b>И</b></td><td><b>В</b></td><td><b>Н</b></td><td><b>П</b></td><td><b>М</b></td><td><b>Р</b></td><td><b>О</b></td><td><b>Vs</b></td><td><b>Р</b></td>';
    html += '</tr>';
    for (const team of group.teams) {
      html += `<tr bgcolor="${team.bgcolor || ''}">`;
      html += `<td class="lh16 txtr">${team.pos}.</td>`;
      html += `<td class="lh16 txtl"><div class="cntr" style="float:left"></div><a href="https://www.virtualsoccer.ru/nation.php?num=${team.num}" class="mnu">${team.name}</a></td>`;
      for (const s of team.stats) {
        html += `<td class="lh16 txt">${s}</td>`;
      }
      html += '</tr>';
    }
    html += '</table>';
  }
  html += '</body></html>';
  return html;
}

const sampleGroups = [
  {
    id: 'NA-A', name: 'A',
    teams: [
      { pos: 1, num: '124401', name: 'Тринидад и Тобаго', bgcolor: '#99FF99', stats: ['1','1','0','0','2 - 0','+2','3','1066','17.65'] },
      { pos: 2, num: '124345', name: 'США', bgcolor: '', stats: ['1','1','0','0','1 - 0','+1','3','1152','41.54'] },
    ]
  },
  {
    id: 'NA-D', name: 'D',
    teams: [
      { pos: 1, num: '124409', name: 'Канада', bgcolor: '#99FF99', stats: ['1','1','0','0','1 - 0','+1','3','1102','47.98'] },
      { pos: 2, num: '124026', name: 'Багамские о-ва', bgcolor: '', stats: ['1','1','0','0','1 - 0','+1','3','1143','34.72'] },
      { pos: 3, num: '124124', name: 'Мексика', bgcolor: '', stats: ['1','0','1','0','0 - 0','0','1','1091','57.04'] },
      { pos: 4, num: '124163', name: 'Никарагуа', bgcolor: '', stats: ['1','0','0','1','0 - 1','-1','0','951','10.92'] },
    ]
  }
];

describe('parseGroupTable (worldcup.php)', () => {
  it('finds the correct group containing fedNationNum', () => {
    const html = buildWorldcupHtml(sampleGroups);
    const result = parseGroupTable(html, '124409');
    expect(result).not.toBeNull();
    expect(result.rows.length).toBe(4);
    expect(result.rows[0].teamName).toBe('Канада');
    expect(result.highlightIndex).toBe(0);
  });

  it('strips trailing dot from position', () => {
    const html = buildWorldcupHtml(sampleGroups);
    const result = parseGroupTable(html, '124409');
    expect(result.rows[0].position).toBe('1');
    expect(result.rows[1].position).toBe('2');
    expect(result.rows[2].position).toBe('3');
  });

  it('extracts all headers', () => {
    const html = buildWorldcupHtml(sampleGroups);
    const result = parseGroupTable(html, '124409');
    expect(result.headers).toEqual(['№', 'Команда', 'И', 'В', 'Н', 'П', 'М', 'Р', 'О', 'Vs', 'Р']);
  });

  it('extracts stats for each team', () => {
    const html = buildWorldcupHtml(sampleGroups);
    const result = parseGroupTable(html, '124409');
    expect(result.rows[0].stats).toEqual(['1','1','0','0','1 - 0','+1','3','1102','47.98']);
  });

  it('highlights the correct federation row', () => {
    const html = buildWorldcupHtml(sampleGroups);
    const result = parseGroupTable(html, '124026');
    expect(result).not.toBeNull();
    expect(result.highlightIndex).toBe(1);
    expect(result.rows[1].isCurrentFed).toBe(true);
    expect(result.rows[0].isCurrentFed).toBe(false);
  });

  it('finds team in a different group', () => {
    const html = buildWorldcupHtml(sampleGroups);
    const result = parseGroupTable(html, '124345');
    expect(result).not.toBeNull();
    expect(result.rows.length).toBe(2);
    expect(result.rows[1].teamName).toBe('США');
    expect(result.highlightIndex).toBe(1);
  });

  it('returns null when fedNationNum is not in any group', () => {
    const html = buildWorldcupHtml(sampleGroups);
    const result = parseGroupTable(html, '999999');
    expect(result).toBeNull();
  });

  it('returns null for empty HTML', () => {
    const result = parseGroupTable('<html><body></body></html>', '124409');
    expect(result).toBeNull();
  });

  it('includes team links', () => {
    const html = buildWorldcupHtml(sampleGroups);
    const result = parseGroupTable(html, '124409');
    expect(result.rows[0].teamLink).toContain('nation.php?num=124409');
    expect(result.rows[3].teamLink).toContain('nation.php?num=124163');
  });
});
