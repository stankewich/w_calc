// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { parseDivisionTable } from './parseDivisionTable.js';

/**
 * Builds a v2champ.php-style HTML with a division standings table.
 * Mirrors the real structure from exmpl/дивизион.html.
 */
function buildDivisionHtml(teams) {
  let html = '<html><body>';
  html += '<table width="100%" class="tbl" align="center">';
  // Header row
  html += '<tbody><tr bgcolor="#006600">';
  html += '<td class="lh18 txtw qt" width="35" style="background-color:#009900"><a class="mnuw"><b>М</b></a></td>';
  html += '<td class="lh18 txtw qt" width="15"></td>';
  html += '<td class="lh18 txtw qt" width="20"></td>';
  html += '<td class="lh18 txtw" width="16"></td>';
  html += '<td class="lh18 txtw"><a class="mnuw"><b>Команда</b></a></td>';
  html += '<td class="lh18 txtw qt" width="24"><b>И</b></td>';
  html += '<td class="lh18 txtw qt" width="24"><b>В</b></td>';
  html += '<td class="lh18 txtw qt" width="24"><b>Н</b></td>';
  html += '<td class="lh18 txtw qt" width="24"><b>П</b></td>';
  html += '<td class="lh18 txtw qt" width="30"><b>М+</b></td>';
  html += '<td class="lh18 txtw qt" width="30"><b>М-</b></td>';
  html += '<td class="lh18 txtw qt" width="38"><b>+/-</b></td>';
  html += '<td class="lh18 txtw qt" width="38" style="background-color:#009900"><b>О</b></td>';
  html += '<td class="lh18 txtw qt" width="38"><b>Vs</b></td>';
  html += '<td class="lh18 txtw qt" width="24"></td>';
  html += '<td class="lh18 txtw qt" width="38"><b>РМ</b></td>';
  html += '</tr>';

  for (const t of teams) {
    html += `<tr bgcolor="${t.bgcolor || ''}">`;
    // Position cell with nested table.nil
    html += '<td>';
    html += '<table width="100%" class="nil"><tbody><tr>';
    html += `<td class="txtr" width="50%"><b>${t.position}</b></td>`;
    html += `<td class="txt2l"><sup>(${t.prevPos || t.position})</sup></td>`;
    html += '</tr></tbody></table>';
    html += '</td>';
    // Position change icon cell
    html += '<td class="lh18 txt"></td>';
    // Position change text cell
    html += '<td class="lh18 txt2l"></td>';
    // Team logo cell
    html += '<td></td>';
    // Team name cell with roster.php link
    html += `<td class="lh18 txtl" style="padding-left:3px"><a href="https://www.virtualsoccer.ru/roster.php?num=${t.num}" class="mnu"><b>${t.name}</b></a></td>`;
    // Games, Wins, Draws, Losses
    html += `<td class="lh18 txt">${t.games}</td>`;
    html += `<td class="lh18 txt">${t.wins}</td>`;
    html += `<td class="lh18 txt">${t.draws}</td>`;
    html += `<td class="lh18 txt">${t.losses}</td>`;
    // Goals cell (colspan=2 with nested table)
    html += '<td colspan="2">';
    html += '<table width="100%" class="nil"><tbody><tr>';
    html += `<td class="lh18 txtr" width="45%">${t.goalsFor}</td>`;
    html += '<td class="lh18 txt">-</td>';
    html += `<td class="lh18 txtl" width="45%">${t.goalsAgainst}</td>`;
    html += '</tr></tbody></table>';
    html += '</td>';
    // GoalDiff
    html += `<td class="lh18 txtr" style="padding-right:9px">${t.goalDiff}</td>`;
    // Points
    html += `<td class="lh18 txtr" style="padding-right:12px"><b>${t.points}</b></td>`;
    // Vs
    html += `<td class="lh18 txtr" style="padding-right:6px">${t.vs}</td>`;
    // Vs change (skipped in parsing)
    html += '<td class="lh18 txt2l" style="padding-left:3px">+67</td>';
    // RM
    html += `<td class="lh18 txtr" style="padding-right:6px">${t.rm}</td>`;
    html += '</tr>';
  }

  html += '</tbody></table></body></html>';
  return html;
}

