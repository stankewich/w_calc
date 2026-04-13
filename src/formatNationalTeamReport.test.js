import { describe, it, expect } from 'vitest';
import { formatBBCodeReport } from './formatNationalTeamReport.js';

describe('formatBBCodeReport', () => {
  const baseSection = {
    typeName: 'Национальная',
    matchLinkBBCode: '[url=viewmatch.php?num=1]Матч 1[/url]',
    groupTableBBCode: '[table]group[/table]',
    eventSummaryBBCode: null,
  };

  it('inserts eventSummaryBBCode between matchLink and groupTable', () => {
    const section = {
      ...baseSection,
      eventSummaryBBCode: '⚽ 67\' Мигель Герреро (1:0)',
    };
    const result = formatBBCodeReport([section]);
    const lines = result.split('\n');
    const matchIdx = lines.findIndex(l => l.includes('viewmatch.php'));
    const summaryIdx = lines.findIndex(l => l.includes('⚽'));
    const tableIdx = lines.findIndex(l => l === '[table]group[/table]');
    expect(matchIdx).toBeLessThan(summaryIdx);
    expect(summaryIdx).toBeLessThan(tableIdx);
  });

  it('adds empty line between eventSummaryBBCode and groupTableBBCode', () => {
    const section = {
      ...baseSection,
      eventSummaryBBCode: '⚽ 10\' Player (1:0)',
    };
    const result = formatBBCodeReport([section]);
    const lines = result.split('\n');
    const summaryIdx = lines.findIndex(l => l.includes('⚽'));
    // Next line after summary should be empty, then groupTable
    expect(lines[summaryIdx + 1]).toBe('');
    expect(lines[summaryIdx + 2]).toBe('[table]group[/table]');
  });

  it('omits eventSummaryBBCode when null — backward compatible', () => {
    const section = { ...baseSection, eventSummaryBBCode: null };
    const result = formatBBCodeReport([section]);
    expect(result).not.toContain('⚽');
    // matchLink should be directly followed by groupTable (no empty line between them)
    const lines = result.split('\n');
    const matchIdx = lines.findIndex(l => l.includes('viewmatch.php'));
    expect(lines[matchIdx + 1]).toBe('[table]group[/table]');
  });

  it('omits eventSummaryBBCode when empty string — backward compatible', () => {
    const section = { ...baseSection, eventSummaryBBCode: '' };
    const result = formatBBCodeReport([section]);
    const lines = result.split('\n');
    const matchIdx = lines.findIndex(l => l.includes('viewmatch.php'));
    expect(lines[matchIdx + 1]).toBe('[table]group[/table]');
  });

  it('works without eventSummaryBBCode field at all — backward compatible', () => {
    const section = {
      typeName: 'Молодёжная',
      matchLinkBBCode: '[url=viewmatch.php?num=2]Матч 2[/url]',
      groupTableBBCode: '[table]youth[/table]',
    };
    const result = formatBBCodeReport([section]);
    const lines = result.split('\n');
    const matchIdx = lines.findIndex(l => l.includes('viewmatch.php'));
    expect(lines[matchIdx + 1]).toBe('[table]youth[/table]');
  });

  it('does not add empty line before groupTable when no eventSummary', () => {
    const section = { ...baseSection, eventSummaryBBCode: null };
    const result = formatBBCodeReport([section]);
    const lines = result.split('\n');
    const tableIdx = lines.findIndex(l => l === '[table]group[/table]');
    // The line before groupTable should NOT be empty (it should be matchLink)
    expect(lines[tableIdx - 1]).toContain('viewmatch.php');
  });

  it('inserts strengthBBCode between matchLink and eventSummary', () => {
    const section = {
      ...baseSection,
      strengthBBCode: '[table width=100%][tr][td]Сила в начале матча[/td][/tr][/table]',
      eventSummaryBBCode: '⚽ 67\' Герреро (1:0)',
    };
    const result = formatBBCodeReport([section]);
    const lines = result.split('\n');
    const matchIdx = lines.findIndex(l => l.includes('viewmatch.php'));
    const strengthIdx = lines.findIndex(l => l.includes('Сила в начале'));
    const summaryIdx = lines.findIndex(l => l.includes('⚽'));
    expect(matchIdx).toBeLessThan(strengthIdx);
    expect(strengthIdx).toBeLessThan(summaryIdx);
  });

  it('adds empty line before groupTable when only strengthBBCode present', () => {
    const section = {
      ...baseSection,
      strengthBBCode: '[table width=100%][tr][td]Сила[/td][/tr][/table]',
      eventSummaryBBCode: null,
    };
    const result = formatBBCodeReport([section]);
    const lines = result.split('\n');
    const tableIdx = lines.findIndex(l => l === '[table]group[/table]');
    expect(lines[tableIdx - 1]).toBe('');
  });
});
