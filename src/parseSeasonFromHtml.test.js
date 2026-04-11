import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { parseSeasonFromHtml } from './parseSeasonFromHtml.js';

/**
 * **Feature: interseason-cup-results, Property 1: Парсинг сезона из HTML**
 *
 * Для любого валидного HTML-ответа roster_m.php, содержащего ссылку с параметром
 * season=N, функция парсинга сезона должна вернуть строку N, где N — положительное
 * целое число.
 *
 * **Validates: Requirements 2.2**
 */

// Arbitrary: positive integer for season number
const positiveIntArb = fc.integer({ min: 1, max: 999999 });

// Arbitrary: HTML string containing season=N, mimicking roster_m.php output
const htmlWithSeasonArb = positiveIntArb.map((n) => {
  return `<html><body><a href="/roster_m.php?season=${n}&div=1">link</a></body></html>`;
});

describe('Feature: interseason-cup-results, Property 1: Парсинг сезона из HTML', () => {
  it('returns string N for HTML containing season=N where N is a positive integer', () => {
    fc.assert(
      fc.property(positiveIntArb, (n) => {
        const html = `<html><body><a href="/roster_m.php?season=${n}&div=1">link</a></body></html>`;
        const result = parseSeasonFromHtml(html);
        expect(result).toBe(String(n));
      }),
      { numRuns: 100 }
    );
  });
});