const sampleTeams = [
  { position: '1', prevPos: '7', num: '3172', name: 'Виндзор Старз', bgcolor: '#FFCCFF', games: '1', wins: '1', draws: '0', losses: '0', goalsFor: '6', goalsAgainst: '0', goalDiff: '+6', points: '3', vs: '2511', rm: '613' },
  { position: '2', prevPos: '8', num: '2585', name: 'Брэмптон Сити Юнайтед', bgcolor: '#FFEE88', games: '1', wins: '1', draws: '0', losses: '0', goalsFor: '4', goalsAgainst: '0', goalDiff: '+4', points: '3', vs: '2463', rm: '544' },
  { position: '3', prevPos: '16', num: '2577', name: 'Монреаль', bgcolor: '#FFEE88', games: '1', wins: '1', draws: '0', losses: '0', goalsFor: '3', goalsAgainst: '1', goalDiff: '+2', points: '3', vs: '1963', rm: '526' },
];

describe('parseDivisionTable', () => {
  it('extracts all rows from a division table', () => {
    const html = buildDivisionHtml(sampleTeams);
    const result = parseDivisionTable(html);
    expect(result).not.toBeNull();
    expect(result.rows).toHaveLength(3);
  });

  it('extracts position from nested table.nil', () => {
    const html = buildDivisionHtml(sampleTeams);
    const result = parseDivisionTable(html);
    expect(result.rows[0].position).toBe('1');
    expect(result.rows[1].position).toBe('2');
    expect(result.rows[2].position).toBe('3');
  });

  it('extracts team name and link', () => {
    const html = buildDivisionHtml(sampleTeams);
    const result = parseDivisionTable(html);
    expect(result.rows[0].teamName).toBe('Виндзор Старз');
    expect(result.rows[0].teamLink).toBe('https://www.virtualsoccer.ru/roster.php?num=3172');
    expect(result.rows[1].teamName).toBe('Брэмптон Сити Юнайтед');
    expect(result.rows[1].teamLink).toBe('https://www.virtualsoccer.ru/roster.php?num=2585');
  });

  it('extracts games, wins, draws, losses', () => {
    const html = buildDivisionHtml(sampleTeams);
    const result = parseDivisionTable(html);
    const row = result.rows[0];
    expect(row.games).toBe('1');
    expect(row.wins).toBe('1');
    expect(row.draws).toBe('0');
    expect(row.losses).toBe('0');
  });

  it('extracts goals from nested colspan=2 table', () => {
    const html = buildDivisionHtml(sampleTeams);
    const result = parseDivisionTable(html);
    expect(result.rows[0].goalsFor).toBe('6');
    expect(result.rows[0].goalsAgainst).toBe('0');
    expect(result.rows[2].goalsFor).toBe('3');
    expect(result.rows[2].goalsAgainst).toBe('1');
  });

  it('extracts goalDiff, points, vs, rm', () => {
    const html = buildDivisionHtml(sampleTeams);
    const result = parseDivisionTable(html);
    const row = result.rows[0];
    expect(row.goalDiff).toBe('+6');
    expect(row.points).toBe('3');
    expect(row.vs).toBe('2511');
    expect(row.rm).toBe('613');
  });

  it('returns null when no table.tbl exists', () => {
    const html = '<html><body><p>No table here</p></body></html>';
    const result = parseDivisionTable(html);
    expect(result).toBeNull();
  });

  it('returns null when table has no data rows', () => {
    let html = '<html><body><table class="tbl"><tbody>';
    html += '<tr bgcolor="#006600"><td><b>М</b></td><td><b>Команда</b></td></tr>';
    html += '</tbody></table></body></html>';
    const result = parseDivisionTable(html);
    expect(result).toBeNull();
  });

  it('returns null for empty HTML', () => {
    const result = parseDivisionTable('<html><body></body></html>');
    expect(result).toBeNull();
  });

  it('handles a single team row', () => {
    const html = buildDivisionHtml([sampleTeams[0]]);
    const result = parseDivisionTable(html);
    expect(result).not.toBeNull();
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0].teamName).toBe('Виндзор Старз');
    expect(result.rows[0].rm).toBe('613');
  });

  it('skips Vs change column correctly', () => {
    const html = buildDivisionHtml(sampleTeams);
    const result = parseDivisionTable(html);
    // Vs change is "+67" in our helper — it should NOT appear in vs or rm
    expect(result.rows[0].vs).toBe('2511');
    expect(result.rows[0].rm).toBe('613');
  });
});
