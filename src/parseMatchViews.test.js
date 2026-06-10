// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { parseMatchViews } from './parseMatchViews.js';

// ---------------------------------------------------------------------------
// HTML builder — actual site structure
// <p class="lh16 und"><b>Матч посетили N менеджеров:</b> <a href="v3_profile.php?...">Nick</a>...</p>
// ---------------------------------------------------------------------------

function buildViewsHtml(count, viewers) {
  const viewerLinks = viewers
    .map((nick, i) => `<a href="https://www.virtualsoccer.ru/v3_profile.php?num=${1000 + i}">${nick}</a>`)
    .join(', ');
  return `<html><body>
    <p class="lh16 und" style="margin:10px 4px 2px 4px"><b>Матч посетили ${count} менеджеров:</b> ${viewerLinks}</p>
  </body></html>`;
}

// ---------------------------------------------------------------------------
// Unit tests
// ---------------------------------------------------------------------------

describe('parseMatchViews', () => {
  it('extracts correct count and viewers', () => {
    const html = buildViewsHtml(5, ['Arne', 'Lushy', 'vitalys', 'yMHuk', 'ТисРАДим']);
    const result = parseMatchViews(html);
    expect(result).not.toBeNull();
    expect(result.count).toBe(5);
    expect(result.viewers).toEqual(['Arne', 'Lushy', 'vitalys', 'yMHuk', 'ТисРАДим']);
  });

  it('single visitor', () => {
    const html = buildViewsHtml(1, ['SoloManager']);
    const result = parseMatchViews(html);
    expect(result).not.toBeNull();
    expect(result.count).toBe(1);
    expect(result.viewers).toEqual(['SoloManager']);
  });

  it('count with no viewer links returns empty viewers array', () => {
    const html = `<html><body>
      <p class="lh16 und"><b>Матч посетили 3 менеджера:</b></p>
    </body></html>`;
    const result = parseMatchViews(html);
    expect(result).not.toBeNull();
    expect(result.count).toBe(3);
    expect(result.viewers).toEqual([]);
  });

  it('count is a number (not a string)', () => {
    const html = buildViewsHtml(42, ['SomeViewer']);
    const result = parseMatchViews(html);
    expect(typeof result.count).toBe('number');
    expect(result.count).toBe(42);
  });

  it('viewers is an array of strings', () => {
    const html = buildViewsHtml(3, ['Alpha', 'Beta', 'Gamma']);
    const result = parseMatchViews(html);
    expect(Array.isArray(result.viewers)).toBe(true);
    result.viewers.forEach(v => expect(typeof v).toBe('string'));
  });

  it('returns null when there is no views block', () => {
    const html = '<html><body><p>Some other content</p></body></html>';
    const result = parseMatchViews(html);
    expect(result).toBeNull();
  });

  it('returns null for empty HTML', () => {
    expect(parseMatchViews('<html><body></body></html>')).toBeNull();
  });

  it('returns null for falsy input', () => {
    expect(parseMatchViews('')).toBeNull();
    expect(parseMatchViews(null)).toBeNull();
  });

  it('does not match unrelated bold text with numbers', () => {
    const html = '<html><body><p><b>Тур 5 из 30</b></p></body></html>';
    expect(parseMatchViews(html)).toBeNull();
  });

  // ---------------------------------------------------------------------------
  // Property 12
  // Feature: fed-news-calculator-tab, Property 12: parseMatchViews извлекает число просмотров и список зрителей
  // Validates: Requirements 10.1, 10.2
  // ---------------------------------------------------------------------------
  it('Property 12: parseMatchViews extracts correct count and all viewer nicks', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 999 }),
        fc.array(
          fc.stringMatching(/^[A-Za-z][A-Za-z0-9_]{0,14}$/),
          { minLength: 0, maxLength: 10 }
        ),
        (count, viewers) => {
          const html = buildViewsHtml(count, viewers);
          const result = parseMatchViews(html);
          if (result === null) return false;
          if (result.count !== count) return false;
          if (result.viewers.length !== viewers.length) return false;
          for (let i = 0; i < viewers.length; i++) {
            if (result.viewers[i] !== viewers[i]) return false;
          }
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
