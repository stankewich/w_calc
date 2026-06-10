/**
 * Parses HTML from v2champ.php page, extracting the list of tours and the current (last played) tour.
 *
 * The tour schedule is in `table.nil` with links `a[href*="tblshow=1&tour="]`.
 * The current (last played) tour is marked with `<font color="red">` inside the link.
 * If no tour is marked red, defaults to tour 1.
 *
 * @param {string} html - HTML string from v2champ.php
 * @returns {{ tours: TourLink[], currentTour: number }}
 *
 * @typedef {Object} TourLink
 * @property {number} tourNum - Tour number
 * @property {string} url - Full URL to v2champ.php?...&tblshow=1&tour={tourNum}
 * @property {boolean} isCurrent - true if this tour is marked with color="red"
 */
export function parseTourInfo(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const anchors = doc.querySelectorAll('a[href*="tblshow=1&tour="]');
  const tours = [];
  const seen = new Set();
  let currentTour = 1;
  let foundRed = false;

  for (const a of anchors) {
    const href = a.getAttribute('href') || '';
    const match = href.match(/[?&]tour=(\d+)/);
    if (!match) continue;

    const tourNum = parseInt(match[1], 10);
    if (seen.has(tourNum)) continue;
    seen.add(tourNum);

    const font = a.querySelector('font[color="red"]');
    const isCurrent = font !== null;

    tours.push({ tourNum, url: href, isCurrent });

    if (isCurrent && !foundRed) {
      currentTour = tourNum;
      foundRed = true;
    }
  }

  tours.sort((a, b) => a.tourNum - b.tourNum);

  if (!foundRed && tours.length > 0) {
    currentTour = tours[tours.length - 1].tourNum;
  }

  return { tours, currentTour };
}
