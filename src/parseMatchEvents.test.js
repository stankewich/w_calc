import { describe, it, expect } from 'vitest';
import { parseMatchEvents } from './parseMatchEvents.js';

function wrapRows(rowsHtml) {
  return `<html><body><table>${rowsHtml}</table></body></html>`;
}

function goalRow({ minute = '67', player = 'Иванов', score = '1:0', bgcolor = '#c9f2c5', playerHref = 'https://www.virtualsoccer.ru/player.php?num=123', description = null } = {}) {
  var desc = description || `<a class="mnu qf" href="${playerHref}">${player}</a> (головой), удар с близкого расстояния`;
  return `<tr bgcolor="${bgcolor}"><td>${minute}</td><td title="Гол"></td><td></td><td class="lh16 txt">${desc}</td><td>${score}</td></tr>`;
}

describe('parseMatchEvents', () => {
  it('returns empty array for empty/null input', () => {
    expect(parseMatchEvents('')).toEqual([]);
    expect(parseMatchEvents(null)).toEqual([]);
    expect(parseMatchEvents(undefined)).toEqual([]);
  });

  it('returns empty array when no Chronicle_Table rows exist', () => {
    var html = '<html><body><table><tr><td>No events</td></tr></table></body></html>';
    expect(parseMatchEvents(html)).toEqual([]);
  });

  it('parses a goal event with description', () => {
    var html = wrapRows(goalRow({ minute: '62', player: 'Френциско Ре', score: '0:1' }));
    var result = parseMatchEvents(html);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('goal');
    expect(result[0].minute).toBe('62');
    expect(result[0].playerName).toBe('Френциско Ре');
    expect(result[0].score).toBe('0:1');
    expect(result[0].descriptionBBCode).toContain('[a href=');
    expect(result[0].descriptionBBCode).toContain('Френциско Ре[/a]');
  });

  it('converts player links to BB-code format', () => {
    var desc = '<a class="mnu qf" href="/player.php?num=111">Игрок А</a> (пас - <a class="mnu qf" href="/player.php?num=222">Игрок Б</a>)';
    var html = wrapRows(goalRow({ description: desc, score: '1:0' }));
    var result = parseMatchEvents(html);
    expect(result[0].descriptionBBCode).toBe(
      '[a href=/player.php?num=111 target="_blank"]Игрок А[/a] (пас - [a href=/player.php?num=222 target="_blank"]Игрок Б[/a])'
    );
  });

  it('adds leading / to relative hrefs without it', () => {
    var desc = '<a class="mnu qf" href="player.php?num=333">Игрок</a>';
    var html = wrapRows(goalRow({ description: desc, score: '1:0' }));
    var result = parseMatchEvents(html);
    expect(result[0].descriptionBBCode).toContain('[a href=/player.php?num=333');
  });

  it('skips non-goal events (yellow cards, subs, etc.)', () => {
    var yellowRow = '<tr bgcolor="#c9f2c5"><td>23</td><td><img title="Желтая карточка"></td><td></td><td class="lh16 txt"><a class="mnu">Петров</a> получает желтую карточку</td><td></td></tr>';
    var subRow = '<tr bgcolor="#c9f2c5"><td>60</td><td><img title="Замена"></td><td></td><td class="lh16 txt"><a class="mnu">Козлов</a> заменен, на поле выходит <a class="mnu">Новиков</a></td><td></td></tr>';
    var html = wrapRows(yellowRow + subRow + goalRow({ minute: '67', player: 'Автор', score: '1:0' }));
    var result = parseMatchEvents(html);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('goal');
  });

  it('sorts multiple goals by minute', () => {
    var html = wrapRows([
      goalRow({ minute: '67', player: 'Б', score: '2:0' }),
      goalRow({ minute: '15', player: 'А', score: '1:0' }),
    ].join(''));
    var result = parseMatchEvents(html);
    expect(result.map(e => e.minute)).toEqual(['15', '67']);
  });

  it('preserves order for goals with same minute (stable sort)', () => {
    var html = wrapRows([
      goalRow({ minute: '45', player: 'А', score: '1:0' }),
      goalRow({ minute: '45', player: 'Б', score: '2:0' }),
    ].join(''));
    var result = parseMatchEvents(html);
    expect(result[0].playerName).toBe('А');
    expect(result[1].playerName).toBe('Б');
  });

  it('skips rows with missing minute', () => {
    var noMinuteRow = '<tr bgcolor="#c9f2c5"><td></td><td title="Гол"></td><td></td><td><a class="mnu">Игрок</a></td><td>1:0</td></tr>';
    expect(parseMatchEvents(wrapRows(noMinuteRow))).toEqual([]);
  });

  it('skips rows with missing player name', () => {
    var noPlayerRow = '<tr bgcolor="#c9f2c5"><td>10</td><td title="Гол"></td><td></td><td>описание без ссылки</td><td>1:0</td></tr>';
    expect(parseMatchEvents(wrapRows(noPlayerRow))).toEqual([]);
  });

  it('detects goal from background-image style', () => {
    var bgRow = '<tr bgcolor="#c9f2c5"><td>62</td><td style="background-image:url(pics/gol.gif)"></td><td></td><td class="lh16 txt"><a class="mnu qf" href="https://www.virtualsoccer.ru/player.php?num=123">Игрок</a> (головой)</td><td>0:1</td></tr>';
    var result = parseMatchEvents(wrapRows(bgRow));
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('goal');
    expect(result[0].descriptionBBCode).toContain('[a href=');
  });

  it('handles "45+2" style minutes', () => {
    var html = wrapRows([
      goalRow({ minute: '46', player: 'Б', score: '2:0' }),
      goalRow({ minute: '45+2', player: 'А', score: '1:0' }),
    ].join(''));
    var result = parseMatchEvents(html);
    expect(result.map(e => e.minute)).toEqual(['45+2', '46']);
  });
});
