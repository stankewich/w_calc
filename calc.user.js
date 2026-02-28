// ==UserScript==
// @name         VSOL: weather and FWDs count
// @license MIT
// @namespace    http://tampermonkey.net/
// @version      1.0351
// @description  Калькулятор статсы погоды, напов и определение школы команды
// @author       community
// @match        *://*.virtualsoccer.ru/roster_m.php*
// @match        *://*.vfleague.com/roster_m.php*
// @match        *://*.vfliga.ru/roster_m.php*
// @match        *://*.vfliga.com/roster_m.php*
// @match        *://*.virtualsoccer.ru/roster_s.php*
// @match        *://*.vfleague.com/roster_s.php*
// @match        *://*.vfliga.ru/roster_s.php*
// @match        *://*.vfliga.com/roster_s.php*
// @match        *://*.virtualsoccer.ru/managerzone.php*
// @match        *://*.vfleague.com/managerzone.php*
// @match        *://*.vfliga.ru/managerzone.php*
// @match        *://*.vfliga.com/managerzone.php*
// @match        *://*.virtualsoccer.ru/mng_asktoplay.php*
// @match        *://*.vfleague.com/mng_asktoplay.php*
// @match        *://*.vfliga.ru/mng_asktoplay.php*
// @match        *://*.vfliga.com/mng_asktoplay.php*
// @match        *://*.virtualsoccer.ru/mng_asktoplay.php*
// @match        *://*.vfleague.com/mng_asktoplay.php*
// @match        *://*.vfliga.ru/mng_asktoplay.php*
// @match        *://*.vfliga.com/mng_asktoplay.php*
// @grant        GM_xmlhttpRequest
// @connect      virtualsoccer.ru
// @connect      vfleague.com
// @connect      vfliga.ru
// @connect      vfliga.com
// @run-at       document-end
// @downloadURL https://update.greasyfork.org/scripts/555253/VSOL%3A%20weather%20and%20FWDs%20count.user.js
// @updateURL https://update.greasyfork.org/scripts/555253/VSOL%3A%20weather%20and%20FWDs%20count.meta.js
// ==/UserScript==

