import { describe, it, expect } from 'vitest';
import { formatDivisionTableBBCode } from './formatDivisionTableBBCode.js';

describe('formatDivisionTableBBCode', () => {
  const singleRowData = {
    rows: [
      {
        position: '1',
        teamName: 'Виндзор Старз',
        teamLink: 'https://www.virtualsoccer.ru/roster.php?num=3172',
        games: '1',
        wins: '1',
        draws: '0',
        losses: '0',
        goalsFor: '6',
        goalsAgainst: '0',
        goalDiff: '+6',
        points: '3',
        vs: '2511',
        rm: '613',
      },
    ],
  };

  const multiRowData = {
    rows: [
      {
        position: '1',
        teamName: 'Виндзор Старз',
        teamLink: 'https://www.virtualsoccer.ru/roster.php?num=3172',
        games: '10',
        wins: '8',
        draws: '1',
        losses: '1',
        goalsFor: '24',
        goalsAgainst: '5',
        goalDiff: '+19',
        points: '25',
        vs: '2511',
        rm: '613',
      },
      {
        position: '2',
        teamName: 'Реал Мадрид',
        teamLink: 'https://www.virtualsoccer.ru/roster.php?num=100',
        games: '10',
        wins: '7',
        draws: '2',
        losses: '1',
        goalsFor: '20',
        goalsAgainst: '8',
        goalDiff: '+12',
        points: '23',
        vs: '2400',
        rm: '580',
      },
      {
        position: '3',
        teamName: 'Барселона',
        teamLink: 'https://www.virtualsoccer.ru/roster.php?num=200',
        games: '10',
        wins: '3',
        draws: '2',
        losses: '5',
        goalsFor: '10',
        goalsAgainst: '15',
        goalDiff: '-5',
        points: '11',
        vs: '1800',
        rm: '450',
      },
    ],
  };

  it('starts with [b]{divisionName}[/b]', () => {
    const result = formatDivisionTableBBCode(singleRowData, 'D1');
    expect(result.startsWith('[b]D1[/b]')).toBe(true);
  });

  it('contains [table width=70% align=center] and [/table]', () => {
    const result = formatDivisionTableBBCode(singleRowData, 'D1');
    expect(result).toContain('[table width=70% align=center]');
    expect(result).toContain('[/table]');
  });

  it('includes header row with all column names', () => {
    const result = formatDivisionTableBBCode(singleRowData, 'D1');
    const headers = ['М', 'Команда', 'И', 'В', 'Н', 'П', 'М', '+/-', 'О', 'Vs', 'РМ'];
    for (const h of headers) {
      expect(result).toContain('[td]' + h + '[/td]');
    }
  });

  it('formats team name as [a href=... target="_blank"]...[/a]', () => {
    const result = formatDivisionTableBBCode(singleRowData, 'D1');
    expect(result).toContain(
      '[a href=https://www.virtualsoccer.ru/roster.php?num=3172 target="_blank"]Виндзор Старз[/a]'
    );
  });

  it('combines goalsFor and goalsAgainst into "X - Y" format', () => {
    const result = formatDivisionTableBBCode(singleRowData, 'D1');
    expect(result).toContain('[td]6 - 0[/td]');
  });

  it('includes all data fields for a single row', () => {
    const result = formatDivisionTableBBCode(singleRowData, 'D1');
    expect(result).toContain('[td]1[/td]'); // position
    expect(result).toContain('[td]1[/td]'); // games
    expect(result).toContain('[td]+6[/td]'); // goalDiff
    expect(result).toContain('[td]3[/td]'); // points
    expect(result).toContain('[td]2511[/td]'); // vs
    expect(result).toContain('[td]613[/td]'); // rm
  });

  it('formats multiple rows correctly', () => {
    const result = formatDivisionTableBBCode(multiRowData, 'D2');
    expect(result.startsWith('[b]D2[/b]')).toBe(true);
    for (const row of multiRowData.rows) {
      expect(result).toContain(row.teamName);
      expect(result).toContain('[td]' + row.position + '[/td]');
      expect(result).toContain('[td]' + row.points + '[/td]');
      expect(result).toContain('[td]' + row.goalsFor + ' - ' + row.goalsAgainst + '[/td]');
    }
  });

  it('has a blank line between the title and the table', () => {
    const result = formatDivisionTableBBCode(singleRowData, 'D1');
    expect(result).toContain('[b]D1[/b]\n\n[table');
  });

  it('produces expected full output for a single row', () => {
    const result = formatDivisionTableBBCode(singleRowData, 'D1');
    const expected =
      '[b]D1[/b]\n\n' +
      '[table width=70% align=center]\n' +
      '[tr][td]М[/td][td]Команда[/td][td]И[/td][td]В[/td][td]Н[/td][td]П[/td][td]М[/td][td]+/-[/td][td]О[/td][td]Vs[/td][td]РМ[/td][/tr]\n' +
      '[tr][td]1[/td][td][a href=https://www.virtualsoccer.ru/roster.php?num=3172 target="_blank"]Виндзор Старз[/a][/td][td]1[/td][td]1[/td][td]0[/td][td]0[/td][td]6 - 0[/td][td]+6[/td][td]3[/td][td]2511[/td][td]613[/td][/tr]\n' +
      '[/table]';
    expect(result).toBe(expected);
  });
});
