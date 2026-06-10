// @vitest-environment jsdom
// Feature: fed-news-calculator-tab, Property 11: parseMatchComments извлекает все комментарии
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { parseMatchComments } from './parseMatchComments.js';

/**
 * Builds match comments HTML using the real site structure:
 * <tr id="c{N}"> / <span id="nick{N}"> / <div id="mess{N}">
 */
function buildMatchCommentsHtml(comments) {
  const rows = comments.map((c, i) => {
    const id = 1000 + i;
    return `
      <tr id="c${id}" bgcolor="#EEFEEE">
        <td><table class="nil wst">
          <tbody>
            <tr><td><span id="nick${id}">${c.nick}</span></td></tr>
            <tr><td class="lh16 txtj" colspan="2">
              <div id="mess${id}" style="display:none">${c.text}</div>
              <div id="id${id}">${c.text}</div>
            </td></tr>
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

const nonEmptyAlpha = fc.stringMatching(/^[A-Za-z][A-Za-z0-9 ]{0,19}$/).filter(s => s.trim().length > 0);

const commentArb = fc.record({
  nick: nonEmptyAlpha,
  text: nonEmptyAlpha,
});

describe('Property 11: parseMatchComments извлекает все комментарии', () => {
  it('length equals number of comments in HTML', () => {
    // Validates: Requirements 9.1, 9.2
    fc.assert(
      fc.property(
        fc.array(commentArb, { minLength: 0, maxLength: 10 }),
        (comments) => {
          const html = buildMatchCommentsHtml(comments);
          const result = parseMatchComments(html);
          expect(result).toHaveLength(comments.length);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('each entry has non-empty nick and text', () => {
    // Validates: Requirements 9.1, 9.2
    fc.assert(
      fc.property(
        fc.array(commentArb, { minLength: 1, maxLength: 10 }),
        (comments) => {
          const html = buildMatchCommentsHtml(comments);
          const result = parseMatchComments(html);
          for (const entry of result) {
            expect(entry.nick).toBeTruthy();
            expect(entry.text).toBeTruthy();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('managerNick and text values match the generated input (trimmed)', () => {
    // Validates: Requirements 9.1, 9.2
    fc.assert(
      fc.property(
        fc.array(commentArb, { minLength: 1, maxLength: 10 }),
        (comments) => {
          const html = buildMatchCommentsHtml(comments);
          const result = parseMatchComments(html);
          for (let i = 0; i < comments.length; i++) {
            expect(result[i].nick).toBe(comments[i].nick.trim());
            expect(result[i].text).toBe(comments[i].text.trim());
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