(function() {
  'use strict';
  
  // Определение базового URL в зависимости от домена
  const SITE_CONFIG = (() => {
    const hostname = window.location.hostname;
    let baseUrl = 'https://www.virtualsoccer.ru'; // default
    if (hostname.includes('vfleague.com')) {
      baseUrl = 'https://www.vfleague.com';
    } else if (hostname.includes('vfliga.com')) {
      baseUrl = 'https://www.vfliga.com';
    } else if (hostname.includes('vfliga.ru')) {
      baseUrl = 'https://www.vfliga.ru';
    }
    return { BASE_URL: baseUrl };
  })();
  
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
    return meta ? `${SITE_CONFIG.BASE_URL}/weather/weather_green${meta.icon}.svg` : '';
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
    }).catch(() => { cell.textContent = "Err"; });
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
            httpGet(job.url, (_, html) => {
            let key = null;
            if (html) key = parseWeatherFromMatch(html);
            const icon = key ? setWeatherIcon(key) : '';
            const label = key || '';
            const koef = key ? (WEATHER_SET[key]?.koef ?? '') : '';
            const title = key ? (koef ? `${label} (Кф: ${koef})` : label) : '';
            if (icon) {
            job.cell.innerHTML = `<img src="${icon}" style="height:14px" alt="${label}">`;
            job.cell.title = title; // нативная подсказка
            } else {
            job.cell.innerHTML = '';
            job.cell.removeAttribute('title');
            }
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
    const url = `${SITE_CONFIG.BASE_URL}/roster_m.php?num=${teamNum}&season=${season}`;
    httpGet(url, (_, html) => cb(html));
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
    httpGet(url, (_, html) => {
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

  // Функция для определения школы по суммам спецвозможностей
  function detectSchool(sunnySum, rainySum) {
    const THRESHOLD = 30;
    
    if (sunnySum >= THRESHOLD && sunnySum > rainySum) return '☀️';
    if (rainySum >= THRESHOLD && rainySum > sunnySum) return '🌧️';
    if (sunnySum >= THRESHOLD && rainySum >= THRESHOLD) return sunnySum > rainySum ? '☀️' : '🌧️';
    
    return '';
  }

  // Функция для извлечения спецвозможностей из plrdat
  function extractAbilities(html) {
    const plrdatMatch = html.match(/var plrdat\s*=\s*\[(.*?)\];/s);
    if (!plrdatMatch) return null;
    
    try {
      const plrdatText = plrdatMatch[1];
      const abilities = {
        д: 0, пк: 0, км: 0,
        г: 0, ск: 0, пд: 0
      };
      
      const spRegex = /["']([А-Яа-яЁё]{1,2})(\d+)["']/g;
      let match;
      
      while ((match = spRegex.exec(plrdatText)) !== null) {
        const name = match[1].toLowerCase().trim();
        const level = parseInt(match[2], 10);
        
        if (abilities.hasOwnProperty(name)) {
          abilities[name] += level;
        }
      }
      
      return abilities;
    } catch {
      return null;
    }
  }

  // Кэш школ команд
  const CACHE_KEY = 'vsol_team_schools';
  const CACHE_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 дней
  
  function getSchoolCache() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return {};
      
      const data = JSON.parse(cached);
      const now = Date.now();
      
      // Удаляем устаревшие записи
      Object.keys(data).forEach(key => {
        if (now - data[key].time > CACHE_EXPIRY) {
          delete data[key];
        }
      });
      
      return data;
    } catch {
      return {};
    }
  }
  
  function setSchoolCache(teamId, school) {
    try {
      const cache = getSchoolCache();
      cache[teamId] = { school, time: Date.now() };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch {
      // Игнорируем ошибки localStorage
    }
  }

  // Функция для получения спецвозможностей команды
  function fetchTeamSchool(teamId, callback) {
    // Проверяем кэш
    const cache = getSchoolCache();
    if (cache[teamId]) {
      callback(cache[teamId].school);
      return;
    }
    
    const url = `${SITE_CONFIG.BASE_URL}/roster.php?num=${teamId}`;
    
    httpGet(url, (_, html) => {
      if (!html) {
        callback('');
        return;
      }
      
      const abilities = extractAbilities(html);
      if (abilities) {
        const sunnySum = abilities.д + abilities.пк + abilities.км;
        const rainySum = abilities.г + abilities.ск + abilities.пд;
        const school = detectSchool(sunnySum, rainySum);
        
        // Сохраняем в кэш
        setSchoolCache(teamId, school);
        callback(school);
      } else {
        callback('');
      }
    });
  }

  // Функция для загрузки всех страниц команд
  function loadAllPages(callback) {
    const paginationRow = document.querySelector('form[name="page_forma"] + table td.lh18.txt2r');
    if (!paginationRow) {
      callback();
      return;
    }
    
    // Проверяем, есть ли пагинация
    const pageLinks = paginationRow.querySelectorAll('a');
    if (pageLinks.length === 0) {
      callback();
      return;
    }
    
    // Получаем текущие параметры
    const pageForm = document.querySelector('form[name="page_forma"]');
    const day = pageForm.querySelector('input[name="day"]').value;
    const sort = pageForm.querySelector('input[name="sort"]').value;
    const natId = pageForm.querySelector('input[name="nat_id"]').value;
    const typeFilter = pageForm.querySelector('input[name="type_filter"]').value;
    
    // Определяем количество страниц
    const lastPageLink = pageLinks[pageLinks.length - 1];
    const totalPages = parseInt(lastPageLink.textContent.trim()) || 1;
    
    if (totalPages <= 1) {
      callback();
      return;
    }
    
    const sendForm = document.querySelector('form[name="send_forma"]');
    const mainTable = sendForm.querySelector('table.tbl');
    const tbody = mainTable.querySelector('tbody');
    
    // Показываем прогресс
    const progressDiv = document.createElement('div');
    progressDiv.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#fff; padding:20px; border:2px solid #009900; z-index:10000; text-align:center;';
    progressDiv.innerHTML = '<b>Загрузка всех команд...</b><br><span id="load-progress">Страница 1 из ' + totalPages + '</span>';
    document.body.appendChild(progressDiv);
    
    let loadedPages = 1;
    
    // Загружаем остальные страницы
    function loadPage(pageNum) {
      if (pageNum > totalPages) {
        document.body.removeChild(progressDiv);
        // Удаляем все пагинации (сверху и снизу)
        document.querySelectorAll('td.lh18.txt2r').forEach(td => {
          if (td.textContent.includes('Страницы:')) {
            td.textContent = '';
          }
        });
        callback();
        return;
      }
      
      const url = `/mng_asktoplay.php?day=${day}&page=${pageNum}&sort=${sort}&nat_id=${natId}&type_filter=${typeFilter}`;
      
      httpGet(url, (_, html) => {
        if (html) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const newRows = doc.querySelectorAll('form[name="send_forma"] table.tbl tr[id^="tr_send_"]');
          
          // Добавляем строки в текущую таблицу
          newRows.forEach(row => {
            tbody.appendChild(row.cloneNode(true));
          });
          
          loadedPages++;
          document.getElementById('load-progress').textContent = 'Страница ' + loadedPages + ' из ' + totalPages;
        }
        
        loadPage(pageNum + 1);
      });
    }
    
    loadPage(2);
  }

  // Определение текущего сезона из страницы
  function getCurrentSeason() {
    // Вариант 1: из ссылки на roster_m.php с параметром season=
    const link = document.querySelector('a[href*="roster_m.php"][href*="season="]');
    if (link) {
      const match = link.href.match(/season=(\d+)/);
      if (match) return match[1];
    }
    // Вариант 2: из текста страницы (например "Сезон 75")
    const bodyText = document.body.textContent;
    const seasonMatch = bodyText.match(/[Сс]езон\s*(\d+)/);
    if (seasonMatch) return seasonMatch[1];
    return null;
  }

  // Парсинг HTML страницы roster_m.php и подсчёт '*' в колонке 'А'
  function parseAutoRosterCount(html) {
    if (!html) return 0;
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const table = doc.querySelector('table.tbl');
    if (!table) return 0;

    const headerRow = table.querySelector('tr[bgcolor="#006600"]');
    if (!headerRow) return 0;
    const headerCells = headerRow.querySelectorAll('td');
    let colIndex = -1;
    for (let i = 0; i < headerCells.length; i++) {
      if (headerCells[i].textContent.trim() === 'А') {
        colIndex = i;
        break;
      }
    }
    if (colIndex === -1) return 0;

    let count = 0;
    const allRows = table.querySelectorAll('tr');
    for (const row of allRows) {
      if (row === headerRow) continue;
      const cells = row.querySelectorAll('td');
      if (cells.length > colIndex && cells[colIndex].textContent.trim() === '*') {
        count++;
      }
    }
    return count;
  }

  // Загрузка и подсчёт автосоставов для команды
  function fetchAutoRosterCount(teamId, season, callback) {
    const url = `${SITE_CONFIG.BASE_URL}/roster_m.php?num=${teamId}&season=${season}&filter=1`;
    console.log(`[AutoRoster] Загрузка team=${teamId} season=${season}`);
    httpGet(url, (err, html) => {
      if (err || !html) {
        console.warn(`[AutoRoster] Ошибка загрузки team=${teamId}:`, err);
        callback(0);
        return;
      }
      const count = parseAutoRosterCount(html);
      console.log(`[AutoRoster] team=${teamId} → автосоставов: ${count}`);
      callback(count);
    });
  }


  // Функция для добавления колонки "Школа" на странице mng_asktoplay.php
  function enhanceAskToPlayPage() {
    const sendForm = document.querySelector('form[name="send_forma"]');
    if (!sendForm) return;
    
    const mainTable = sendForm.querySelector('table.tbl');
    if (!mainTable) return;
    
    // Проверяем, не добавлена ли уже колонка "Школа"
    if (mainTable.querySelector('.school-column-header')) return;
    
    // Сначала загружаем все страницы
    loadAllPages(() => {
      // После загрузки всех страниц добавляем фильтр и колонку школы
      addSchoolFilter();
    
    // Работаем только с заголовками внутри send_forma
    const headers = mainTable.querySelectorAll('tr[bgcolor="#006600"]');
    
    headers.forEach(header => {
      // Проверяем, что это заголовок именно таблицы send_forma (есть колонка "⇔")
      const hasInviteColumn = Array.from(header.querySelectorAll('td')).some(td => td.textContent.trim() === '⇔');
      if (!hasInviteColumn) return;
      
      const th = document.createElement('td');
      th.className = 'lh18 txtw qt school-column-header';
      th.style.width = '30px';
      th.title = 'Школа команды';
      th.innerHTML = '<b>Шк</b>';
      
      const cells = Array.from(header.querySelectorAll('td'));
      let idolCell = null;
      for (let i = 0; i < cells.length; i++) {
        const title = cells[i].getAttribute('title') || '';
        const text = cells[i].textContent.trim();
        if (title.includes('кумир') || text === 'К') {
          idolCell = cells[i];
          break;
        }
      }
      
      if (idolCell) {
        idolCell.after(th);
      } else {
        const lastCell = cells[cells.length - 1];
        if (lastCell) lastCell.before(th);
      }
    });
    
    // Работаем только со строками внутри send_forma, которые начинаются с tr_send_
    const allRows = Array.from(mainTable.querySelectorAll('tr'));
    const rows = allRows.filter(tr => tr.id && tr.id.startsWith('tr_send_'));
    const jobs = [];
    
    rows.forEach(row => {
      const teamIdMatch = row.id.match(/tr_send_(\d+)/);
      if (!teamIdMatch) return;
      
      // Проверяем, не добавлена ли уже ячейка школы в эту строку
      if (row.querySelector('.school-cell')) return;
      
      const teamId = teamIdMatch[1];
      const cells = row.querySelectorAll('td');
      
      const schoolCell = document.createElement('td');
      schoolCell.className = 'txt3 qt school-cell';
      schoolCell.style.textAlign = 'center';
      schoolCell.textContent = '...';
      
      const lastCell = cells[cells.length - 1];
      if (lastCell) {
        lastCell.before(schoolCell);
        jobs.push({ teamId, cell: schoolCell });
      }
    });
    
    if (jobs.length) {
      const MAX_PARALLEL = 3;
      let active = 0;
      let queue = jobs.slice();
      
      function work() {
        while (active < MAX_PARALLEL && queue.length) {
          const job = queue.shift();
          active++;
          
          fetchTeamSchool(job.teamId, (school) => {
            job.cell.textContent = school || '-';
            if (school === '☀️') {
              job.cell.title = 'Солнечная школа (Д, Пк, Км)';
              job.cell.style.backgroundColor = '#fffacd';
            } else if (school === '🌧️') {
              job.cell.title = 'Дождевая школа (Г, Ск, Пд)';
              job.cell.style.backgroundColor = '#e0f0ff';
            }
            
            active--;
            work();
          });
        }
      }
      
      work();
    }

    // === Колонка «Авт» (автосоставы) ===
    // 5.1 Проверка идемпотентности и определение сезона
    if (mainTable.querySelector('.auto-roster-header')) {
      console.log('[AutoRoster] Колонка уже добавлена, пропуск');
      return;
    }
    const season = getCurrentSeason();
    if (!season) {
      console.warn('[AutoRoster] Сезон не определён, колонка «Авт» не добавлена');
      return;
    }
    console.log(`[AutoRoster] Сезон: ${season}, добавляем колонку «Авт»`);

    // 5.2 Добавить заголовок «Авт» в строку заголовков
    headers.forEach(header => {
      const schoolHeader = header.querySelector('.school-column-header');
      if (!schoolHeader) return;
      const autoTh = document.createElement('td');
      autoTh.className = 'lh18 txtw qt auto-roster-header';
      autoTh.style.width = '30px';
      autoTh.title = 'Количество автосоставов';
      autoTh.innerHTML = '<b>Авт</b>';
      schoolHeader.after(autoTh);
    });

    // 5.3 Создать ячейки «...» для каждой строки команды
    const autoRosterJobs = [];
    rows.forEach(row => {
      const teamIdMatch = row.id.match(/tr_send_(\d+)/);
      if (!teamIdMatch) return;
      const teamId = teamIdMatch[1];
      const schoolCell = row.querySelector('.school-cell');
      if (!schoolCell) return;
      const autoCell = document.createElement('td');
      autoCell.className = 'txt3 qt auto-roster-cell';
      autoCell.style.textAlign = 'center';
      autoCell.textContent = '...';
      schoolCell.after(autoCell);
      autoRosterJobs.push({ teamId, cell: autoCell });
    });

    // 5.4 Параллельная загрузка данных с ограничением MAX_PARALLEL
    if (autoRosterJobs.length) {
      console.log(`[AutoRoster] Запуск загрузки для ${autoRosterJobs.length} команд`);
      const MAX_PARALLEL_AUTO = 3;
      let activeAuto = 0;
      let doneAuto = 0;
      const autoQueue = autoRosterJobs.slice();

      function processAutoQueue() {
        while (activeAuto < MAX_PARALLEL_AUTO && autoQueue.length) {
          const job = autoQueue.shift();
          activeAuto++;
          fetchAutoRosterCount(job.teamId, season, (count) => {
            job.cell.textContent = count > 0 ? count.toString() : '0';
            if (count > 0) {
              job.cell.style.backgroundColor = '#ffe0e0';
              job.cell.title = `Автосоставов: ${count}`;
            }
            activeAuto--;
            doneAuto++;
            if (doneAuto === autoRosterJobs.length) {
              console.log(`[AutoRoster] Загрузка завершена: ${doneAuto} команд обработано`);
            }
            processAutoQueue();
          });
        }
      }
      processAutoQueue();
    }
    });
  }
  
  // Функция для добавления фильтра по школам
  function addSchoolFilter() {
    // Ищем строку с фильтрами - она находится перед формой send_forma
    const filterRow = document.querySelector('form[name="page_forma"] + table td.lh18.txt2l');
    if (!filterRow || document.getElementById('school-filter')) return;
    
    const filterSelect = document.createElement('select');
    filterSelect.id = 'school-filter';
    filterSelect.className = 'form2';
    filterSelect.style.margin = '1px';
    filterSelect.style.marginLeft = '10px';
    filterSelect.innerHTML = `
      <option value="">все школы</option>
      <option value="☀️">☀️ солнечная</option>
      <option value="🌧️">🌧️ дождевая</option>
      <option value="-">без школы</option>
    `;
    
    filterSelect.onchange = function() {
      applySchoolFilter(this.value);
    };
    
    const label = document.createElement('b');
    label.textContent = ' Школа ';
    label.style.marginLeft = '10px';
    
    filterRow.appendChild(label);
    filterRow.appendChild(filterSelect);
  }
  
  // Функция для применения фильтра по школам
  function applySchoolFilter(schoolValue) {
    const sendForm = document.querySelector('form[name="send_forma"]');
    if (!sendForm) return;
    
    const mainTable = sendForm.querySelector('table.tbl');
    if (!mainTable) return;
    
    const rows = Array.from(mainTable.querySelectorAll('tr')).filter(tr => tr.id && tr.id.startsWith('tr_send_'));
    
    rows.forEach(row => {
      const schoolCell = row.querySelector('.school-cell');
      if (!schoolCell) return;
      
      const cellValue = schoolCell.textContent.trim();
      
      if (!schoolValue) {
        row.style.display = '';
      } else if (schoolValue === '-' && cellValue === '-') {
        row.style.display = '';
      } else if (cellValue === schoolValue) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

const href = location.href;
  if (href.includes('/roster_m.php')) {
    enhanceRosterMatchesPage();
  } else if (href.includes('/roster_s.php')) {
    enhanceRosterStatsPage();
  }
    else if (href.includes('/managerzone.php')) {
        if(href.includes('pm=3')) {
            enhanceRosterStatsPage();
        }
        else if(href.includes('pm=2')) {
            enhanceRosterMatchesPage();
        }
  } else if (href.includes('/mng_asktoplay.php')) {
    enhanceAskToPlayPage();
  }
})();
