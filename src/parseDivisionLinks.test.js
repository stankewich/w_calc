// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { parseDivisionLinks } from './parseDivisionLinks.js';

/**
 * Builds a teams_cntr.php-style HTML with division links.
 */
function buildTeamsCntrHtml(divisions) {
  let links = divisions.map(d =>
    `<a href="https://www.virtualsoccer.ru/v2champ.php?num=${d.id}" class="mnuG">${d.name}</a>`
  ).join(' | ');
  return `<html><body><div class="lh16 txt" style="margin-top:10px">${links}</div></body></html>`;
}

describe('parseDivisionLinks', () => {
  it('extracts multiple division links in order', () => {
    const html = buildTeamsCntrHtml([
      { id: '126370', name: 'D1' },
      { id: '126371', name: 'D2' },
      { id: '126372', name: 'D3-A' },
      { id: '126373', name: 'D3-B' },
    ]);
    const result = parseDivisionLinks(html);
    expect(result).toEqual([
      { name: 'D1', url: 'https://www.virtualsoccer.ru/v2champ.php?num=126370', divisionId: '126370' },
      { name: 'D2', url: 'https://www.virtualsoccer.ru/v2champ.php?num=126371', divisionId: '126371' },
      { name: 'D3-A', url: 'https://www.virtualsoccer.ru/v2champ.php?num=126372', divisionId: '126372' },
      { name: 'D3-B', url: 'https://www.virtualsoccer.ru/v2champ.php?num=126373', divisionId: '126373' },
    ]);
  });

  it('extracts a single division link', () => {
    const html = buildTeamsCntrHtml([{ id: '100', name: 'D1' }]);
    const result = parseDivisionLinks(html);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      name: 'D1',
      url: 'https://www.virtualsoccer.ru/v2champ.php?num=100',
      divisionId: '100',
    });
  });

  it('returns empty array when no v2champ.php links exist', () => {
    const html = '<html><body><a href="https://example.com/other.php?num=1">Other</a></body></html>';
    const result = parseDivisionLinks(html);
    expect(result).toEqual([]);
  });

  it('returns empty array for empty HTML', () => {
    const result = parseDivisionLinks('<html><body></body></html>');
    expect(result).toEqual([]);
  });

  it('ignores links with empty text content', () => {
    const html = '<html><body><a href="https://www.virtualsoccer.ru/v2champ.php?num=1"></a><a href="https://www.virtualsoccer.ru/v2champ.php?num=2">D2</a></body></html>';
    const result = parseDivisionLinks(html);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('D2');
  });

  it('ignores non-v2champ links mixed with v2champ links', () => {
    const html = `<html><body>
      <a href="https://www.virtualsoccer.ru/v2champ.php?num=100">D1</a>
      <a href="https://www.virtualsoccer.ru/v2cupnew.php?nat_id=175">КЛК</a>
      <a href="https://www.virtualsoccer.ru/v2ks.php?num=200">кубок страны</a>
      <a href="https://www.virtualsoccer.ru/v2champ.php?num=101">D2</a>
    </body></html>`;
    const result = parseDivisionLinks(html);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('D1');
    expect(result[1].name).toBe('D2');
  });

  it('preserves order of links as in HTML', () => {
    const html = buildTeamsCntrHtml([
      { id: '3', name: 'D3-B' },
      { id: '1', name: 'D1' },
      { id: '2', name: 'D2' },
    ]);
    const result = parseDivisionLinks(html);
    expect(result.map(r => r.name)).toEqual(['D3-B', 'D1', 'D2']);
  });
});
