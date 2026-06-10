// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { parseMovement } from './parseMovement.js';

const TITLE = 'Изменение занимаемого места в таблице по сравнению с предыдущим туром';

/**
 * Builds a <tr> DOM element with an optional movement <td>.
 * @param {string|null} imgSrc - src attribute for the <img>, or null for no image
 */
function buildRow(imgSrc) {
  const tr = document.createElement('tr');
  tr.id = 'vsol-test-row';

  const tdOther = document.createElement('td');
  tdOther.id = 'vsol-test-td-other';
  tdOther.textContent = '1';
  tr.appendChild(tdOther);

  const tdMovement = document.createElement('td');
  tdMovement.id = 'vsol-test-td-movement';
  tdMovement.setAttribute('title', TITLE);

  if (imgSrc !== null) {
    const img = document.createElement('img');
    img.setAttribute('src', imgSrc);
    tdMovement.appendChild(img);
  }

  tr.appendChild(tdMovement);
  return tr;
}

/**
 * Builds a <tr> with no movement <td> at all.
 */
function buildRowNoMovementTd() {
  const tr = document.createElement('tr');
  tr.id = 'vsol-test-row-no-td';
  const td = document.createElement('td');
  td.id = 'vsol-test-td-plain';
  td.textContent = 'some data';
  tr.appendChild(td);
  return tr;
}

describe('parseMovement', () => {
  it('returns "up" for a row with go_up.gif', () => {
    const row = buildRow('/images/go_up.gif');
    expect(parseMovement(row)).toBe('up');
  });

  it('returns "down" for a row with go_down.gif', () => {
    const row = buildRow('/images/go_down.gif');
    expect(parseMovement(row)).toBe('down');
  });

  it('returns "neutral" for a row without an image in the movement td', () => {
    const row = buildRow(null);
    expect(parseMovement(row)).toBe('neutral');
  });

  it('returns "neutral" for a row with an empty movement td', () => {
    const row = buildRow(null);
    expect(parseMovement(row)).toBe('neutral');
  });

  it('returns "neutral" for a row with no movement td at all', () => {
    const row = buildRowNoMovementTd();
    expect(parseMovement(row)).toBe('neutral');
  });

  it('returns "up" when src contains go_up.gif as part of a longer path', () => {
    const row = buildRow('https://example.com/static/icons/go_up.gif?v=2');
    expect(parseMovement(row)).toBe('up');
  });

  it('returns "down" when src contains go_down.gif as part of a longer path', () => {
    const row = buildRow('https://example.com/static/icons/go_down.gif?v=2');
    expect(parseMovement(row)).toBe('down');
  });

  it('returns "neutral" for an unrelated image src', () => {
    const row = buildRow('/images/some_other.gif');
    expect(parseMovement(row)).toBe('neutral');
  });

  // Feature: fed-news-calculator-tab, Property 7: parseMovement корректно определяет направление перемещения
  // Validates: Requirements 5.4, 5.5
  it('Property 7: parseMovement correctly determines movement direction for any generated row', () => {
    const imgVariants = [
      { src: '/images/go_up.gif', expected: 'up' },
      { src: '/images/go_down.gif', expected: 'down' },
      { src: null, expected: 'neutral' },
    ];

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 2 }),
        (variantIndex) => {
          const { src, expected } = imgVariants[variantIndex];
          const row = buildRow(src);
          return parseMovement(row) === expected;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: fed-news-calculator-tab, Property 7 (extended): arbitrary src paths
  // Validates: Requirements 5.4, 5.5
  it('Property 7 (extended): parseMovement handles arbitrary src paths correctly', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('go_up.gif', 'go_down.gif', ''),
        fc.string({ minLength: 0, maxLength: 30 }).filter(s => !s.includes('go_up.gif') && !s.includes('go_down.gif')),
        (gifName, prefix) => {
          let src;
          let expected;

          if (gifName === 'go_up.gif') {
            src = prefix + 'go_up.gif';
            expected = 'up';
          } else if (gifName === 'go_down.gif') {
            src = prefix + 'go_down.gif';
            expected = 'down';
          } else {
            // No gif — no image at all
            src = null;
            expected = 'neutral';
          }

          const row = buildRow(src);
          return parseMovement(row) === expected;
        }
      ),
      { numRuns: 100 }
    );
  });
});
