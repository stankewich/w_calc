import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { parseCupTable } from './parseCupTable.js';

/**
 * **Feature: interseason-cup-results, Property 2: Парсинг таблицы извлекает все поля**
 * **Validates: Requirements 3.2, 3.3**
 */

const teamNameArb = fc.stringMatching(/^[A-Za-z0-9][A-Za-z0-9 ]{0,20}$/)
  .filter(s => s.trim().length > 0);
const teamNumArb = fc.integer({ min: 1, max: 99999 });
const colValueArb = fc.integer({ min: 0, max: 99999 }).map(n => String(n));
const headerNameArb = fc.constantFrom('И', 'В', 'Н', 'П', 'М', 'Р', 'Д', 'Г', 'О', 'Vs');

const cupTableArb = fc.record({
  extraHeaders: fc.array(headerNameArb, { minLength: 1, maxLength: 6 }),
  rows: fc.array(
    fc.record({
      rowNum: fc.integer({ min: 1, max: 500 }),
      div: fc.integer({ min: 1, max: 20 }),
      nn: fc.integer({ min: 1, max: 500 }),
      teamName: teamNameArb,
      teamNum: teamNumArb,
    }),
    { minLength: 1, maxLength: 15 }
  ),
}).chain(({ extraHeaders, rows }) => {
  return fc.array(
    fc.array(colValueArb, { minLength: extraHeaders.length, maxLength: extraHeaders.length }),
    { minLength: rows.length, maxLength: rows.length }
  ).map(colsPerRow => ({
    extraHeaders,
    rows: rows.map((row, i) => ({ ...row, cols: colsPerRow[i] })),
  }));
});

function buildHtml(extraHeaders, rows) {
  const allHeaders = ['№', 'Див', '№№', 'Команда', ...extraHeaders];
  const headerCells = allHeaders.map(h => `<td><b>${h}</b></td>`).join('');
  const headerRowHtml = `<tr bgcolor="#006600">${headerCells}</tr>`;
  const dataRows = rows.map(r => {
    const rowNumTd = `<td>${r.rowNum}.</td>`;
    const divTd = `<td><span style="color:#999999">D</span>${r.div}</td>`;
    const nnTd = `<td><span style="color:#999999">- </span>${r.nn}</td>`;
    const iconTd = `<td style="background:url(pics/teams18/${r.teamNum}.png)"></td>`;
    const teamTd = `<td><a href="https://www.virtualsoccer.ru/roster.php?num=${r.teamNum}" class="mnu"><b>${r.teamName}</b></a></td>`;
    const colTds = r.cols.map(c => `<td>${c}</td>`).join('');
    return `<tr>${rowNumTd}${divTd}${nnTd}${iconTd}${teamTd}${colTds}</tr>`;
  }).join('\n');
  return `<html><body><table>${headerRowHtml}\n${dataRows}</table></body></html>`;
}

describe('Feature: interseason-cup-results, Property 2: Парсинг таблицы извлекает все поля', () => {
  it('should extract rowNum, div, nn, teamName, teamLink, and cols', () => {
    fc.assert(
      fc.property(cupTableArb, ({ extraHeaders, rows }) => {
        const html = buildHtml(extraHeaders, rows);
        const result = parseCupTable(html);
        expect(result.entries.length).toBe(rows.length);
        for (let i = 0; i < result.entries.length; i++) {
          const entry = result.entries[i];
          const input = rows[i];
          expect(entry.nn).toBe(input.nn);
          expect(entry.rowNum).toBe(String(input.rowNum));
          expect(entry.div).toContain(String(input.div));
          expect(entry.teamName).toBe(input.teamName.trim());
          expect(entry.teamLink).toContain('roster.php?num=' + input.teamNum);
          expect(entry.cols.length).toBe(extraHeaders.length);
          for (let j = 0; j < entry.cols.length; j++) {
            expect(entry.cols[j]).toBe(input.cols[j]);
          }
        }
      }),
      { numRuns: 100 }
    );
  });
});
