// ==UserScript==
// @name         ВСОЛ: Погода и подсчёт атакующих игроков
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Калькулятор статсы погоды и напов
// @author       Arne + nurmukhametov
// @match        https://www.virtualsoccer.ru/roster_m.php*
// @match        https://www.virtualsoccer.ru/roster_s.php*
// @grant        GM_xmlhttpRequest
// @connect      virtualsoccer.ru
// @run-at       document-end
// ==/UserScript==

(function() {
  'use strict';
    const WEATHER_LABELS = [
        {key: 'очень жарко', icon: 6, koef: 0.8},
        {key: 'жарко',       icon: 0, koef: 0.9},
        {key: 'солнечно',    icon: 1, koef: 1.0},
        {key: 'облачно',     icon: 2, koef: 1.1},
        {key: 'пасмурно',    icon: 3, koef: 1.0},
        {key: 'дождь',       icon: 4, koef: 0.9},
        {key: 'снег',        icon: 5, koef: 0.8},
    ];
  const WEATHER_SET = WEATHER_LABELS.reduce((acc, w) => { acc[w.key] = w; return acc; }, {});
  const WEATHER_KEYS = Object.keys(WEATHER_SET);
  function getWeatherKey(text) {
    if (!text) return null;
    const t = text.toLowerCase();
    for (const k of WEATHER_KEYS) {
      if (t.includes(k)) return k;
    }
    return null;
  }
  function setWeatherIcon(key) {
    const meta = WEATHER_SET[key];
    return meta ? `https://www.virtualsoccer.ru/weather/weather_green${meta.icon}.svg` : '';
  }
  function httpGet(url, cb) {
    GM_xmlhttpRequest({
      method: "GET",
      url,
      onload: r => cb(null, r.responseText),
      onerror: e => cb(e, null),
      ontimeout: e => cb(e, null)
    });
  }
  function parseWeatherFromMatch(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    let weatherText = '';
    const nodes = Array.from(doc.querySelectorAll('td, div, span'));
    for (const el of nodes) {
        const txt = (el.textContent || '').trim();
        if (!txt) continue;
        if (txt.toLowerCase().includes('погода')) {
        const m = txt.match(/Погода:\s*([А-Яа-яЁё\s\-]+)/i);
        if (m) {
            weatherText = m[1].trim();
            break;
        }
      }
    }
    if (!weatherText) {
      const bodyText = (doc.body.textContent || '').toLowerCase();
      for (const k of WEATHER_KEYS) {
        if (bodyText.includes(k)) {
          weatherText = k;
          break;
        }
      }
    }
    const key = getWeatherKey(weatherText);
    return key;
  }
  function getFwds(url, is_home, cell) {
    fetch(url).then(response => response.text()).then(function (text) {
        const parser = new DOMParser();
        var page = parser.parseFromString(text, "text/html");
        var tbls = page.getElementsByClassName("tbl");
        var tbl = is_home ? tbls[0] : tbls[1];
        if (!tbl) { cell.textContent = "N/A"; return; }
        var rows = tbl.getElementsByTagName("tr");
        if (rows.length < 2) { cell.textContent = "N/A"; return; }
        var fwds = 0;
        for (var i = 1; i < rows.length; i++) {
        var columns = rows[i].getElementsByTagName("td");
        if (!columns.length) continue;
        var span = columns[0].getElementsByTagName("span");
        if (!span.length) continue;
        var position = span[0].innerText;
        switch (position) {
            case "LW": case "LF": case "CF": case "ST": case "RW": case "RF": case "AM":
            fwds += 1; break;
        }
      }
      cell.textContent = fwds;
      cell.style.backgroundColor = fwds > 3 ? "#ffe0e0" : "#e0ffe0";
    }).catch(e => { cell.textContent = "Err"; });
  }
  function enhanceRosterMatchesPage() {
    const mainTables = Array.from(document.querySelectorAll('table.tbl'));
    if (!mainTables.length) return;
    let matchesTable = null;
    for (const t of mainTables) {
        const header = t.querySelector('tr[bgcolor="#006600"]');
        if (header && /Дата/i.test(header.textContent)) { matchesTable = t; break; }
    }
    if (!matchesTable) return;
    const headers = matchesTable.querySelectorAll('tr[bgcolor="#006600"]');
    headers.forEach(h => {
        const th1 = document.createElement('td');
        th1.className = 'lh18 txtw';
        th1.style.whiteSpace = 'nowrap';
        th1.innerHTML = '<b>Пгд</b>';
        h.appendChild(th1);
        const th2 = document.createElement('td');
        th2.className = 'lh18 txtw';
        th2.style.whiteSpace = 'nowrap';
        th2.innerHTML = '<b>Нпд</b>';
        h.appendChild(th2);
    });
    let stageIndex = -1;
    const headerTds = headers[0]?.querySelectorAll('td');
    if (headerTds) {
      for (let i = 0; i < headerTds.length; i++) {
        if (/Стадия/i.test(headerTds[i].textContent)) {
          stageIndex = i;
          break;
        }
      }
    }
    if (stageIndex === -1) return;
    const jobsWeather = [];
    const jobsFwds = [];
    const rows = Array.from(matchesTable.querySelectorAll('tr')).filter(tr => tr.getAttribute('bgcolor') !== '#006600');
    rows.forEach(tr => {
      if (tr.getAttribute('bgcolor') && tr.getAttribute('bgcolor').toUpperCase() === '#FFEEEE') return;
      if (tr.querySelector('table')) return;
      const tds = tr.querySelectorAll('td');
      if (tds.length <= stageIndex + 1) return;
      const resultTd = tds[stageIndex + 1];
      if (!resultTd.hasAttribute('title')) return;
      if (resultTd.getAttribute('title').trim() === 'Матч ещё не сыгран') return;
      const tdWeather = document.createElement('td');
      tdWeather.className = 'lh16 txt weather_match';
      tdWeather.style.textAlign = 'center';
      tr.appendChild(tdWeather);
      const tdFwds = document.createElement('td');
      tdFwds.className = 'lh16 txt fwds_match';
      tdFwds.style.textAlign = 'center';
      tr.appendChild(tdFwds);
      let matchLink = null;
      for (let i = 0; i < tds.length; i++) {
        const a = tds[i].querySelector('a[href*="viewmatch.php"]');
        if (a) { matchLink = a.href; break; }
      }
      if (matchLink) {
        jobsWeather.push({ url: matchLink, cell: tdWeather });
        const is_home = tds[5]?.innerText.trim() === "Д";
        jobsFwds.push({ url: matchLink, is_home, cell: tdFwds });
      }
    });
    if (jobsWeather.length) {
      const MAX_PARALLEL = 5;
      let active = 0, queue = jobsWeather.slice();
      function work() {
        while (active < MAX_PARALLEL && queue.length) {
          const job = queue.shift();
          active++;
          httpGet(job.url, (err, html) => {
            let key = null;
            if (!err && html) key = parseWeatherFromMatch(html);
            const icon = key ? setWeatherIcon(key) : '';
            job.cell.innerHTML = icon ? `<img src="${icon}" style="height:14px">` : '';
            active--;
            work();
          });
        }
      }
      work();
    }
    if (jobsFwds.length) {
      jobsFwds.forEach(job => getFwds(job.url, job.is_home, job.cell));
    }
  }

function enhanceRosterStatsPage() {
    const teamNum = (location.search.match(/num=(\d+)/) || [])[1] || '2647';

    const WEATHER_SET = WEATHER_LABELS.reduce((acc, w) => { acc[w.key] = w; return acc; }, {});
    const WEATHER_KEYS = Object.keys(WEATHER_SET);
    function getWeatherKey(text) {
        if (!text) return null;
        const t = text.toLowerCase();
        for (const k of WEATHER_KEYS) {
            if (t.includes(k)) return k;
        }
        return null;
    }
    function setWeatherIcon(key) {
        const meta = WEATHER_SET[key];
        return meta ? `https://www.virtualsoccer.ru/weather/weather_green${meta.icon}.svg` : '';
    }
    function httpGet(url, cb) {
        GM_xmlhttpRequest({
            method: "GET",
            url,
            onload: r => cb(null, r.responseText),
            onerror: e => cb(e, null),
            ontimeout: e => cb(e, null)
        });
    }
    function parseWeatherFromMatch(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        let weatherText = '';
        const nodes = Array.from(doc.querySelectorAll('td, div, span'));
        for (const el of nodes) {
            const txt = (el.textContent || '').trim();
            if (!txt) continue;
            if (txt.toLowerCase().includes('погода')) {
                const m = txt.match(/Погода:\s*([А-Яа-яЁё\s\-]+)/i);
                if (m) {
                    weatherText = m[1].trim();
                    break;
                }
            }
        }
        if (!weatherText) {
            const bodyText = (doc.body.textContent || '').toLowerCase();
            for (const k of WEATHER_KEYS) {
                if (bodyText.includes(k)) {
                    weatherText = k;
                    break;
                }
            }
        }
        const key = getWeatherKey(weatherText);
        return key;
    }

const container = document.createElement('div');
container.id = 'vs-weather-ui';
container.style = 
    `margin: 20px auto;
    padding: 10px;
    border: 2px solid #009900;
    background: #f8fff8;
    max-width: 400px;
    font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
    font-size: 12px;
    letter-spacing: 0;
    font-weight: 400;`;
container.innerHTML = 
    `<div style="font-weight:700; margin-bottom:6px;">Погода домашних матчей</div>
    <label>Сезон:
    <input type="number" id="vs-season" value="75" min="1" style="width:60px; font-family: inherit; font-size: 12px;">
    </label>
    <button id="vs-calc-btn" style="margin-left:10px; font-family: inherit; font-size: 12px;">Рассчитать</button>
    <div id="vs-weather-progress" style="margin:10px 0; color:#009900; font-family: inherit; font-size: 12px;"></div>
    <table id="vs-weather-result" style="
    margin-top:10px;
    border-collapse: collapse;
    width: 100%;
    display: none;
    font-family: inherit;
    font-size: 12px;
    letter-spacing: 0;
    font-weight: 400;
    border: 1px solid #ccc;">
    <tbody id="vs-weather-tbody">
    <!-- сюда добавляются строки вида:
    <tr>
    <td style="text-align:left; padding:4px 6px;"><img ...> солнечно</td>
    <td style="text-align:right; padding:4px 6px;">12</td>
    </tr>
    -->
    </tbody>
    </table>
    <div id="vs-weather-total" style="margin-top:8px; font-family: inherit; font-size: 12px;"></div>`;
    const statTable = document.querySelector('table.tbl.wst');
    if (statTable) statTable.parentNode.insertBefore(container, statTable);
    else document.body.prepend(container);
    document.getElementById('vs-calc-btn').onclick = function() {
      const season = document.getElementById('vs-season').value;
      calculateWeather(season);
    };

function fetchSeasonMatches(season, cb) {
      const url = `https://www.virtualsoccer.ru/roster_m.php?num=${teamNum}&season=${season}`;
      httpGet(url, (err, html) => cb(html));
    }

function parseHomeLinks(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const rows = Array.from(doc.querySelectorAll('table.tbl tr')).slice(1);
    const links = [];
    for (const row of rows) {
        const tds = row.querySelectorAll('td');
        if (tds.length < 11) continue;
        const homeAway = tds[5].textContent.trim();
        if (homeAway !== 'Д') continue;
        const tournament = tds[2].textContent.trim();
        if (tournament === 'Товарищеский матч' || tournament === 'Комм. турнир') continue;
        const resultTd = tds[4];
        if (!resultTd || !resultTd.hasAttribute('title')) continue;
        if (resultTd.getAttribute('title').trim() === 'Матч ещё не сыгран') continue;
        const matchAnchor = tds[10]?.querySelector('a[href*="viewmatch.php"]');
        if (matchAnchor) links.push(matchAnchor.href);
    }
    return links;
}

function calculateWeather(season) {
    const progress = document.getElementById('vs-weather-progress');
    const resultTable = document.getElementById('vs-weather-result');
    const tbody = resultTable.querySelector('tbody');
    const totalCell = document.getElementById('vs-weather-total');
    progress.textContent = 'Загружаем список матчей...';
    resultTable.style.display = 'none';
    tbody.innerHTML = '';
    totalCell.innerHTML = '';
    fetchSeasonMatches(season, function(html) {
        const matchLinks = parseHomeLinks(html);
        if (!matchLinks.length) {
          progress.textContent = 'Домашних матчей не найдено!';
          return;
        }
        progress.textContent = `Найдено домашних матчей: ${matchLinks.length}. Загружаем погоду...`;
        let weatherStats = {};
        let done = 0;
        let active = 0;
        const queue = matchLinks.slice();
        const MAX_PARALLEL = 5;

function pump() {
    while (active < MAX_PARALLEL && queue.length) {
    const url = queue.shift();
    active++;
    httpGet(url, (err, html) => {
        const key = html ? parseWeatherFromMatch(html) : null;
        if (key) weatherStats[key] = (weatherStats[key] || 0) + 1;
        done++;
        progress.textContent = `Обработано ${done} из ${matchLinks.length} матчей...`;
        active--;
        if (done === matchLinks.length) render();
        else pump();
        });
    }
}
pump();

function render() {
    progress.textContent = 'Готово!';
    const table = document.getElementById('vs-weather-result');
    const tbody = document.getElementById('vs-weather-tbody');
    const totalCell = document.getElementById('vs-weather-total');
    table.style.display = '';
    tbody.innerHTML = '';
    let total = 0;
    let kfSum = 0;
    for (const w of WEATHER_LABELS) {
        const count = weatherStats[w.key] || 0;
        total += count;
        kfSum += count * w.koef;
        const iconUrl = setWeatherIcon(w.key);
        tbody.insertAdjacentHTML('beforeend', `
        <tr>
        <td style="text-align:left; padding:4px 6px;">
          <img src="${iconUrl}" style="height:14px; vertical-align:middle; margin-right:6px">${w.key}
        </td>
        <td style="text-align:center; padding:4px 6px;">${count}</td>
        </tr>`
    );
    }

    totalCell.innerHTML = `<b>ИТОГО КФ:</b> ${kfSum.toFixed(2)} (матчей: ${total})`;
}
      });
    }
}

  const href = location.href;
  if (href.includes('/roster_m.php')) {
    enhanceRosterMatchesPage();
  } else if (href.includes('/roster_s.php')) {
    enhanceRosterStatsPage();
  }
})();