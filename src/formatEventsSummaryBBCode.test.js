import { describe, it, expect } from 'vitest';
import { formatEventsSummaryBBCode } from './formatEventsSummaryBBCode.js';

describe('formatEventsSummaryBBCode', () => {
  it('returns empty string for empty array', () => {
    expect(formatEventsSummaryBBCode([])).toBe('');
  });

  it('returns empty string for null/undefined', () => {
    expect(formatEventsSummaryBBCode(null)).toBe('');
    expect(formatEventsSummaryBBCode(undefined)).toBe('');
  });

  it('formats a goal with descriptionBBCode and score', () => {
    var events = [{
      type: 'goal', minute: '62',
      playerName: 'Френциско Ре',
      score: '0:1',
      descriptionBBCode: '[a href=https://www.virtualsoccer.ru/player.php?num=6592421 target="_blank"]Френциско Ре[/a] (головой), удар с близкого расстояния (пас - [a href=https://www.virtualsoccer.ru/player.php?num=6374149 target="_blank"]Мартин Ферейра Ригалт[/a])'
    }];
    var result = formatEventsSummaryBBCode(events);
    expect(result).toContain('⚽ 62\'');
    expect(result).toContain('[a href=https://www.virtualsoccer.ru/player.php?num=6592421');
    expect(result).toContain('Френциско Ре[/a]');
    expect(result).toContain('(0:1)');
    expect(result).toContain('[table width=70% align=center border=0]');
    expect(result).toContain('[td align=center]');
  });

  it('falls back to playerName when no descriptionBBCode', () => {
    var events = [{
      type: 'goal', minute: '67',
      playerName: 'Мигель Герреро',
      score: '1:0'
    }];
    var result = formatEventsSummaryBBCode(events);
    expect(result).toContain("⚽ 67' Мигель Герреро (1:0)");
  });

  it('formats multiple goals as separate table rows', () => {
    var events = [
      { type: 'goal', minute: '10', playerName: 'А', score: '1:0' },
      { type: 'goal', minute: '45', playerName: 'Б', score: '2:0' },
    ];
    var result = formatEventsSummaryBBCode(events);
    var lines = result.split('\n');
    expect(lines).toHaveLength(2);
    expect(lines[0]).toContain("⚽ 10' А (1:0)");
    expect(lines[1]).toContain("⚽ 45' Б (2:0)");
  });

  it('handles goal without score', () => {
    var events = [{ type: 'goal', minute: '30', playerName: 'Игрок' }];
    var result = formatEventsSummaryBBCode(events);
    expect(result).toContain("⚽ 30' Игрок");
    expect(result).not.toContain('()');
  });
});
