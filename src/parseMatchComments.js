/**
 * Parses all manager comments from viewmatch.php HTML.
 *
 * Two comment sections are parsed:
 *
 * 1. «Комментарии тренеров команд:» — coach comments
 *    Structure: table.tobl > table.nol > tr (one per timing slot) > td[0]=home, td[1]=away
 *    Each td contains: <b>до матча</b> or <b>после матча</b> label + comment div
 *    Returns type='coach' with side ('home'|'away'), timing ('before'|'after'), nick, team, text.
 *
 * 2. «Комментарии к матчу:» — match comments (full width)
 *    Structure: <tr id="c{N}"> with <span id="nick{N}"> and <div id="mess{N}">
 *    Returns type='match' with nick, text.
 *
 * @param {string} html - HTML string from viewmatch.php
 * @returns {MatchComment[]} Array of comments, empty if none found
 *
 * @typedef {Object} MatchComment
 * @property {'coach'|'match'} type
 * @property {'home'|'away'} [side]      - coach only
 * @property {'before'|'after'} [timing] - coach only
 * @property {string} nick
 * @property {string} [team]             - coach only
 * @property {string} text
 */
export function parseMatchComments(html) {
  if (!html) return [];

  const doc = new DOMParser().parseFromString(html, 'text/html');
  const results = [];

  // ---- 1. Coach comments ----
  const coachTobl = findNextTobl(doc, 'Комментарии тренеров команд');
  if (coachTobl) {
    // Inside coachTobl there is a table.nol with rows: each row = one timing slot
    const nolTable = coachTobl.querySelector('table.nol');
    if (nolTable) {
      const rows = nolTable.querySelectorAll('tr');
      for (const row of rows) {
        const tds = row.querySelectorAll(':scope > td');
        if (tds.length < 2) continue;

        // Determine timing from label inside either td
        let timing = null;
        for (const td of tds) {
          const bolds = td.querySelectorAll('b');
          for (const b of bolds) {
            const t = b.textContent.toLowerCase();
            if (t.includes('до матча') || t.includes('перед матчем')) { timing = 'before'; break; }
            if (t.includes('после матча')) { timing = 'after'; break; }
          }
          if (timing) break;
        }
        if (!timing) continue;

        // Parse each td as home (0) or away (1)
        const sides = ['home', 'away'];
        for (let i = 0; i < 2; i++) {
          const td = tds[i];
          const commentDiv = td.querySelector('div[style*="padding-top:5px"]');
          if (!commentDiv) continue;

          const text = commentDiv.textContent;
          const textMatch = text.match(/\):\s*"([^"]+)"/);
          if (!textMatch) continue;

          const links = commentDiv.querySelectorAll('a b');
          const nick = links.length > 0 ? links[links.length - 1].textContent.trim() : '';
          if (!nick) continue;

          let team = '';
          for (const b of commentDiv.querySelectorAll('b')) {
            if (!b.closest('a')) { team = b.textContent.trim(); break; }
          }

          results.push({
            type: 'coach',
            side: sides[i],
            timing,
            nick,
            team,
            text: textMatch[1].trim(),
          });
        }
      }
    }
  }

  // ---- 2. Match comments ----
  const matchTobl = findNextTobl(doc, 'Комментарии к матчу');
  if (matchTobl) {
    const rows = matchTobl.querySelectorAll('tr[id^="c"]');
    for (const row of rows) {
      const id = row.id.replace('c', '');
      if (!id || isNaN(Number(id))) continue;

      const nickSpan = row.querySelector('span[id="nick' + id + '"]');
      if (!nickSpan) continue;
      const nick = nickSpan.textContent.trim();
      if (!nick) continue;

      const messDiv = row.querySelector('div[id="mess' + id + '"]');
      const textDiv = row.querySelector('div[id="id' + id + '"]');
      const rawText = messDiv ? messDiv.textContent.trim() : (textDiv ? textDiv.textContent.trim() : '');
      if (!rawText) continue;

      results.push({ type: 'match', nick, text: rawText });
    }
  }

  return results;
}

/**
 * Finds the next <table class="tobl"> after a heading containing the given text.
 */
function findNextTobl(doc, headingText) {
  for (const b of doc.querySelectorAll('b')) {
    if (!b.textContent.includes(headingText)) continue;
    let el = b;
    while (el && !(el.tagName === 'TABLE' && el.className.includes('tobl'))) {
      el = el.parentElement;
    }
    if (!el) continue;
    let sib = el.nextElementSibling;
    while (sib) {
      if (sib.tagName === 'TABLE' && sib.className.includes('tobl')) return sib;
      sib = sib.nextElementSibling;
    }
  }
  return null;
}
