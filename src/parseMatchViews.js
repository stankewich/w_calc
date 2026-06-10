/**
 * Parses match views data from viewmatch.php HTML.
 *
 * Looks for a <p> or <td> containing the text «посетили», «просмотр» or «зрител» (case-insensitive).
 * Extracts the view count (number) and the list of viewer nicks (from links).
 *
 * Actual site structure:
 *   <p class="lh16 und"><b>Матч посетили N менеджеров:</b>
 *     <a href="v3_profile.php?num=...">Nick1</a>, ...</p>
 *
 * Also handles legacy patterns with managerzone.php links or td elements.
 *
 * @param {string} html - HTML string from viewmatch.php
 * @returns {MatchViews|null} Object with count and viewers, or null if not found
 *
 * @typedef {Object} MatchViews
 * @property {number}   count   - Total number of views
 * @property {string[]} viewers - Nicks of manager-viewers
 */
export function parseMatchViews(html) {
  if (!html) return null;

  const doc = new DOMParser().parseFromString(html, 'text/html');

  // Find <b> containing "Матч посетили N менеджеров:"
  // Structure: <p class="lh16 und"><b>Матч посетили N менеджеров:</b> <a href="v3_profile.php?...">Nick</a>...</p>
  for (const b of doc.querySelectorAll('b')) {
    const bText = b.textContent;
    if (!bText.includes('посетили')) continue;

    const numMatch = bText.match(/(\d+)/);
    if (!numMatch) continue;

    const count = parseInt(numMatch[1], 10);
    const parent = b.parentNode;

    // Viewer links are siblings of <b> inside the parent element
    let viewers = extractNicks(parent, 'v3_profile.php');
    if (viewers.length === 0) viewers = extractNicks(parent, 'managerzone.php');

    return { count, viewers };
  }

  return null;
}

/**
 * Extracts nicks from links matching a given href pattern within an element.
 *
 * @param {Element} el
 * @param {string} hrefPattern
 * @returns {string[]}
 */
function extractNicks(el, hrefPattern) {
  const links = el.querySelectorAll('a[href*="' + hrefPattern + '"]');
  const nicks = [];
  for (const link of links) {
    const nick = link.textContent.trim();
    if (nick) nicks.push(nick);
  }
  return nicks;
}

/**
 * Returns the next <td> sibling within the same <tr>, or null.
 *
 * @param {Element} td
 * @returns {Element|null}
 */
function getNextSiblingTd(td) {
  let sibling = td.nextElementSibling;
  while (sibling) {
    if (sibling.tagName === 'TD') return sibling;
    sibling = sibling.nextElementSibling;
  }
  return null;
}
