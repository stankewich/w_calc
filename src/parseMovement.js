/**
 * Extracts the movement direction of a team from a division table row.
 *
 * @param {HTMLTableRowElement} row - A <tr> DOM element from the division table
 * @returns {'up' | 'down' | 'neutral'} Direction of movement
 */
export function parseMovement(row) {
  const imgs = row.querySelectorAll('img');
  for (const img of imgs) {
    const src = img.getAttribute('src') || '';
    if (src.includes('go_up.gif')) return 'up';
    if (src.includes('go_down.gif')) return 'down';
  }
  return 'neutral';
}
