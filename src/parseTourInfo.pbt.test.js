// @vitest-environment jsdom
// Feature: fed-news-calculator-tab, Property 6: parseTourInfo корректно определяет текущий тур
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { parseTourInfo } from './parseTourInfo.js';

/**
 * Builds a v2champ.php-style HTML with a tour schedule table.
 * Exactly one tour is marked with <font color="red">.
 *
 * @param {number[]} tourNums - Array of tour numbers
 * @param {number} redTourNum - The tour number that should be marked red
 */
function buildTourHtml(tourNums, redTourNum) {
  const cells = tourNums.map(tourNum => {
    const href = `https://www.virtualsoccer.ru/v2champ.php?num=125749&tblshow=1&tour=${tourNum}`;
    const inner = tourNum === redTourNum
      ? `<font color="red">${tourNum}</font>`
      : `<font color="#999999">${tourNum}</font>`;
    return `<td class="lh14 txt2r" width="14"><a href="${href}" class="mnu">${inner}</a></td>`;
  }).join('\n');

  return `<html><body>
    <table class="nil">
      <tbody><tr>
        ${cells}
      </tr></tbody>
    </table>
  </body></html>`;
}

describe('Property 6: parseTourInfo корректно определяет текущий тур', () => {
  it('currentTour matches the red-marked tour for any number of tours', () => {
    // Validates: Requirements 4.4
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 20 }).chain(count => {
          // Generate `count` unique tour numbers starting from 1..count
          // and pick one index to be the red tour
          return fc.integer({ min: 0, max: count - 1 }).map(redIndex => {
            const tourNums = Array.from({ length: count }, (_, i) => i + 1);
            const redTourNum = tourNums[redIndex];
            return { tourNums, redTourNum };
          });
        }),
        ({ tourNums, redTourNum }) => {
          const html = buildTourHtml(tourNums, redTourNum);
          const result = parseTourInfo(html);
          expect(result.currentTour).toBe(redTourNum);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('tours array contains all generated tours', () => {
    // Validates: Requirements 4.3
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 20 }).chain(count => {
          return fc.integer({ min: 0, max: count - 1 }).map(redIndex => {
            const tourNums = Array.from({ length: count }, (_, i) => i + 1);
            const redTourNum = tourNums[redIndex];
            return { tourNums, redTourNum };
          });
        }),
        ({ tourNums, redTourNum }) => {
          const html = buildTourHtml(tourNums, redTourNum);
          const result = parseTourInfo(html);
          expect(result.tours).toHaveLength(tourNums.length);
          expect(result.tours.map(t => t.tourNum)).toEqual(tourNums);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('exactly one tour has isCurrent = true', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 20 }).chain(count => {
          return fc.integer({ min: 0, max: count - 1 }).map(redIndex => {
            const tourNums = Array.from({ length: count }, (_, i) => i + 1);
            const redTourNum = tourNums[redIndex];
            return { tourNums, redTourNum };
          });
        }),
        ({ tourNums, redTourNum }) => {
          const html = buildTourHtml(tourNums, redTourNum);
          const result = parseTourInfo(html);
          const currentTours = result.tours.filter(t => t.isCurrent);
          expect(currentTours).toHaveLength(1);
          expect(currentTours[0].tourNum).toBe(redTourNum);
        }
      ),
      { numRuns: 100 }
    );
  });
});
