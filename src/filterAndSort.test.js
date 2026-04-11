import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { filterAndSort } from './filterAndSort.js';

/**
 * **Feature: interseason-cup-results, Property 3: Фильтрация и сортировка**
 *
 * Для любого массива записей CupEntry, после применения фильтрации и сортировки:
 * (а) все записи в результате имеют значение NN в диапазоне [1, 100],
 * (б) записи отсортированы по NN в порядке возрастания,
 * (в) количество записей в результате ≤ 100 и ≤ количества записей во входном массиве.
 *
 * **Validates: Requirements 4.1, 4.2, 4.3**
 */

// Arbitrary for a CupEntry with arbitrary nn (including out-of-range values)
const cupEntryArb = fc.record({
  nn: fc.integer({ min: -50, max: 500 }),
  teamName: fc.stringMatching(/^[A-Za-z0-9 ]{1,20}$/),
  teamLink: fc.constantFrom('/roster.php?num=1', '/roster.php?num=999'),
  cols: fc.array(fc.stringMatching(/^[0-9]{1,5}$/), { minLength: 0, maxLength: 4 }),
});

const cupEntriesArb = fc.array(cupEntryArb, { minLength: 0, maxLength: 200 });

describe('Feature: interseason-cup-results, Property 3: Фильтрация и сортировка', () => {
  it('(а) all nn in result are in [1, 100]', () => {
    fc.assert(
      fc.property(cupEntriesArb, (entries) => {
        const result = filterAndSort(entries);
        for (const entry of result) {
          expect(entry.nn).toBeGreaterThanOrEqual(1);
          expect(entry.nn).toBeLessThanOrEqual(100);
        }
      }),
      { numRuns: 100 }
    );
  });

  it('(б) result is sorted by nn ASC', () => {
    fc.assert(
      fc.property(cupEntriesArb, (entries) => {
        const result = filterAndSort(entries);
        for (let i = 1; i < result.length; i++) {
          expect(result[i].nn).toBeGreaterThanOrEqual(result[i - 1].nn);
        }
      }),
      { numRuns: 100 }
    );
  });

  it('(в) result count ≤ 100 and ≤ input count', () => {
    fc.assert(
      fc.property(cupEntriesArb, (entries) => {
        const result = filterAndSort(entries);
        expect(result.length).toBeLessThanOrEqual(100);
        expect(result.length).toBeLessThanOrEqual(entries.length);
      }),
      { numRuns: 100 }
    );
  });
});
