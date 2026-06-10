// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { parseMatchComments } from './parseMatchComments.js';

// ---------------------------------------------------------------------------
// HTML builders matching the real viewmatch.php structure
// ---------------------------------------------------------------------------

/**
 * Builds a match comment section («Комментарии к матчу:»)
 * with rows using <tr id="c{N}"> / <span id="nick{N}"> / <div id="mess{N}">
 */
function buildMatchCommentsHtml(comments) {
  const rows = comments.map((c, i) => {
    const id = 1000 + i;
    return `
      <tr id="c${id}" bgcolor="#EEFEEE">
        <td><table class="nil wst" id="mcmntslast">
          <tbody>
            <tr class="mng_user_${id}" bgcolor="#EEFEEE">
              <td valign="top" class="lh18 txt2l">
                <span id="nick${id}">${c.nick}</span>
              </td>
            </tr>
            <tr bgcolor="#EEFEEE">
              <td class="lh16 txtj" colspan="2">
                <div id="mess${id}" style="display:none">${c.text}</div>
                <div id="id${id}" style="width:740px">${c.text}</div>
              </td>
            </tr>
          </tbody>
        </table></td>
      </tr>`;
  }).join('');

  return `<html><body>
    <table width="100%" class="tobl">
      <tbody><tr bgcolor="#006600"><td><b>Комментарии к матчу:</b></td></tr></tbody>
    </table>
    <table width="100%" class="tobl">
      <tbody>${rows}</tbody>
    </table>
  </body></html>`;
}

/**
 * Builds a coach comment section («Комментарии тренеров команд:»)
 * with the real table.nol structure: tr per timing, td[0]=home, td[1]=away
 */
function buildCoachCommentsHtml(comments) {
  // Group by timing
  const byTiming = {};
  for (const c of comments) {
    const t = c.timing || 'after';
    if (!byTiming[t]) byTiming[t] = [];
    byTiming[t].push(c);
  }

  const rows = Object.entries(byTiming).map(([timing, cms]) => {
    const label = timing === 'before' ? 'до матча' : 'после матча';
    const home = cms.find(c => c.side === 'home');
    const away = cms.find(c => c.side === 'away');

    function makeCell(cm) {
      if (!cm) return `<td class="txt2" width="50%" style="padding:10px">—</td>`;
      return `<td class="txtj" width="50%" style="padding-bottom:5px; padding-top:5px" valign="top">
        <div class="txtr"><b>${label}</b></div>
        <div style="padding-top:5px; padding-right:5px; overflow:hidden">
          <a href="https://example.com/v3_profile.php?num=1" target="_blank"><b>${cm.nick} Full</b></a>
          aka <a href="https://example.com/v3_profile.php?num=1" class="mnu" target="_blank"><b>${cm.nick}</b></a>
          (<b>${cm.team}</b>): "${cm.text}"
        </div>
      </td>`;
    }

    return `<tr>${makeCell(home)}${makeCell(away)}</tr>`;
  }).join('');

  return `<html><body>
    <table width="100%" class="tobl">
      <tbody><tr bgcolor="#006600"><td><b>Комментарии тренеров команд:</b></td></tr></tbody>
    </table>
    <table width="100%" class="tobl">
      <tbody><tr><td>
        <table width="100%" class="nol">
          <tbody>${rows}</tbody>
        </table>
      </td></tr></tbody>
    </table>
  </body></html>`;
}

// ---------------------------------------------------------------------------
// Unit tests
// ---------------------------------------------------------------------------

describe('parseMatchComments', () => {
  // --- Match comments ---
  it('returns N match comments for HTML with N comments', () => {
    const html = buildMatchCommentsHtml([
      { nick: 'Manager1', text: 'Отличный матч!' },
      { nick: 'Manager2', text: 'Хорошая игра.' },
      { nick: 'Manager3', text: 'Поздравляю!' },
    ]);
    const result = parseMatchComments(html);
    expect(result).toHaveLength(3);
  });

  it('returns empty array when there are no comment sections', () => {
    const html = '<html><body><p>No comments here</p></body></html>';
    const result = parseMatchComments(html);
    expect(result).toEqual([]);
  });

  it('returns empty array for empty HTML', () => {
    expect(parseMatchComments('<html><body></body></html>')).toEqual([]);
  });

  it('returns empty array for falsy input', () => {
    expect(parseMatchComments('')).toEqual([]);
    expect(parseMatchComments(null)).toEqual([]);
  });

  it('match comment has type="match", nick and text', () => {
    const html = buildMatchCommentsHtml([{ nick: 'Cavs92', text: 'Бот силен.' }]);
    const result = parseMatchComments(html);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('match');
    expect(result[0].nick).toBe('Cavs92');
    expect(result[0].text).toBe('Бот силен.');
  });

  // --- Coach comments ---
  it('coach comment has type="coach", nick, team and text', () => {
    const html = buildCoachCommentsHtml([{ nick: 'BGV', team: 'Чунан Юниверсити', text: 'Визовые проблемы сейчас решим', side: 'home', timing: 'after' }]);
    const result = parseMatchComments(html);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('coach');
    expect(result[0].nick).toBe('BGV');
    expect(result[0].team).toBe('Чунан Юниверсити');
    expect(result[0].text).toBe('Визовые проблемы сейчас решим');
    expect(result[0].side).toBe('home');
    expect(result[0].timing).toBe('after');
  });

  it('returns both coach and match comments from same page', () => {
    const coachHtml = buildCoachCommentsHtml([{ nick: 'Coach1', team: 'TeamA', text: 'Good game', side: 'home', timing: 'after' }]);
    const matchHtml = buildMatchCommentsHtml([{ nick: 'Fan1', text: 'Great match!' }]);
    const combined = `<html><body>
      ${coachHtml.replace(/^<html><body>/, '').replace(/<\/body><\/html>$/, '')}
      ${matchHtml.replace(/^<html><body>/, '').replace(/<\/body><\/html>$/, '')}
    </body></html>`;
    const result = parseMatchComments(combined);
    expect(result.some(r => r.type === 'coach')).toBe(true);
    expect(result.some(r => r.type === 'match')).toBe(true);
  });
});
