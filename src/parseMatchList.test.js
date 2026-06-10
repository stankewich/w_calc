// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { parseMatchList } from './parseMatchList.js';

/**
 * Builds a v2champ.php-style HTML with match rows.
 *
 * @param {Array<{matchId: string, day: string, homeTeam: string, awayTeam: string, score: string}>} matches
 * @param {Array<{matchId: string, day: string, homeTeam: string, awayTeam: string}>} [previews]
 */
function buildMatchListHtml(matches, previews = []) {
  const playedRows = matches.map(m => `
    <tr>
      <td class="lh16 txtr" width="40"></td>
      <td class="lh16 txtr" nowrap="nowrap" width="300">
        <a href="https://www.virtualsoccer.ru/roster.php?num=100" class="mnu qt" title="${m.homeTeam}"><b>${m.homeTeam}</b></a>
      </td>
      <td class="lh16 txtl" nowrap="nowrap" width="285">
        &nbsp;-&nbsp;<a href="https://www.virtualsoccer.ru/roster.php?num=200" class="mnu qt" title="${m.awayTeam}"><b>${m.awayTeam}</b></a>
      </td>
      <td class="lh16 txtl" width="140">
        <a href="https://www.virtualsoccer.ru/viewmatch.php?day=${m.day}&amp;match_id=${m.matchId}" target="_blank" class="mnu"><b>${m.score}</b></a>
      </td>
    </tr>`).join('');

  const previewRows = previews.map(p => `
    <tr>
      <td class="lh16 txtr" width="40"></td>
      <td class="lh16 txtr" nowrap="nowrap" width="300">
        <a href="https://www.virtualsoccer.ru/roster.php?num=300" class="mnu qt" title="${p.homeTeam}"><b>${p.homeTeam}</b></a>
      </td>
      <td class="lh16 txtl" nowrap="nowrap" width="285">
        &nbsp;-&nbsp;<a href="https://www.virtualsoccer.ru/roster.php?num=400" class="mnu qt" title="${p.awayTeam}"><b>${p.awayTeam}</b></a>
      </td>
      <td class="lh16 txtl" width="140">
        <a href="https://www.virtualsoccer.ru/previewmatch.php?day=${p.day}&amp;match_id=${p.matchId}" class="mnu"><b>?:?</b></a>
      </td>
    </tr>`).join('');

  return `<html><body>
    <table border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody>
        ${playedRows}
        ${previewRows}
      </tbody>
    </table>
  </body></html>`;
}

describe('parseMatchList', () => {
  it('returns N entries for HTML with N played matches', () => {
    const matches = [
      { matchId: '2309', day: '25693', homeTeam: 'Тандер Бэй Чил', awayTeam: 'Альянс Юнайтед', score: '2:1' },
      { matchId: '2310', day: '25693', homeTeam: 'Симко Каунти Роверс', awayTeam: 'Сен-Лорен', score: '2:0' },
      { matchId: '2311', day: '25693', homeTeam: 'Пасифик', awayTeam: 'Блю Девилс', score: '2:0' },
    ];
    const html = buildMatchListHtml(matches);
    const result = parseMatchList(html);
    expect(result).toHaveLength(3);
  });

  it('ignores rows with previewmatch.php (unplayed matches)', () => {
    const matches = [
      { matchId: '2309', day: '25693', homeTeam: 'Команда А', awayTeam: 'Команда Б', score: '1:0' },
    ];
    const previews = [
      { matchId: '9999', day: '25700', homeTeam: 'Команда В', awayTeam: 'Команда Г' },
      { matchId: '9998', day: '25700', homeTeam: 'Команда Д', awayTeam: 'Команда Е' },
    ];
    const html = buildMatchListHtml(matches, previews);
    const result = parseMatchList(html);
    expect(result).toHaveLength(1);
    expect(result[0].matchId).toBe('2309');
  });

  it('preserves match order as in HTML', () => {
    const matches = [
      { matchId: '1001', day: '25693', homeTeam: 'Первая', awayTeam: 'Вторая', score: '3:0' },
      { matchId: '1002', day: '25693', homeTeam: 'Третья', awayTeam: 'Четвёртая', score: '1:1' },
      { matchId: '1003', day: '25693', homeTeam: 'Пятая', awayTeam: 'Шестая', score: '0:2' },
    ];
    const html = buildMatchListHtml(matches);
    const result = parseMatchList(html);
    expect(result.map(m => m.matchId)).toEqual(['1001', '1002', '1003']);
  });

  it('returns empty array for HTML with no matches', () => {
    const html = '<html><body><table><tbody></tbody></table></body></html>';
    const result = parseMatchList(html);
    expect(result).toEqual([]);
  });

  it('returns empty array for empty HTML', () => {
    const result = parseMatchList('<html><body></body></html>');
    expect(result).toEqual([]);
  });

  it('all MatchEntry fields are non-empty for valid HTML', () => {
    const matches = [
      { matchId: '2309', day: '25693', homeTeam: 'Тандер Бэй Чил', awayTeam: 'Альянс Юнайтед', score: '2:1' },
    ];
    const html = buildMatchListHtml(matches);
    const result = parseMatchList(html);
    expect(result).toHaveLength(1);
    const entry = result[0];
    expect(entry.matchId).toBeTruthy();
    expect(entry.day).toBeTruthy();
    expect(entry.homeTeam).toBeTruthy();
    expect(entry.awayTeam).toBeTruthy();
    expect(entry.score).toBeTruthy();
    expect(entry.matchUrl).toBeTruthy();
  });

  it('extracts correct field values from match row', () => {
    const matches = [
      { matchId: '2309', day: '25693', homeTeam: 'Тандер Бэй Чил', awayTeam: 'Альянс Юнайтед', score: '2:1' },
    ];
    const html = buildMatchListHtml(matches);
    const result = parseMatchList(html);
    expect(result[0]).toEqual({
      matchId: '2309',
      day: '25693',
      homeTeam: 'Тандер Бэй Чил',
      awayTeam: 'Альянс Юнайтед',
      score: '2:1',
      matchUrl: 'https://www.virtualsoccer.ru/viewmatch.php?day=25693&match_id=2309',
      homeUrl: 'https://www.virtualsoccer.ru/roster.php?num=100',
      awayUrl: 'https://www.virtualsoccer.ru/roster.php?num=200',
    });
  });

  it('handles HTML with only previewmatch rows — returns empty array', () => {
    const previews = [
      { matchId: '9999', day: '25700', homeTeam: 'Команда А', awayTeam: 'Команда Б' },
    ];
    const html = buildMatchListHtml([], previews);
    const result = parseMatchList(html);
    expect(result).toEqual([]);
  });
});
