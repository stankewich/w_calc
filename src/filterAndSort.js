/**
 * Extracted from initInterseasonCupResults() in calc.user.js for testability.
 * Filters entries with nn in [1, 100] and sorts by nn ASC.
 *
 * @param {Array<{nn: number, teamName: string, teamLink: string, cols: string[]}>} entries
 * @returns {Array<{nn: number, teamName: string, teamLink: string, cols: string[]}>}
 */
export function filterAndSort(entries) {
  return entries
    .filter(function (e) { return e.nn >= 1 && e.nn <= 100; })
    .sort(function (a, b) { return a.nn - b.nn; });
}
