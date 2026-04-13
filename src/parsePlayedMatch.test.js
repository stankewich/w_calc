import { describe, it, expect } from 'vitest';
import { parsePlayedMatch, parseWorldcupLink } from './parsePlayedMatch.js';

describe('parsePlayedMatch', () => {
  function buildNationHtml({ country = 'Канада', suffix = '(юношеская)', opponent = 'Никарагуа', oppSuffix = '(юн.)', score = '1:0', matchDay = '25692', matchId = '247968', hasPlayedMatch = true } = {}) {
    const header = `<table><tr><td class="lh20 hdr2l"><a href="https://www.virtualsoccer.ru/nation.php?num=124409" class="mnu">${country}${suffix ? ' ' + suffix : ''}</a></td></tr></table>`;
    let matchDiv = '';
    if (hasPlayedMatch) {
      matchDiv = `<div class="lh14 txt2r" style="margin-right:2px">вчера, 22:00 - Г - <a href="https://www.virtualsoccer.ru/nation.php?num=124163">${opponent}${oppSuffix ? ' ' + oppSuffix : ''}</a> <a href="https://www.virtualsoccer.ru/viewmatch.php?day=${matchDay}&amp;match_id=${matchId}" class="mnu"><b>${score}</b></a></div>`;
    }
    const futureDiv = `<div class="lh14 txt2r" style="margin-right:2px">19 апреля, 22:00 - Д - <a href="https://www.virtualsoccer.ru/nation.php?num=124116">Гайана (юн.)</a> <a href="https://www.virtualsoccer.ru/previewmatch.php?day=25723&amp;match_id=248071" class="mnu"><b>?:?</b></a></div>`;
    return `<html><body>${header}${matchDiv}${futureDiv}</body></html>`;
  }

  it('extracts match data from nation.php HTML', () => {
    const html = buildNationHtml();
    const result = parsePlayedMatch(html);
    expect(result).not.toBeNull();
    expect(result.matchUrl).toContain('viewmatch.php');
    expect(result.matchUrl).toContain('match_id=247968');
    expect(result.score).toBe('1:0');
    expect(result.country1).toBe('Канада');
    expect(result.country2).toBe('Никарагуа');
  });

  it('strips type suffix from opponent name', () => {
    const html = buildNationHtml({ opponent: 'Мексика', oppSuffix: '(мол.)' });
    const result = parsePlayedMatch(html);
    expect(result.country2).toBe('Мексика');
  });

  it('strips type suffix from home team name', () => {
    const html = buildNationHtml({ country: 'Россия', suffix: '(молодёжная)' });
    const result = parsePlayedMatch(html);
    expect(result.country1).toBe('Россия');
  });

  it('returns null when no viewmatch.php link exists', () => {
    const html = buildNationHtml({ hasPlayedMatch: false });
    const result = parsePlayedMatch(html);
    expect(result).toBeNull();
  });

  it('handles country name without suffix', () => {
    const html = buildNationHtml({ country: 'Канада', suffix: '' });
    const result = parsePlayedMatch(html);
    expect(result.country1).toBe('Канада');
  });

  it('works with real nation.php example HTML', () => {
    const html = `<html><body>
      <table><tr>
        <td class="lh20 hdr2l"><a href="https://www.virtualsoccer.ru/nation.php?num=124409" class="mnu">Канада (юношеская)</a></td>
      </tr></table>
      <td colspan="2" style="padding-top:15px"><div class="lh14 txt2r" style="margin-right:2px">вчера, 22:00 - Г - <a href="https://www.virtualsoccer.ru/nation.php?num=124163">Никарагуа (юн.)</a> <a href="https://www.virtualsoccer.ru/viewmatch.php?day=25692&amp;match_id=247968" class="mnu"><b>1:0</b></a></div></td>
    </body></html>`;
    const result = parsePlayedMatch(html);
    expect(result).not.toBeNull();
    expect(result.country1).toBe('Канада');
    expect(result.country2).toBe('Никарагуа');
    expect(result.score).toBe('1:0');
  });
});

describe('parseWorldcupLink', () => {
  it('extracts worldcup.php URL without hash', () => {
    const html = `<html><body>
      <a href="https://www.virtualsoccer.ru/worldcup.php?num=126628&amp;type=u&amp;continent_num=4#group_NA-D">Отборочный турнир к чемпионату мира, 77 сезон</a>
    </body></html>`;
    const result = parseWorldcupLink(html);
    expect(result).toBe('https://www.virtualsoccer.ru/worldcup.php?num=126628&type=u&continent_num=4');
  });

  it('returns URL as-is when no hash present', () => {
    const html = `<html><body>
      <a href="https://www.virtualsoccer.ru/worldcup.php?num=126628&amp;type=n">Турнир</a>
    </body></html>`;
    const result = parseWorldcupLink(html);
    expect(result).toBe('https://www.virtualsoccer.ru/worldcup.php?num=126628&type=n');
  });

  it('returns null when no worldcup.php link exists', () => {
    const html = `<html><body><a href="https://www.virtualsoccer.ru/nation.php?num=123">Test</a></body></html>`;
    const result = parseWorldcupLink(html);
    expect(result).toBeNull();
  });
});
