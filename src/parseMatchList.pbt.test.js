// @vitest-environment jsdom
// Feature: fed-news-calculator-tab, Property 8: parseMatchList извлекает все сыгранные матчи с сохранением порядка
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { parseMatchList } from './parseMatchList.js';

/**
 * Builds a v2champ.php-style HTML with the given played matches.
 *
 * @param {Array<{matchId: string, day: string, homeTeam: string, awayTeam: string, score: string}>} matches
 */
function buildMatchListHtml(matches) {
  const rows = matches.map(m => `
    <tr>
      <td class="lh16 txtr" width="40"></td>
      <td class="lh16 txtr" nowrap="nowrap" width="300">
        <a href="https://www.virtualsoccer.ru/roster.php?num=${m.matchId}00" class="mnu qt" title="${m.homeTeam}"><b>${m.homeTeam}</b></a>
      </td>
      <td class="lh16 txtl" nowrap="nowrap" width="285">
        &nbsp;-&nbsp;<a href="https://www.virtualsoccer.ru/roster.php?num=${m.matchId}01" class="mnu qt" title="${m.awayTeam}"><b>${m.awayTeam}</b></a>
      </td>
      <td class="lh16 txtl" width="140">
        <a href="https://www.virtualsoccer.ru/viewmatch.php?day=${m.day}&amp;match_id=${m.matchId}" target="_blank" class="mnu"><b>${m.score}</b></a>
      </td>
    </tr>`).join('');

  return `<html><body>
    <table border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody>${rows}</tbody>
    </table>
  </body></html>`;
}

/** Arbitrary for a non-empty alphanumeric string (safe for HTML text content) */
const nonEmptyAlpha = fc.stringMatching(/^[A-Za-z][A-Za-z0-9 ]{0,19}$/).filter(s => s.trim().length > 0);

/** Arbitrary for a positive integer ID as string */
const idArb = fc.integer({ min: 1, max: 999999 }).map(String);

/** Arbitrary for a single MatchEntry input */
const matchArb = fc.record({
  matchId: idArb,
  day: idArb,
  homeTeam: nonEmptyAlpha,
  awayTeam: nonEmptyAlpha,
  score: fc.tuple(
    fc.integer({ min: 0, max: 9 }),
    fc.integer({ min: 0, max: 9 })
  ).map(([h, a]) => `${h}:${a}`),
});

/** Array of matches with unique matchIds (deduplication mirrors real-world behaviour) */
const uniqueMatchesArb = fc.array(matchArb, { minLength: 0, maxLength: 15 }).map(matches => {
  const seen = new Set();
  return matches.filter(m => { if (seen.has(m.matchId)) return false; seen.add(m.matchId); return true; });
});

describe('Property 8: parseMatchList извлекает все сыгранные матчи с сохранением порядка', () => {
  it('length equals number of viewmatch.php links in HTML', () => {
    // Validates: Requirements 6.1, 6.3
    fc.assert(
      fc.property(
        uniqueMatchesArb,
        (matches) => {
          const html = buildMatchListHtml(matches);
          const result = parseMatchList(html);
          expect(result).toHaveLength(matches.length);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('order of entries matches order in HTML', () => {
    // Validates: Requirements 6.3
    fc.assert(
      fc.property(
        uniqueMatchesArb.filter(m => m.length >= 1),
        (matches) => {
          const html = buildMatchListHtml(matches);
          const result = parseMatchList(html);
          expect(result.map(r => r.matchId)).toEqual(matches.map(m => m.matchId));
        }
      ),
      { numRuns: 100 }
    );
  });

  it('each entry has non-empty matchId, day, homeTeam, awayTeam, score, matchUrl', () => {
    // Validates: Requirements 6.1
    fc.assert(
      fc.property(
        fc.array(matchArb, { minLength: 1, maxLength: 15 }),
        (matches) => {
          const html = buildMatchListHtml(matches);
          const result = parseMatchList(html);
          for (const entry of result) {
            expect(entry.matchId).toBeTruthy();
            expect(entry.day).toBeTruthy();
            expect(entry.homeTeam).toBeTruthy();
            expect(entry.awayTeam).toBeTruthy();
            expect(entry.score).toBeTruthy();
            expect(entry.matchUrl).toBeTruthy();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('matchUrl contains day and matchId from the entry', () => {
    // Validates: Requirements 6.1
    fc.assert(
      fc.property(
        fc.array(matchArb, { minLength: 1, maxLength: 15 }),
        (matches) => {
          const html = buildMatchListHtml(matches);
          const result = parseMatchList(html);
          for (const entry of result) {
            expect(entry.matchUrl).toContain(`day=${entry.day}`);
            expect(entry.matchUrl).toContain(`match_id=${entry.matchId}`);
            expect(entry.matchUrl).toContain('viewmatch.php');
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
