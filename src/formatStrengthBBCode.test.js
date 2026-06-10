import { describe, it, expect } from 'vitest';
import { formatStrengthBBCode } from './formatStrengthBBCode.js';

describe('formatStrengthBBCode', () => {
  // Home (3375) weaker than away (4621)
  var startRow = {
    label: 'Сила в начале матча',
    homeValue: 3375, homePercent: 42,
    awayValue: 4621, awayPercent: 58,
    diff: 1246
  };
  var endRow = {
    label: 'Сила в конце матча',
    homeValue: 2649, homePercent: 43,
    awayValue: 3516, awayPercent: 57,
    diff: 867
  };

  it('returns empty string for null strength', () => {
    expect(formatStrengthBBCode(null)).toBe('');
  });

  it('formats start and end strength rows', () => {
    var result = formatStrengthBBCode({ start: startRow, end: endRow });
    var lines = result.split('\n');
    expect(lines).toHaveLength(2);
    expect(lines[0]).toContain('3375');
    expect(lines[0]).toContain('4621');
    expect(lines[0]).toContain('+1246');
    expect(lines[1]).toContain('2649');
    expect(lines[1]).toContain('3516');
  });

  it('home always left, away always right', () => {
    var result = formatStrengthBBCode({ start: startRow, end: null });
    // Home (3375) left, away (4621) right — regardless of who is stronger
    expect(result).toMatch(/3375.*4621/);
  });

  it('weaker home gets red bg, stronger away gets green bg', () => {
    var result = formatStrengthBBCode({ start: startRow, end: null });
    // Home weaker → red, away stronger → green
    expect(result).toMatch(/ff967e.*3375.*87e878.*4621/);
  });

  it('home always red bg, away always green bg regardless of strength', () => {
    var homeStronger = {
      label: 'Сила в начале матча',
      homeValue: 5000, homePercent: 60,
      awayValue: 3000, awayPercent: 40,
      diff: -2000
    };
    var result = formatStrengthBBCode({ start: homeStronger, end: null });
    // Home always red (ff967e), away always green (87e878)
    expect(result).toMatch(/ff967e.*5000.*87e878.*3000/);
    expect(result).toContain('+2000');
  });

  it('+diff shown on stronger side only', () => {
    var result = formatStrengthBBCode({ start: startRow, end: null });
    var matches = result.match(/\+1246/g);
    expect(matches).toHaveLength(1);
    expect(result).toContain('[small]+1246[/small]');
  });

  it('no diff when equal', () => {
    var equalRow = {
      label: 'Сила в начале матча',
      homeValue: 3000, homePercent: 50,
      awayValue: 3000, awayPercent: 50,
      diff: 0
    };
    var result = formatStrengthBBCode({ start: equalRow, end: null });
    expect(result).not.toContain('[small]');
  });

  it('handles only start row', () => {
    var result = formatStrengthBBCode({ start: startRow, end: null });
    expect(result).toContain('Сила в начале матча');
    expect(result).not.toContain('Сила в конце матча');
  });

  it('handles only end row', () => {
    var result = formatStrengthBBCode({ start: null, end: endRow });
    expect(result).toContain('Сила в конце матча');
    expect(result).not.toContain('Сила в начале матча');
  });
});
