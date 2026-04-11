import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { concatMemoText } from './insertIntoMemo.js';

/**
 * **Feature: interseason-cup-results, Property 5: Конкатенация текста в memo**
 *
 * Для любых двух строк (существующий текст memo и новый BB-code),
 * если существующий текст непуст, результат вставки должен содержать оба текста,
 * разделённых двумя переносами строки.
 * Если существующий текст пуст, результат должен быть равен новому BB-code.
 *
 * **Validates: Requirements 6.2, 6.3**
 */

const nonEmptyStringArb = fc.stringMatching(/^[A-Za-z0-9 \[\]\/=_\-]{1,100}$/);
const bbCodeArb = fc.stringMatching(/^[A-Za-z0-9 \[\]\/=_\-]{1,100}$/);

describe('Feature: interseason-cup-results, Property 5: Конкатенация текста в memo', () => {
  it('non-empty existing text → both texts separated by \\n\\n', () => {
    fc.assert(
      fc.property(nonEmptyStringArb, bbCodeArb, (existingText, newBBCode) => {
        const result = concatMemoText(existingText, newBBCode);
        expect(result).toBe(existingText + '\n\n' + newBBCode);
        expect(result).toContain(existingText);
        expect(result).toContain(newBBCode);
      }),
      { numRuns: 100 }
    );
  });

  it('empty existing text → result equals newBBCode', () => {
    fc.assert(
      fc.property(bbCodeArb, (newBBCode) => {
        const result = concatMemoText('', newBBCode);
        expect(result).toBe(newBBCode);
      }),
      { numRuns: 100 }
    );
  });
});
