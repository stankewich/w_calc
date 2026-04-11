import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { formatBBCode } from './formatBBCode.js';

/**
 * **Feature: interseason-cup-results, Property 4: BB-code форматирование содержит все данные**
 * **Validates: Requirements 5.1, 5.2, 5.3, 5.4**
 */

const teamNameArb = fc.stringMatching(/^[A-Za-z0-9][A-Za-z0-9 ]{0,19}$/)
  .filter(s => s.trim().length > 0);
const teamLinkArb = fc.constantFrom('/roster.php?num=100', '/roster.php?num=999');
const colValueArb = fc.integer({ min: 0, max: 99999 }).map(n => String(n));
const headerNameArb = fc.constantFrom('О', 'И', 'В', 'Н', 'П', 'Vs');

const cupEntryArb = (colCount) =>
  fc.record({
    nn: fc.integer({ min: 1, max: 100 }),
    rowNum: fc.integer({ min: 1, max: 500 }).map(n => String(n)),
    div: fc.constantFrom('D1', 'D2', 'D5', 'D10'),
    teamName: teamNameArb,
    teamLink: teamLinkArb,
    cols: fc.array(colValueArb, { minLength: colCount, maxLength: colCount }),
  });

const testDataArb = fc
  .integer({ min: 1, max: 6 })
  .chain(extraColCount => {
    const extraHeaders = fc.array(headerNameArb, { minLength: extraColCount, maxLength: extraColCount });
    const entries = fc.array(cupEntryArb(extraColCount), { minLength: 1, maxLength: 15 });
    return fc.record({ extraHeaders, entries });
  })
  .map(({ extraHeaders, entries }) => ({
    headers: ['№', 'Див', '№№', 'Команда', ...extraHeaders],
    entries,
  }));

describe('Feature: interseason-cup-results, Property 4: BB-code форматирование содержит все данные', () => {
  it('(а) each entry has link, rowNum, div, nn in [td] tags', () => {
    fc.assert(
      fc.property(testDataArb, ({ headers, entries }) => {
        const result = formatBBCode(entries, headers);
        for (const e of entries) {
          expect(result).toContain(`[td][a href=${e.teamLink} target="_blank"]${e.teamName}[/a][/td]`);
          expect(result).toContain('[td]' + e.rowNum + '[/td]');
          expect(result).toContain('[td]' + e.div + '[/td]');
          expect(result).toContain('[td]' + String(e.nn) + '[/td]');
        }
      }),
      { numRuns: 100 }
    );
  });

  it('(б) all column values present in [td] tags', () => {
    fc.assert(
      fc.property(testDataArb, ({ headers, entries }) => {
        const result = formatBBCode(entries, headers);
        for (const e of entries) {
          for (const col of e.cols) {
            expect(result).toContain('[td]' + col + '[/td]');
          }
        }
      }),
      { numRuns: 100 }
    );
  });

  it('(в) all headers present, wrapped in [table][tr][td]', () => {
    fc.assert(
      fc.property(testDataArb, ({ headers, entries }) => {
        const result = formatBBCode(entries, headers);
        for (const h of headers) {
          expect(result).toContain('[td]' + h + '[/td]');
        }
        expect(result.startsWith('[table width="100%"]\n')).toBe(true);
        expect(result.endsWith('\n[/table]')).toBe(true);
        const lines = result.split('\n');
        for (let i = 1; i < lines.length - 1; i++) {
          expect(lines[i].startsWith('[tr]')).toBe(true);
          expect(lines[i].endsWith('[/tr]')).toBe(true);
        }
      }),
      { numRuns: 100 }
    );
  });
});
