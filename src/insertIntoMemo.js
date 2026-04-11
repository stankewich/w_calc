/**
 * Extracted from insertIntoMemo() in calc.user.js for testability.
 * Pure concatenation logic for memo text.
 *
 * @param {string} existingText - current memo value
 * @param {string} newBBCode - new BB-code text to insert
 * @returns {string} concatenated result
 */
export function concatMemoText(existingText, newBBCode) {
  return existingText ? existingText + '\n\n' + newBBCode : newBBCode;
}
