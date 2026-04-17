// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { parseMatchStrength } from './parseMatchStrength.js';

function buildStrengthHtml({ startHome = '3375', startHomePercent = '42%', startAway = '4621', startAwayDiff = '+1246', startAwayPercent = '58%', endHome = '2649', endHomePercent = '43%', endAway = '3516', endAwayDiff = '+867', endAwayPercent = '57%' } = {}) {
  return `<html><body>
    <table width="100%" class="nol"><tbody><tr>
      <td class="lh18 txt" width="150" bgcolor="#e5f7e6">Сила в начале матча<button class="btn-help"></button></td>
      <td class="rdl" width="268">${startHome}<div style="float:right"><b>${startHomePercent}</b></div></td>
      <td class="gdl">${startAway}<span class="lh12 up">${startAwayDiff}</span><div style="float:left"><b>${startAwayPercent}</b></div></td>
    </tr></tbody></table>
    <table width="100%" class="nol"><tbody><tr>
      <td class="lh18 txt" width="150" bgcolor="#e5f7e6">Сила в конце матча<button class="btn-help"></button></td>
      <td class="rdl" width="273">${endHome}<div style="float:right"><b>${endHomePercent}</b></div></td>
      <td class="gdl">${endAway}<span class="lh12 up">${endAwayDiff}</span><div style="float:left"><b>${endAwayPercent}</b></div></td>
    </tr></tbody></table>
  </body></html>`;
}

describe('parseMatchStrength', () => {
  it('returns null for empty/null input', () => {
    expect(parseMatchStrength('')).toBeNull();
    expect(parseMatchStrength(null)).toBeNull();
  });

  it('returns null when no strength tables exist', () => {
    expect(parseMatchStrength('<html><body></body></html>')).toBeNull();
  });

  it('parses start and end strength from viewmatch HTML', () => {
    var html = buildStrengthHtml();
    var result = parseMatchStrength(html);
    expect(result).not.toBeNull();
    expect(result.start).toEqual({
      label: 'Сила в начале матча',
      homeValue: 3375,
      homePercent: 42,
      awayValue: 4621,
      awayPercent: 58,
      diff: 1246
    });
    expect(result.end).toEqual({
      label: 'Сила в конце матча',
      homeValue: 2649,
      homePercent: 43,
      awayValue: 3516,
      awayPercent: 57,
      diff: 867
    });
  });

  it('handles only start strength present', () => {
    var html = `<html><body>
      <table width="100%" class="nol"><tbody><tr>
        <td class="lh18 txt" width="150" bgcolor="#e5f7e6">Сила в начале матча</td>
        <td class="rdl">1000<div><b>40%</b></div></td>
        <td class="gdl">1500<span>+500</span><div><b>60%</b></div></td>
      </tr></tbody></table>
    </body></html>`;
    var result = parseMatchStrength(html);
    expect(result).not.toBeNull();
    expect(result.start).not.toBeNull();
    expect(result.end).toBeNull();
  });

  it('handles equal strength values', () => {
    var html = buildStrengthHtml({
      startHome: '3000', startHomePercent: '50%',
      startAway: '3000', startAwayDiff: '+0', startAwayPercent: '50%'
    });
    var result = parseMatchStrength(html);
    expect(result.start.homeValue).toBe(3000);
    expect(result.start.awayValue).toBe(3000);
    expect(result.start.diff).toBe(0);
  });
});
