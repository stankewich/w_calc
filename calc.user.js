// ==UserScript==
// @name         VSOL: weather and FWDs count
// @license MIT
// @namespace    http://tampermonkey.net/
// @version      1.0352
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
  function parseFwdsFromHtml(doc, is_home) {
    const tbls = doc.getElementsByClassName("tbl");
    const tbl = is_home ? tbls[0] : tbls[1];
    if (!tbl) return null;
    const rows = tbl.getElementsByTagName("tr");
    if (rows.length < 2) return null;
    let fwds = 0;
    for (let i = 1; i < rows.length; i++) {
      const columns = rows[i].getElementsByTagName("td");
      if (!columns.length) continue;
      const span = columns[0].getElementsByTagName("span");
      if (!span.length) continue;
      switch (span[0].innerText) {
        case "LW": case "LF": case "CF": case "ST": case "RW": case "RF": case "AM":
          fwds++; break;
      }
    }
    return fwds;
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
        if (/Стадия/i.test(headerTds[i].textContent)) { stageIndex = i; break; }
      }
    }
    if (stageIndex === -1) return;
    const jobs = [];
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
        const is_home = tds[5]?.innerText.trim() === "Д";
        jobs.push({ url: matchLink, is_home, weatherCell: tdWeather, fwdsCell: tdFwds });
      }
    });
    if (jobs.length) {
      const MAX_PARALLEL = 5;
      let active = 0;
      const queue = jobs.slice();
      function work() {
        while (active < MAX_PARALLEL && queue.length) {
          const job = queue.shift();
          active++;
          httpGet(job.url, (_, html) => {
            if (html) {
              // Погода
              const key = parseWeatherFromMatch(html);
              if (key) {
                const icon = setWeatherIcon(key);
                const koef = WEATHER_SET[key]?.koef ?? '';
                const title = koef ? `${key} (Кф: ${koef})` : key;
                job.weatherCell.innerHTML = `<img src="${icon}" style="height:14px" alt="${key}">`;
                job.weatherCell.title = title;
              }
              // Нападающие — парсим из того же HTML
              const doc = new DOMParser().parseFromString(html, 'text/html');
              const fwds = parseFwdsFromHtml(doc, job.is_home);
              if (fwds !== null) {
                job.fwdsCell.textContent = fwds;
                job.fwdsCell.style.backgroundColor = fwds > 3 ? "#ffe0e0" : "#e0ffe0";
              } else {
                job.fwdsCell.textContent = "N/A";
              }
            } else {
              job.fwdsCell.textContent = "Err";
            }
            active--;
            work();
          });
        }
      }
      work();
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
    // Ищем ссылки пагинации changePage(N) внутри div_opp
    const divOpp = document.getElementById('div_opp');
    if (!divOpp) {
      console.log('[LoadAllPages] div_opp не найден');
      callback();
      return;
    }

    // Собираем номера страниц из onclick="changePage(N)"
    const pageLinks = divOpp.querySelectorAll('a[onclick*="changePage"]');
    const pageNums = new Set();
    pageLinks.forEach(a => {
      const m = a.getAttribute('onclick').match(/changePage\((\d+)\)/);
      if (m) pageNums.add(parseInt(m[1], 10));
    });

    if (!pageNums.size) {
      // Нет дополнительных страниц — пагинации нет или одна страница
      console.log('[LoadAllPages] Пагинация не найдена или одна страница');
      callback();
      return;
    }

    const totalPages = Math.max(...pageNums, 1);
    console.log(`[LoadAllPages] Найдено страниц: ${totalPages}`);

    // Получаем текущие параметры
    const pageForm = document.querySelector('form[name="page_forma"]');
    if (!pageForm) { callback(); return; }
    const day = pageForm.querySelector('input[name="day"]')?.value || '';
    const sort = pageForm.querySelector('input[name="sort"]')?.value || '1';
    const natId = pageForm.querySelector('input[name="nat_id"]')?.value || '0';
    const typeFilter = pageForm.querySelector('input[name="type_filter"]')?.value || '1';

    const sendForm = document.querySelector('form[name="send_forma"]');
    const mainTable = sendForm?.querySelector('table.tbl');
    if (!mainTable) { callback(); return; }

    // Находим последний tbody или сам mainTable для вставки строк
    const lastHeaderRow = mainTable.querySelectorAll('tr[bgcolor="#006600"]');
    const bottomHeader = lastHeaderRow.length > 1 ? lastHeaderRow[lastHeaderRow.length - 1] : null;

    // Показываем прогресс
    const progressDiv = document.createElement('div');
    progressDiv.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#fff; padding:20px; border:2px solid #009900; z-index:10000; text-align:center;';
    progressDiv.innerHTML = '<b>Загрузка всех команд...</b><br><span id="load-progress">Страница 1 из ' + totalPages + '</span>';
    document.body.appendChild(progressDiv);

    let loadedPages = 1;

    // Загружаем остальные страницы последовательно
    function loadPage(pageNum) {
      if (pageNum > totalPages) {
        document.body.removeChild(progressDiv);
        // Скрываем пагинацию после загрузки всех страниц
        const paginationCells = divOpp.querySelectorAll('td.lh18.txt2r');
        paginationCells.forEach(td => { td.style.display = 'none'; });
        // Обновляем текст "Показаны с 1 по 50" → "Показаны все"
        const infoCell = divOpp.querySelector('td.lh18.txt2l');
        if (infoCell) {
          infoCell.innerHTML = infoCell.innerHTML.replace(/Показаны с \d+ по \d+/, 'Показаны все');
        }
        console.log(`[LoadAllPages] Все ${totalPages} страниц загружены`);
        callback();
        return;
      }

      const url = `/mng_asktoplay.php?day=${day}&page=${pageNum}&sort=${sort}&nat_id=${natId}&type_filter=${typeFilter}`;

      httpGet(url, (_, html) => {
        if (html) {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const newRows = doc.querySelectorAll('form[name="send_forma"] table.tbl tr[id^="tr_send_"]');

          // Вставляем строки перед нижним заголовком (если есть), иначе в конец таблицы
          newRows.forEach(row => {
            const cloned = row.cloneNode(true);
            if (bottomHeader) {
              bottomHeader.parentNode.insertBefore(cloned, bottomHeader);
            } else {
              mainTable.querySelector('tbody')?.appendChild(cloned) || mainTable.appendChild(cloned);
            }
          });

          loadedPages++;
          const prog = document.getElementById('load-progress');
          if (prog) prog.textContent = 'Страница ' + loadedPages + ' из ' + totalPages;
        }

        loadPage(pageNum + 1);
      });
    }

    loadPage(2);
  }

  // Определение текущего сезона через загрузку roster_m.php первой команды
  function getCurrentSeason(callback) {
    const firstTeamRow = document.querySelector('tr[id^="tr_send_"]');
    if (!firstTeamRow) {
      console.warn('[AutoRoster] Нет строк команд для определения сезона');
      callback(null);
      return;
    }
    const teamId = firstTeamRow.id.match(/tr_send_(\d+)/)?.[1];
    if (!teamId) { callback(null); return; }
    const url = `${SITE_CONFIG.BASE_URL}/roster_m.php?num=${teamId}`;
    console.log(`[AutoRoster] Определяем сезон через roster_m.php team=${teamId}`);
    httpGet(url, (err, html) => {
      if (err || !html) {
        console.warn('[AutoRoster] Ошибка загрузки roster_m.php для определения сезона');
        callback(null);
        return;
      }
      const match = html.match(/season=(\d+)/);
      if (match) {
        console.log(`[AutoRoster] Сезон: ${match[1]}`);
        callback(match[1]);
      } else {
        console.warn('[AutoRoster] Сезон не найден в roster_m.php');
        callback(null);
      }
    });
  }

  // Парсинг HTML страницы roster_m.php и подсчёт '*' в колонке 'А'
  function parseAutoRosterCount(html) {
    if (!html) return 0;
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const tables = doc.querySelectorAll('table.tbl');
    if (!tables.length) { console.warn('[AutoRoster:parse] table.tbl не найдена'); return 0; }

    // Ищем таблицу, в заголовке которой есть колонка «А»
    let targetTable = null;
    let colIndex = -1;
    for (const table of tables) {
      const headerRow = table.querySelector('tr[bgcolor="#006600"]');
      if (!headerRow) continue;
      const headerCells = headerRow.querySelectorAll('td');
      for (let i = 0; i < headerCells.length; i++) {
        if (headerCells[i].textContent.trim() === 'А') {
          targetTable = table;
          colIndex = i;
          break;
        }
      }
      if (targetTable) break;
    }

    if (!targetTable || colIndex === -1) {
      console.warn('[AutoRoster:parse] Колонка «А» не найдена ни в одной table.tbl');
      return 0;
    }
    console.log(`[AutoRoster:parse] Колонка «А» найдена, index=${colIndex}`);

    const headerRow = targetTable.querySelector('tr[bgcolor="#006600"]');
    let count = 0;
    const allRows = targetTable.querySelectorAll('tr');
    for (const row of allRows) {
      if (row === headerRow) continue;
      const cells = row.querySelectorAll('td');
      if (cells.length > colIndex) {
        const cellText = cells[colIndex].textContent.trim();
        if (cellText === '*') count++;
      }
    }
    console.log(`[AutoRoster:parse] Результат: ${count} автосоставов`);
    return count;
  }

  // Загрузка и подсчёт автосоставов для команды
  function fetchAutoRosterCount(teamId, season, callback) {
    const url = `${SITE_CONFIG.BASE_URL}/roster_m.php?num=${teamId}&season=${season}&pm=1&filter=1`;
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


  // Функция для добавления колонок "Школа" и "Авт" на странице mng_asktoplay.php
  function enhanceAskToPlayPage() {
    const sendForm = document.querySelector('form[name="send_forma"]');
    if (!sendForm) return;

    const mainTable = sendForm.querySelector('table.tbl');
    if (!mainTable) return;

    // Проверяем, не добавлены ли уже колонки
    if (mainTable.querySelector('.school-column-header')) return;

    // Сначала загружаем все страницы, потом определяем сезон, потом обогащаем таблицу
    loadAllPages(() => {
      addSchoolFilter();

      // Определяем сезон до создания ячеек, чтобы сразу добавить обе колонки
      getCurrentSeason((season) => {
        const hasAutoColumn = !!season;

        // === Заголовки ===
        const headers = mainTable.querySelectorAll('tr[bgcolor="#006600"]');
        headers.forEach(header => {
          const hasInviteColumn = Array.from(header.querySelectorAll('td')).some(td => td.textContent.trim() === '⇔');
          if (!hasInviteColumn) return;

          // Находим ячейку «К» (кумиры) для вставки после неё
          const cells = Array.from(header.querySelectorAll('td'));
          let idolCell = null;
          for (const c of cells) {
            if ((c.getAttribute('title') || '').includes('кумир') || c.textContent.trim() === 'К') {
              idolCell = c;
              break;
            }
          }

          const thSchool = document.createElement('td');
          thSchool.className = 'lh18 txtw qt school-column-header';
          thSchool.style.width = '30px';
          thSchool.title = 'Школа команды';
          thSchool.innerHTML = '<b>Шк</b>';

          if (idolCell) idolCell.after(thSchool);
          else { const last = cells[cells.length - 1]; if (last) last.before(thSchool); }

          if (hasAutoColumn) {
            const thAuto = document.createElement('td');
            thAuto.className = 'lh18 txtw qt auto-roster-header';
            thAuto.style.width = '30px';
            thAuto.title = 'Количество автосоставов';
            thAuto.innerHTML = '<b>Авт</b>';
            thSchool.after(thAuto);
          }
        });

        // === Строки команд — создаём ячейки ===
        const rows = Array.from(mainTable.querySelectorAll('tr')).filter(tr => tr.id && tr.id.startsWith('tr_send_'));
        const jobs = [];

        rows.forEach(row => {
          const teamIdMatch = row.id.match(/tr_send_(\d+)/);
          if (!teamIdMatch || row.querySelector('.school-cell')) return;
          const teamId = teamIdMatch[1];
          const cells = row.querySelectorAll('td');
          const lastCell = cells[cells.length - 1];
          if (!lastCell) return;

          const schoolCell = document.createElement('td');
          schoolCell.className = 'txt3 qt school-cell';
          schoolCell.style.textAlign = 'center';
          schoolCell.textContent = '...';
          lastCell.before(schoolCell);

          let autoCell = null;
          if (hasAutoColumn) {
            autoCell = document.createElement('td');
            autoCell.className = 'txt3 qt auto-roster-cell';
            autoCell.style.textAlign = 'center';
            autoCell.textContent = '...';
            schoolCell.after(autoCell);
          }

          jobs.push({ teamId, schoolCell, autoCell });
        });

        // === Единый параллельный проход: школа + автосоставы одновременно ===
        if (jobs.length) {
          const MAX_PARALLEL = 5;
          let active = 0;
          const queue = jobs.slice();
          let done = 0;

          function pump() {
            while (active < MAX_PARALLEL && queue.length) {
              const job = queue.shift();
              active++;
              let pending = hasAutoColumn ? 2 : 1;

              function jobDone() {
                pending--;
                if (pending === 0) {
                  active--;
                  done++;
                  if (done === jobs.length) {
                    console.log(`[Enhance] Все ${done} команд обработаны`);
                  }
                  pump();
                }
              }

              // Запрос школы
              fetchTeamSchool(job.teamId, (school) => {
                job.schoolCell.textContent = school || '-';
                if (school === '☀️') {
                  job.schoolCell.title = 'Солнечная школа (Д, Пк, Км)';
                  job.schoolCell.style.backgroundColor = '#fffacd';
                } else if (school === '🌧️') {
                  job.schoolCell.title = 'Дождевая школа (Г, Ск, Пд)';
                  job.schoolCell.style.backgroundColor = '#e0f0ff';
                }
                jobDone();
              });

              // Запрос автосоставов (параллельно с школой)
              if (hasAutoColumn) {
                fetchAutoRosterCount(job.teamId, season, (count) => {
                  job.autoCell.textContent = count > 0 ? count.toString() : '0';
                  if (count > 0) {
                    job.autoCell.style.backgroundColor = '#ffe0e0';
                    job.autoCell.title = `Автосоставов: ${count}`;
                  }
                  jobDone();
                });
              }
            }
          }
          pump();
        }
      }); // getCurrentSeason
    }); // loadAllPages
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
