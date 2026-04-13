import { describe, it, expect } from 'vitest';
import { formatGroupTableBBCode } from './formatGroupTableBBCode.js';

describe('formatGroupTableBBCode', () => {
  const sampleData = {
    headers: ['№', 'Команда', 'И', 'В', 'Н', 'П', 'М', 'Р', 'О', 'Vs', 'Р'],
    rows: [
      { position: '1', teamName: 'Нидерланды', teamLink: 'nation.php?num=10', stats: ['5', '3', '1', '1', '8:4', '+4', '10', '2:1', '3'], isCurrentFed: false },
      { position: '2', teamName: 'Канада', teamLink: 'nation.php?num=20', stats: ['5', '2', '2', '1', '6:5', '+1', '8', '1:1', '2'], isCurrentFed: true },
      { position: '3', teamName: 'Мексика', teamLink: 'nation.php?num=30', stats: ['5', '1', '1', '3', '3:7', '-4', '4', '0:2', '1'], isCurrentFed: false },
    ],
    highlightIndex: 1,
  };

  it('wraps output in [table width=70% align=center]', () => {
    const result = formatGroupTableBBCode(sampleData);
    expect(result.startsWith('[table width=70% align=center]\n')).toBe(true);
    expect(result.endsWith('\n[/table]')).toBe(true);
  });

  it('includes all header cells', () => {
    const result = formatGroupTableBBCode(sampleData);
    for (const h of sampleData.headers) {
      expect(result).toContain('[td]' + h + '[/td]');
    }
  });

  it('includes all team names and stats', () => {
    const result = formatGroupTableBBCode(sampleData);
    for (const row of sampleData.rows) {
      expect(result).toContain(row.teamName);
      expect(result).toContain(row.position);
      for (const s of row.stats) {
        expect(result).toContain(s);
      }
    }
  });

  it('highlights only the row at highlightIndex with bgcolor=#FFFFBF on each td', () => {
    const result = formatGroupTableBBCode(sampleData);
    const lines = result.split('\n');
    const dataLines = lines.slice(2, 5);

    // Row at highlightIndex=1 should have bgcolor on td, not tr
    expect(dataLines[1]).toContain('[td bgcolor=#FFFFBF]');
    expect(dataLines[1]).not.toContain('[tr bgcolor=');
    // Other rows should not have bgcolor
    expect(dataLines[0]).not.toContain('bgcolor');
    expect(dataLines[2]).not.toContain('bgcolor');
  });

  it('does not add bgcolor when highlightIndex is -1', () => {
    const data = { ...sampleData, highlightIndex: -1 };
    const result = formatGroupTableBBCode(data);
    expect(result).not.toContain('bgcolor');
  });

  it('handles single row table', () => {
    const data = {
      headers: ['№', 'Команда', 'И'],
      rows: [{ position: '1', teamName: 'Test', teamLink: 'nation.php?num=1', stats: ['3'], isCurrentFed: true }],
      highlightIndex: 0,
    };
    const result = formatGroupTableBBCode(data);
    expect(result).toContain('[td bgcolor=#FFFFBF]Test[/td]');
    expect(result).toContain('[td bgcolor=#FFFFBF]1[/td]');
    expect(result).toContain('[td bgcolor=#FFFFBF]3[/td]');
  });
});
