// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { parseTourInfo } from './parseTourInfo.js';

/**
 * Builds a v2champ.php-style HTML with a tour schedule table.
 * @param {Array<{ tourNum: number, isCurrent: boolean, url?: string }>} tours
 */
function buildTourHtml(tours) {
  const cells = tours.map(({ tourNum, isCurrent, url }) => {
    const href = url || `https://www.virtualsoccer.ru/v2champ.php?num=125749&tblshow=1&tour=${tourNum}`;
    const inner = isCurrent
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

describe('parseTourInfo', () => {
  it('returns currentTour matching the red-marked tour', () => {
    const html = buildTourHtml([
      { tourNum: 1, isCurrent: false },
      { tourNum: 2, isCurrent: false },
      { tourNum: 3, isCurrent: true },
      { tourNum: 4, isCurrent: false },
    ]);
    const result = parseTourInfo(html);
    expect(result.currentTour).toBe(3);
  });

  it('returns currentTour = last tour when no tour is marked red', () => {
    const html = buildTourHtml([
      { tourNum: 1, isCurrent: false },
      { tourNum: 2, isCurrent: false },
      { tourNum: 3, isCurrent: false },
    ]);
    const result = parseTourInfo(html);
    expect(result.currentTour).toBe(3);
  });

  it('returns all tours in the tours array', () => {
    const html = buildTourHtml([
      { tourNum: 1, isCurrent: false },
      { tourNum: 2, isCurrent: true },
      { tourNum: 3, isCurrent: false },
      { tourNum: 4, isCurrent: false },
      { tourNum: 5, isCurrent: false },
    ]);
    const result = parseTourInfo(html);
    expect(result.tours).toHaveLength(5);
    expect(result.tours.map(t => t.tourNum)).toEqual([1, 2, 3, 4, 5]);
  });

  it('returns { tours: [], currentTour: 1 } when no tours found', () => {
    const html = '<html><body><table class="nil"><tbody><tr></tr></tbody></table></body></html>';
    const result = parseTourInfo(html);
    expect(result).toEqual({ tours: [], currentTour: 1 });
  });

  it('returns { tours: [], currentTour: 1 } when no table.nil exists', () => {
    const html = '<html><body><p>No tour table here</p></body></html>';
    const result = parseTourInfo(html);
    expect(result).toEqual({ tours: [], currentTour: 1 });
  });

  it('sets isCurrent = true only for the red tour', () => {
    const html = buildTourHtml([
      { tourNum: 1, isCurrent: false },
      { tourNum: 2, isCurrent: true },
      { tourNum: 3, isCurrent: false },
    ]);
    const result = parseTourInfo(html);
    expect(result.tours[0].isCurrent).toBe(false);
    expect(result.tours[1].isCurrent).toBe(true);
    expect(result.tours[2].isCurrent).toBe(false);
  });

  it('preserves the full URL in each TourLink', () => {
    const html = buildTourHtml([
      { tourNum: 1, isCurrent: true, url: 'https://www.virtualsoccer.ru/v2champ.php?num=999&tblshow=1&tour=1' },
    ]);
    const result = parseTourInfo(html);
    expect(result.tours[0].url).toBe('https://www.virtualsoccer.ru/v2champ.php?num=999&tblshow=1&tour=1');
  });

  it('handles first tour being red', () => {
    const html = buildTourHtml([
      { tourNum: 1, isCurrent: true },
      { tourNum: 2, isCurrent: false },
    ]);
    const result = parseTourInfo(html);
    expect(result.currentTour).toBe(1);
  });

  it('handles last tour being red', () => {
    const html = buildTourHtml([
      { tourNum: 1, isCurrent: false },
      { tourNum: 2, isCurrent: false },
      { tourNum: 3, isCurrent: false },
      { tourNum: 4, isCurrent: true },
    ]);
    const result = parseTourInfo(html);
    expect(result.currentTour).toBe(4);
  });

  it('finds tour links in nested table.nil (real site structure)', () => {
    // Real site has: outer table.nil > td > inner table.nil > tour links
    const html = `<html><body>
      <table class="nil"><tbody><tr>
        <td><b>Расписание:</b></td>
        <td>
          <table class="nil"><tbody><tr>
            <td><a href="https://www.virtualsoccer.ru/v2champ.php?num=125749&tblshow=1&tour=1" class="mnu"><font color="red">1</font></a></td>
            <td><a href="https://www.virtualsoccer.ru/v2champ.php?num=125749&tblshow=1&tour=2" class="mnu"><font color="#999999">2</font></a></td>
            <td><a href="https://www.virtualsoccer.ru/v2champ.php?num=125749&tblshow=1&tour=3" class="mnu"><font color="#999999">3</font></a></td>
          </tr></tbody></table>
        </td>
      </tr></tbody></table>
    </body></html>`;
    const result = parseTourInfo(html);
    expect(result.tours).toHaveLength(3);
    expect(result.currentTour).toBe(1);
  });
});
