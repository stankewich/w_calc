// ==UserScript==
// @name         VSOL: weather and FWDs count
// @license MIT
// @namespace    http://tampermonkey.net/
// @version      1.53
// @description  Калькулятор статсы погоды, напов и определение школы команды
// @author       community
// @match        *://*.virtualsoccer.ru/roster.php*
// @match        *://*.vfleague.com/roster.php*
// @match        *://*.vfliga.ru/roster.php*
// @match        *://*.vfliga.com/roster.php*
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
// @match        *://*.virtualsoccer.ru/teams_cntr.php*
// @match        *://*.vfleague.com/teams_cntr.php*
// @match        *://*.vfliga.ru/teams_cntr.php*
// @match        *://*.vfliga.com/teams_cntr.php*
// @match        *://*.virtualsoccer.ru/realplayers.php*
// @match        *://*.virtualsoccer.ru/adm_baseplayers.php*
// @match        *://*.vfleague.com/adm_baseplayers.php*
// @match        *://*.vfliga.ru/adm_baseplayers.php*
// @match        *://*.vfliga.com/adm_baseplayers.php*
// @match        *://*.virtualsoccer.ru/fed_news.php*
// @match        *://*.vfleague.com/fed_news.php*
// @match        *://*.vfliga.ru/fed_news.php*
// @match        *://*.vfliga.com/fed_news.php*
// @match        *://*.virtualsoccer.ru/fed_news_edit.php*
// @match        *://*.vfleague.com/fed_news_edit.php*
// @match        *://*.vfliga.ru/fed_news_edit.php*
// @match        *://*.vfliga.com/fed_news_edit.php*
// @match        *://*.virtualsoccer.ru/v2champ.php*
// @match        *://*.vfleague.com/v2champ.php*
// @match        *://*.vfliga.ru/v2champ.php*
// @match        *://*.vfliga.com/v2champ.php*
// @match        *://*.virtualsoccer.ru/matchlist.php*
// @match        *://*.vfleague.com/matchlist.php*
// @match        *://*.vfliga.ru/matchlist.php*
// @match        *://*.vfliga.com/matchlist.php*
// @match        *://*.virtualsoccer.ru/manager_transflist.php*
// @match        *://*.vfleague.com/manager_transflist.php*
// @match        *://*.vfliga.ru/manager_transflist.php*
// @match        *://*.vfliga.com/manager_transflist.php*
// @match        *://*.virtualsoccer.ru/manager_deltransf.php*
// @match        *://*.vfleague.com/manager_deltransf.php*
// @match        *://*.vfliga.ru/manager_deltransf.php*
// @match        *://*.vfliga.com/manager_deltransf.php*
// @match        *://*.virtualsoccer.ru/mng_transf.php*
// @match        *://*.vfleague.com/mng_transf.php*
// @match        *://*.vfliga.ru/mng_transf.php*
// @match        *://*.vfliga.com/mng_transf.php*
// @match        *://*.virtualsoccer.ru/federation.php*
// @match        *://*.vfleague.com/federation.php*
// @match        *://*.vfliga.ru/federation.php*
// @match        *://*.vfliga.com/federation.php*
// @match        *://www.transfermarkt.us/*/startseite/verein/*
// @match        *://www.transfermarkt.com/*/startseite/verein/*
// @match        *://www.transfermarkt.co.uk/*/startseite/verein/*
// @match        *://www.transfermarkt.de/*/startseite/verein/*
// @match        *://www.transfermarkt.es/*/startseite/verein/*
// @match        *://www.transfermarkt.fr/*/startseite/verein/*
// @match        *://www.transfermarkt.it/*/startseite/verein/*
// @match        *://www.transfermarkt.com.br/*/startseite/verein/*
// @match        *://www.transfermarkt.nl/*/startseite/verein/*
// @match        *://www.transfermarkt.at/*/startseite/verein/*
// @match        *://www.transfermarkt.pl/*/startseite/verein/*
// @match        *://www.transfermarkt.pt/*/startseite/verein/*
// @match        *://www.transfermarkt.com.tr/*/startseite/verein/*
// @match        *://www.transfermarkt.ru/*/startseite/verein/*
// @match        *://www.transfermarkt.jp/*/startseite/verein/*
// @match        *://www.transfermarkt.world/*/startseite/verein/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @connect      virtualsoccer.ru
// @connect      vfleague.com
// @connect      vfliga.ru
// @connect      vfliga.com
// @connect      transfermarkt.us
// @connect      transfermarkt.com
// @connect      transfermarkt.co.uk
// @connect      transfermarkt.de
// @connect      transfermarkt.es
// @connect      transfermarkt.fr
// @connect      transfermarkt.it
// @connect      transfermarkt.com.br
// @connect      transfermarkt.nl
// @connect      transfermarkt.at
// @connect      transfermarkt.pl
// @connect      transfermarkt.pt
// @connect      transfermarkt.com.tr
// @connect      transfermarkt.ru
// @connect      transfermarkt.jp
// @connect      transfermarkt.world
// @run-at       document-end
// @downloadURL https://update.greasyfork.org/scripts/555253/VSOL%3A%20weather%20and%20FWDs%20count.user.js
// @updateURL https://update.greasyfork.org/scripts/555253/VSOL%3A%20weather%20and%20FWDs%20count.meta.js
// ==/UserScript==

(function() {
  'use strict';
  
  // Определение базового URL в зависимости от домена
  const SITE_CONFIG = (() => {
    // Use the exact origin of the current page to avoid cross-origin CORS issues
    // (e.g. vfliga.ru vs www.vfliga.ru)
    return { BASE_URL: window.location.origin };
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
    var controller = new AbortController();
    var timer = setTimeout(function() { controller.abort(); }, 45000);
    fetch(url, { credentials: 'same-origin', signal: controller.signal })
      .then(function(r) {
        if (r.ok) return r.text();
        throw new Error('HTTP ' + r.status);
      })
      .then(function(html) {
        clearTimeout(timer);
        console.log('[httpGet] ' + url + ' → ok, length=' + html.length);
        cb(null, html);
      })
      .catch(function(e) {
        clearTimeout(timer);
        if (e.name === 'AbortError') {
          console.error('[httpGet] timeout: ' + url);
          cb(new Error('timeout'), null);
        } else {
          console.warn('[httpGet] error: ' + url, e);
          cb(e, null);
        }
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
    console.log(`[parseFwds] tables found: ${tbls.length}, is_home: ${is_home}`);
    const tbl = is_home ? tbls[0] : tbls[1];
    if (!tbl) { console.warn('[parseFwds] target table not found'); return null; }
    const rows = tbl.getElementsByTagName("tr");
    if (rows.length < 2) { console.warn(`[parseFwds] too few rows: ${rows.length}`); return null; }
    let fwds = 0;
    for (let i = 1; i < rows.length; i++) {
      const columns = rows[i].getElementsByTagName("td");
      if (!columns.length) continue;
      const span = columns[0].getElementsByTagName("span");
      if (!span.length) continue;
      const pos = span[0].textContent.trim();
      switch (pos) {
        case "LW": case "LF": case "CF": case "ST": case "RW": case "RF": case "AM":
          fwds++; break;
      }
    }
    console.log(`[parseFwds] result: ${fwds}`);
    return fwds;
  }

  function parseDefenseType(doc, is_home) {
    // Find the row containing "Вид защиты" label
    const allTds = doc.querySelectorAll('td');
    for (let i = 0; i < allTds.length; i++) {
      if (allTds[i].textContent.trim().startsWith('Вид защиты')) {
        const tr = allTds[i].closest('tr');
        if (!tr) continue;
        const tds = tr.querySelectorAll('td');
        // Structure: td[colspan=2] (home) | td (label) | td[colspan=2] (away)
        let valueTd = null;
        if (is_home) {
          valueTd = tds[0]; // first td = home team
        } else {
          valueTd = tds[tds.length - 1]; // last td = away team
        }
        if (!valueTd) return null;
        const text = valueTd.textContent.trim().toLowerCase();
        console.log(`[parseDefenseType] is_home=${is_home}, text="${text}"`);
        if (text.includes('зональн')) return 'з';
        if (text.includes('персональн')) return 'п';
        if (text.includes('по игроку')) return 'п';
        return null;
      }
    }
    console.log(`[parseDefenseType] "Вид защиты" row not found`);
    return null;
  }

  function enhanceRosterMatchesPage(forceRefresh) {
    console.log(`[RosterMatches] start, forceRefresh=${!!forceRefresh}`);
    const mainTables = Array.from(document.querySelectorAll('table.tbl'));
    console.log(`[RosterMatches] table.tbl count: ${mainTables.length}`);
    if (!mainTables.length) return;
    let matchesTable = null;
    for (const t of mainTables) {
        const header = t.querySelector('tr[bgcolor="#006600"]');
        if (header && /Дата/i.test(header.textContent)) { matchesTable = t; break; }
    }
    if (!matchesTable) { console.warn('[RosterMatches] matchesTable not found'); return; }
    const headers = matchesTable.querySelectorAll('tr[bgcolor="#006600"]');

    // Добавляем заголовки и кнопку только при первом запуске
    if (!matchesTable.querySelector('.weather_match')) {
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
        const th3 = document.createElement('td');
        th3.className = 'lh18 txtw';
        th3.style.whiteSpace = 'nowrap';
        th3.innerHTML = '<b>Зщт</b>';
        h.appendChild(th3);
      });

      // Кнопка «Обновить» рядом с таблицей
      const refreshBtn = document.createElement('button');
      refreshBtn.textContent = '🔄 Обновить Пгд/Нпд/Зщт';
      refreshBtn.style.cssText = 'margin:6px 0; padding:3px 10px; cursor:pointer; font-size:11px; border:1px solid #009900; background:#f0fff0; border-radius:3px;';
      refreshBtn.onclick = () => {
        clearMatchCache();
        // Очищаем старые данные из ячеек
        matchesTable.querySelectorAll('.weather_match').forEach(td => { td.innerHTML = ''; td.removeAttribute('title'); });
        matchesTable.querySelectorAll('.fwds_match').forEach(td => { td.textContent = ''; td.style.backgroundColor = ''; });
        matchesTable.querySelectorAll('.def_match').forEach(td => { td.textContent = ''; });
        enhanceRosterMatchesPage(true);
      };
      matchesTable.parentNode.insertBefore(refreshBtn, matchesTable);
    }

    let stageIndex = -1;
    const headerTds = headers[0]?.querySelectorAll('td');
    if (headerTds) {
      for (let i = 0; i < headerTds.length; i++) {
        if (/Стадия/i.test(headerTds[i].textContent)) { stageIndex = i; break; }
      }
    }
    if (stageIndex === -1) { console.warn('[RosterMatches] stageIndex not found'); return; }

    const cache = forceRefresh ? {} : getMatchCache();
    const jobs = [];
    const rows = Array.from(matchesTable.querySelectorAll('tr')).filter(tr => tr.getAttribute('bgcolor') !== '#006600');
    console.log(`[RosterMatches] candidate rows: ${rows.length}`);
    rows.forEach(tr => {
      if (tr.getAttribute('bgcolor') && tr.getAttribute('bgcolor').toUpperCase() === '#FFEEEE') return;
      if (tr.querySelector('table')) return;
      const tds = tr.querySelectorAll('td');
      if (tds.length <= stageIndex + 1) return;
      const resultTd = tds[stageIndex + 1];
      if (!resultTd.hasAttribute('title')) return;
      if (resultTd.getAttribute('title').trim() === 'Матч ещё не сыгран') return;

      // Находим или создаём ячейки
      let tdWeather = tr.querySelector('.weather_match');
      let tdFwds = tr.querySelector('.fwds_match');
      let tdDef = tr.querySelector('.def_match');
      if (!tdWeather) {
        tdWeather = document.createElement('td');
        tdWeather.className = 'lh16 txt weather_match';
        tdWeather.style.textAlign = 'center';
        tr.appendChild(tdWeather);
      }
      if (!tdFwds) {
        tdFwds = document.createElement('td');
        tdFwds.className = 'lh16 txt fwds_match';
        tdFwds.style.textAlign = 'center';
        tr.appendChild(tdFwds);
      }
      if (!tdDef) {
        tdDef = document.createElement('td');
        tdDef.className = 'lh16 txt def_match';
        tdDef.style.textAlign = 'center';
        tr.appendChild(tdDef);
      }

      let matchLink = null;
      for (let i = 0; i < tds.length; i++) {
        const a = tds[i].querySelector('a[href*="viewmatch.php"]');
        if (a) { matchLink = a.href; break; }
      }
      if (!matchLink) return;

      const is_home = tds[5]?.innerText.trim() === "Д";

      // Проверяем кэш (invalidate if missing new fields)
      const cached = cache[matchLink];
      if (cached && cached.defHome !== undefined) {
        console.log(`[RosterMatches] cache hit: ${matchLink}`);
        if (cached.weather) {
          const icon = setWeatherIcon(cached.weather);
          const koef = WEATHER_SET[cached.weather]?.koef ?? '';
          const title = koef ? `${cached.weather} (Кф: ${koef})` : cached.weather;
          tdWeather.innerHTML = `<img src="${icon}" style="height:14px" alt="${cached.weather}">`;
          tdWeather.title = title;
        }
        const fwds = is_home ? cached.fwdsHome : cached.fwdsAway;
        if (fwds !== null && fwds !== undefined) {
          tdFwds.textContent = fwds;
          tdFwds.style.backgroundColor = fwds > 3 ? "#ffe0e0" : "#e0ffe0";
        } else {
          tdFwds.textContent = "N/A";
        }
        const def = is_home ? cached.defHome : cached.defAway;
        if (def) {
          tdDef.textContent = def;
          tdDef.style.backgroundColor = def === 'з' ? '#ffe0e0' : '#e0ffe0';
        }
      } else {
        jobs.push({ url: matchLink, is_home, weatherCell: tdWeather, fwdsCell: tdFwds, defCell: tdDef });
      }
    });
    console.log(`[RosterMatches] cache hits: ${rows.length - jobs.length}, jobs to fetch: ${jobs.length}`);
    if (jobs.length) {
      const MAX_PARALLEL = 3;
      const MAX_RETRIES = 2;
      const DELAY_MS = 300;
      let active = 0;
      const queue = jobs.map(j => ({ ...j, retries: 0 }));
      function work() {
        while (active < MAX_PARALLEL && queue.length) {
          const job = queue.shift();
          active++;
          httpGet(job.url, (err, html) => {
            console.log(`[RosterMatches] fetched ${job.url}, err=${!!err}, html=${!!html}, retry=${job.retries}`);
            if (html) {
              const data = parseMatchData(html);
              // Кэшируем
              setMatchCache(job.url, data.weather, data.fwdsHome, data.fwdsAway, data.defHome, data.defAway);
              // Погода
              if (data.weather) {
                const icon = setWeatherIcon(data.weather);
                const koef = WEATHER_SET[data.weather]?.koef ?? '';
                const title = koef ? `${data.weather} (Кф: ${koef})` : data.weather;
                job.weatherCell.innerHTML = `<img src="${icon}" style="height:14px" alt="${data.weather}">`;
                job.weatherCell.title = title;
              }
              // Нападающие
              const fwds = job.is_home ? data.fwdsHome : data.fwdsAway;
              if (fwds !== null) {
                job.fwdsCell.textContent = fwds;
                job.fwdsCell.style.backgroundColor = fwds > 3 ? "#ffe0e0" : "#e0ffe0";
              } else {
                job.fwdsCell.textContent = "N/A";
              }
              // Тип защиты
              const def = job.is_home ? data.defHome : data.defAway;
              if (def) {
                job.defCell.textContent = def;
                job.defCell.style.backgroundColor = def === 'з' ? '#ffe0e0' : '#e0ffe0';
              }
            } else if (job.retries < MAX_RETRIES) {
              job.retries++;
              console.log(`[RosterMatches] retry #${job.retries} for ${job.url}`);
              queue.push(job);
            } else {
              job.fwdsCell.textContent = "Err";
              job.weatherCell.textContent = "—";
            }
            active--;
            setTimeout(work, DELAY_MS);
          });
        }
      }
      work();
    }
  }

  function cleanOpponentNames() {
    try {
    var FED = {
      'Австралия':1,'Австрия':2,'Азербайджан':3,'Албания':4,'Алжир':5,
      'Американские Виргинские о-ва':218,'Американское Самоа':206,'Ангилья':214,
      'Англия':6,'Ангола':7,'Андорра':8,'Антигуа и Барбуда':190,
      'Аргентина':10,'Армения':11,'Аруба':188,'Афганистан':12,
      'Багамские о-ва':192,'Бангладеш':13,'Барбадос':14,'Бахрейн':15,
      'Беларусь':16,'Белиз':17,'Бельгия':18,'Бенин':22,
      'Бермудские о-ва':19,'Болгария':20,'Боливия':21,'Босния и Герцеговина':23,
      'Ботсвана':24,'Бразилия':25,'Британские Виргинские о-ва':195,'Бруней':26,
      'Буркина Фасо':27,'Буркина-Фасо':27,'Бурунди':28,'Бутан':198,'Вануату':29,
      'Венгрия':30,'Венесуэла':31,'Восточный Тимор':215,'Вьетнам':181,
      'Габон':32,'Гаити':184,'Гайана':37,'Гамбия':33,
      'Гана':34,'Гваделупа':35,'Гватемала':36,'Гвиана':220,
      'Гвинея':38,'Гвинея-Бисау':39,'Германия':40,'Гибралтар':41,
      'Гондурас':43,'Гонконг':44,'Гренада':45,'Греция':47,
      'Грузия':48,'Гуам':182,'Дания':49,'Джибути':51,
      'Доминика':52,'Доминиканская Республика':185,'ДР Конго':54,'Египет':53,
      'Замбия':55,'Зимбабве':56,'Израиль':57,'Индия':179,
      'Индонезия':58,'Иордания':59,'Ирак':60,'Иран':61,
      'Ирландия':62,'Исландия':63,'Испания':64,'Италия':65,
      'Йемен':66,'Кабо-Верде':67,'Казахстан':68,'Каймановы о-ва':186,
      'Камбоджа':69,'Камерун':70,'Канада':71,'Катар':72,
      'Кения':73,'Кипр':74,'Китай':75,'КНДР':130,
      'Колумбия':76,'Коморские о-ва':209,'Конго':77,'Коста-Рика':78,
      "Кот-д'Ивуар":79,'Кот-Дивуар':79,'Куба':80,'Кувейт':81,'Кыргызстан':82,
      'Кюрасао':9,'Лаос':83,'Латвия':84,'Лесото':85,
      'Либерия':86,'Ливан':87,'Ливия':88,'Литва':89,
      'Лихтенштейн':90,'Люксембург':91,'Маврикий':199,'Мавритания':92,
      'Мадагаскар':93,'Макао':210,'Малави':95,'Малайзия':96,
      'Мали':97,'Мальдивы':98,'Мальта':99,'Марокко':100,
      'Мартиника':204,'Мексика':101,'Мозамбик':103,'Молдова':104,
      'Монголия':106,'Монтсеррат':216,'Мьянма':183,'Намибия':107,
      'Непал':108,'Нигер':109,'Нигерия':110,'Нидерланды':42,
      'Никарагуа':111,'Новая Зеландия':113,'Новая Каледония':205,'Норвегия':114,
      'О-ва Кука':115,'ОАЭ':178,'Оман':116,'Пакистан':117,
      'Палестина':211,'Панама':118,'Папуа Новая Гвинея':112,'Парагвай':119,
      'Перу':120,'Польша':121,'Португалия':122,'Пуэрто-Рико':123,
      'Реюньон':208,'Россия':124,'Руанда':125,'Румыния':126,
      'Сальвадор':127,'Самоа':196,'Сан-Марино':128,
      'Саудовская Аравия':129,'Северная Ирландия':131,'Северная Македония':94,
      'Сейшельские о-ва':180,'Сенегал':132,'Сент-Винсент':133,
      'Сент-Винсент и Гренадины':133,'Сент-Китс и Невис':187,'Сент-Люсия':194,
      'Сербия':174,'Сингапур':134,'Сирия':135,'Словакия':136,
      'Словения':137,'Соломоновы о-ва':200,'Сомали':138,'Судан':139,
      'Суринам':140,'США':141,'Сьерра Леоне':142,'Таджикистан':143,
      'Таиланд':145,'Таити':201,'Тайвань':212,'Танзания':146,
      'Теркс и Кайкос':213,'Того':147,'Тонга':202,'Тринидад и Тобаго':148,
      'Тувалу':219,'Тунис':149,'Туркменистан':150,'Турция':151,
      'Уганда':152,'Узбекистан':153,'Украина':154,'Уругвай':155,
      'Уэльс':156,'Фареры':157,'Фиджи':191,'Филиппины':158,
      'Финляндия':159,'Франция':160,'Хорватия':161,'ЦАР':162,
      'Чад':193,'Черногория':189,'Чехия':163,'Чили':164,
      'Швейцария':165,'Швеция':166,'Шотландия':167,'Шри Ланка':168,'Шри-Ланка':168,
      'Эквадор':169,'Экваториальная Гвинея':203,'Эритрея':170,'Эсватини':197,
      'Эстония':171,'Эфиопия':172,'ЮАР':173,'Южная Корея':175,
      'Южный Судан':217,'Ямайка':176,'Япония':177,'Бонэйр':195,
      'Амер. Виргины':218,'Экв. Гвинея':203
    };
    var FED_GEN = {
      'России':124,'Украины':154,'Беларуси':16,'Польши':121,'Германии':40,
      'Франции':160,'Испании':64,'Италии':65,'Англии':6,'Португалии':122,
      'Нидерландов':42,'Бельгии':18,'Швеции':166,'Норвегии':114,'Дании':49,
      'Финляндии':159,'Чехии':163,'Словакии':136,'Австрии':2,'Швейцарии':165,
      'Хорватии':161,'Сербии':174,'Греции':47,'Турции':151,'Румынии':126,
      'Болгарии':20,'Венгрии':30,'Шотландии':167,'Ирландии':62,'Исландии':63,
      'Словении':137,'Боснии и Герцеговины':23,'Черногории':189,'Северной Македонии':94,
      'Албании':4,'Литвы':89,'Латвии':84,'Эстонии':171,'Молдовы':104,
      'Грузии':48,'Армении':11,'Азербайджана':3,'Кипра':74,'Люксембурга':91,
      'Мальты':99,'Казахстана':68,'Бразилии':25,'Аргентины':10,'Мексики':101,
      'Колумбии':76,'Уругвая':155,'Парагвая':119,'Эквадора':169,'Венесуэлы':31,
      'Боливии':21,'Канады':71,'Коста-Рики':78,'Панамы':118,'Гондураса':43,
      'Сальвадора':127,'Ямайки':176,'Гватемалы':36,'Кубы':80,
      'Тринидада и Тобаго':148,'Суринама':140,'Гайаны':37,'Белиза':17,
      'Барбадоса':14,'Гренады':45,'Доминики':52,'Монтсеррата':216,'Арубы':188,
      'Мартиники':204,'Гваделупы':35,'Японии':177,'Южной Кореи':175,'Китая':75,
      'Ирана':61,'Саудовской Аравии':129,'Австралии':1,'Узбекистана':153,
      'Ирака':60,'Катара':72,'Таиланда':145,'Вьетнама':181,'Индии':179,
      'Индонезии':58,'Малайзии':96,'Сингапура':134,'Филиппин':158,
      'Бахрейна':15,'Иордании':59,'Омана':116,'Кувейта':81,'Сирии':135,
      'Палестины':211,'Ливана':87,'Кыргызстана':82,'Таджикистана':143,
      'Туркменистана':150,'Монголии':106,'Камбоджи':69,'Лаоса':83,
      'Непала':108,'Бангладеша':13,'Шри-Ланки':168,'Тайваня':212,
      'Гонконга':44,'Папуа Новой Гвинеи':112,'Тонги':202,'Египта':53,
      'Нигерии':110,'Камеруна':70,'Ганы':34,"Кот-д'Ивуара":79,
      'Сенегала':132,'Туниса':149,'Алжира':5,'Замбии':55,'Кении':73,
      'Уганды':152,'Танзании':146,'Мозамбика':103,'Эфиопии':172,'Анголы':7,
      'Габона':32,'Гвинеи':38,'Ливии':88,'Мадагаскара':93,
      'Новой Зеландии':113,'Израиля':57,'Уэльса':156,'Северной Ирландии':131,
      'Пакистана':117,'Эритреи':170,'Реюньона':208,'Гвинеи-Бисау':39,'Амер. Виргин':218,'Экв. Гвинеи':203, 'Амер. Виргин':218
    };
    function makeFlagImg(fedId, country) {
      var img = document.createElement('img');
      img.src = '/cntr/' + fedId + '.gif';
      img.title = country;
      img.alt = '';
      img.style.cssText = 'vertical-align:top; margin:3px 3px 0 0; width:20px; height:14px; border:0';
      return img;
    }
    var homeFedId = null;
    var champLinks = document.querySelectorAll('a[title*="Чемпионат"]');
    for (var ci = 0; ci < champLinks.length; ci++) {
      var champMatch = champLinks[ci].getAttribute('title').match(/Чемпионат\s+(.+?),/);
      if (champMatch) {
        var fid = FED[champMatch[1].trim()] || FED_GEN[champMatch[1].trim()];
        if (fid) { homeFedId = fid; break; }
      }
    }
    var matchesTable = null;
    var tables = document.querySelectorAll('table.tbl');
    for (var ti = 0; ti < tables.length; ti++) {
      var header = tables[ti].querySelector('tr[bgcolor="#006600"]');
      if (header && /Дата/i.test(header.textContent)) { matchesTable = tables[ti]; break; }
    }
    if (!matchesTable) return;
    var links = matchesTable.querySelectorAll('a[href*="roster.php"]');
    if (!links || !links.length) return;
    // Left-align opponent cells and remove empty spacer divs
    for (var li = 0; li < links.length; li++) {
      var td = links[li].closest('td');
      if (td) {
        td.style.textAlign = 'left';
        var spacers = td.querySelectorAll('div[style*="float:left"][style*="width:16px"]');
        for (var si = spacers.length - 1; si >= 0; si--) spacers[si].remove();
      }
    }
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      if (link.previousElementSibling && link.previousElementSibling.tagName === 'IMG' &&
          link.previousElementSibling.src && link.previousElementSibling.src.includes('/cntr/')) continue;
      var text = link.textContent.trim();
      var match = text.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
      var teamName, fedId;
      if (match) {
        teamName = match[1].trim();
        var parts = match[2].trim().split(',');
        fedId = FED[parts[parts.length - 1].trim()];
        if (fedId) {
          // Country found in brackets — remove brackets, show foreign flag
          link.textContent = teamName;
        } else {
          // Brackets contain city, not country — keep text, use home flag
          teamName = text;
          fedId = homeFedId;
        }
      } else {
        teamName = text;
        fedId = homeFedId;
      }
      if (fedId) {
        var countryName = '';
        for (var key in FED) { if (FED[key] === fedId) { countryName = key; break; } }
        link.parentNode.insertBefore(makeFlagImg(fedId, countryName), link);
      }
    }
    } catch (e) {
      console.error('[cleanOpponentNames] error:', e);
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
    const THRESHOLD = 10;
    
    if (sunnySum >= THRESHOLD && sunnySum > rainySum) return '☀️';
    if (rainySum >= THRESHOLD && rainySum > sunnySum) return '🌧️';
    if (sunnySum >= THRESHOLD && rainySum >= THRESHOLD) return sunnySum > rainySum ? '☀️' : '🌧️';
    
    return '';
  }

  // Функция для извлечения спецвозможностей из plrdat
  function extractAbilities(html) {
    // Find plrdat using bracket matching (regex fails on large arrays with ]; inside strings)
    const startMatch = html.match(/var plrdat\s*=\s*\[/);
    if (!startMatch) return null;
    
    const startIdx = startMatch.index + startMatch[0].length;
    let depth = 1;
    let endIdx = startIdx;
    for (let i = startIdx; i < html.length && depth > 0; i++) {
      if (html[i] === '[') depth++;
      else if (html[i] === ']') depth--;
      if (depth === 0) endIdx = i;
    }
    if (endIdx <= startIdx) return null;
    
    try {
      const plrdatText = html.substring(startIdx, endIdx);
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
    } catch (e) {
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
    
    httpGet(url, (err, html) => {
      if (err || !html) { callback(''); return; }
      const abilities = extractAbilities(html);
      if (abilities) {
        const sunnySum = abilities.д + abilities.пк + abilities.км;
        const rainySum = abilities.г + abilities.ск + abilities.пд;
        const school = detectSchool(sunnySum, rainySum);
        setSchoolCache(teamId, school);
        callback(school);
      } else {
        callback('');
      }
    });
  }

  // Кэш данных матчей (погода + Нпд)
  const MATCH_CACHE_KEY = 'vsol_match_data';
  const MATCH_CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 1 день

  function getMatchCache() {
    try {
      const cached = localStorage.getItem(MATCH_CACHE_KEY);
      if (!cached) return {};
      const data = JSON.parse(cached);
      const now = Date.now();
      Object.keys(data).forEach(key => {
        if (now - data[key].time > MATCH_CACHE_EXPIRY) delete data[key];
      });
      return data;
    } catch { return {}; }
  }

  function setMatchCache(matchUrl, weather, fwdsHome, fwdsAway, defHome, defAway) {
    try {
      const cache = getMatchCache();
      cache[matchUrl] = { weather, fwdsHome, fwdsAway, defHome, defAway, time: Date.now() };
      localStorage.setItem(MATCH_CACHE_KEY, JSON.stringify(cache));
    } catch {}
  }

  function clearMatchCache() {
    try { localStorage.removeItem(MATCH_CACHE_KEY); } catch {}
  }

  // Парсинг одного матча: погода + Нпд для обеих сторон
  function parseMatchData(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const weather = parseWeatherFromMatch(html);
    const fwdsHome = parseFwdsFromHtml(doc, true);
    const fwdsAway = parseFwdsFromHtml(doc, false);
    const defHome = parseDefenseType(doc, true);
    const defAway = parseDefenseType(doc, false);
    return { weather, fwdsHome, fwdsAway, defHome, defAway };
  }

  // Предзагрузка матчей при открытии roster.php
  function prefetchMatchData() {
    const teamNum = (location.search.match(/num=(\d+)/) || [])[1];
    if (!teamNum) return;

    // Загружаем roster_m.php этой команды
    const url = `${SITE_CONFIG.BASE_URL}/roster_m.php?num=${teamNum}`;
    console.log(`[Prefetch] Загружаем roster_m для team=${teamNum}`);

    httpGet(url, (err, html) => {
      if (err || !html) { console.warn('[Prefetch] Ошибка загрузки roster_m'); return; }

      const doc = new DOMParser().parseFromString(html, 'text/html');
      const allRows = Array.from(doc.querySelectorAll('table.tbl tr'));

      // Ищем индекс колонки «Стадия»
      let stageIndex = -1;
      const headerRow = doc.querySelector('table.tbl tr[bgcolor="#006600"]');
      if (headerRow) {
        const hCells = headerRow.querySelectorAll('td');
        for (let i = 0; i < hCells.length; i++) {
          if (/Стадия/i.test(hCells[i].textContent)) { stageIndex = i; break; }
        }
      }

      // Собираем ссылки на сыгранные матчи
      const matchLinks = [];
      const cache = getMatchCache();
      for (const row of allRows) {
        if (row.getAttribute('bgcolor') === '#006600') continue;
        if (row.getAttribute('bgcolor')?.toUpperCase() === '#FFEEEE') continue;
        if (row.querySelector('table')) continue;
        const tds = row.querySelectorAll('td');
        if (stageIndex >= 0 && tds.length > stageIndex + 1) {
          const resultTd = tds[stageIndex + 1];
          if (!resultTd?.hasAttribute('title')) continue;
          if (resultTd.getAttribute('title').trim() === 'Матч ещё не сыгран') continue;
        }
        for (const td of tds) {
          const a = td.querySelector('a[href*="viewmatch.php"]');
          if (a) {
            const href = a.href || a.getAttribute('href');
            const fullUrl = href.startsWith('http') ? href : `${SITE_CONFIG.BASE_URL}${href.startsWith('/') ? '' : '/'}${href}`;
            if (!cache[fullUrl]) matchLinks.push(fullUrl);
            break;
          }
        }
      }

      if (!matchLinks.length) {
        console.log('[Prefetch] Все матчи уже в кэше или нет сыгранных');
        return;
      }

      console.log(`[Prefetch] Матчей для загрузки: ${matchLinks.length}`);
      const MAX_PARALLEL = 2;
      const DELAY_MS = 500;
      let active = 0, done = 0;
      const queue = matchLinks.slice();

      function pump() {
        while (active < MAX_PARALLEL && queue.length) {
          const matchUrl = queue.shift();
          active++;
          httpGet(matchUrl, (e, mHtml) => {
            if (mHtml) {
              const data = parseMatchData(mHtml);
              setMatchCache(matchUrl, data.weather, data.fwdsHome, data.fwdsAway);
            }
            active--;
            done++;
            console.log(`[Prefetch] ${done}/${matchLinks.length} done`);
            setTimeout(pump, DELAY_MS);
          });
        }
      }
      pump();
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

  // Функция для добавления колонки "Школа" на странице teams_cntr.php (список команд федерации)
  function enhanceFederationTeamsPage() {
    const mainTables = document.querySelectorAll('table.tbl');
    if (!mainTables.length) return;

    let teamsTable = null;
    for (const t of mainTables) {
      const header = t.querySelector('tr[bgcolor="#006600"]');
      if (header && /Название команды/i.test(header.textContent)) { teamsTable = t; break; }
    }
    if (!teamsTable) return;

    // === Сводка ПЕРЕД таблицей — табличный формат ===
    const summary = document.createElement('table');
    summary.id = 'vsol-fed-summary';
    summary.className = 'tbl';
    summary.style.cssText = 'margin:6px auto; width:260px; font-size:12px; font-family:Arial,sans-serif; border-collapse:collapse;';
    summary.innerHTML =
      `<tbody>` +
      `<tr bgcolor="#006600"><td class="lh18 txtw" colspan="2" style="text-align:center; padding:4px 8px"><b>Школы команд (<span id="vsol-fed-done">0</span> из <span id="vsol-fed-total">0</span>)</b></td></tr>` +
      `<tr><td class="lh18 txtl" style="padding:3px 8px">☀️ Солнечная</td><td class="lh18 txtr" style="padding:3px 8px"><b id="vsol-fed-sun">0</b></td></tr>` +
      `<tr><td class="lh18 txtl" style="padding:3px 8px">🌧️ Дождевая</td><td class="lh18 txtr" style="padding:3px 8px"><b id="vsol-fed-rain">0</b></td></tr>` +
      `<tr><td class="lh18 txtl" style="padding:3px 8px">Неопределено</td><td class="lh18 txtr" style="padding:3px 8px"><b id="vsol-fed-none">0</b></td></tr>` +
      `<tr><td colspan="2" style="text-align:center; padding:4px 8px"><button id="vsol-fed-refresh" style="width:100%; padding:3px 0; cursor:pointer; font-size:11px; border:1px solid #009900; background:#f0fff0; border-radius:3px;">🔄 Пересчитать</button></td></tr>` +
      `</tbody>`;
    teamsTable.parentNode.insertBefore(summary, teamsTable);

    function runSchoolScan(forceRefresh) {
      // Добавляем заголовок «Шк» если ещё нет
      const headers = teamsTable.querySelectorAll('tr[bgcolor="#006600"]');
      if (!teamsTable.querySelector('.school-fed-header')) {
        headers.forEach(h => {
          const th = document.createElement('td');
          th.className = 'lh18 txtw qt school-fed-header';
          th.style.width = '25px';
          th.title = 'Школа команды';
          th.innerHTML = '<b>Шк</b>';
          h.appendChild(th);
        });
      }

      // Собираем строки команд
      const allRows = Array.from(teamsTable.querySelectorAll('tr')).filter(tr => !tr.getAttribute('bgcolor'));
      const jobs = [];

      allRows.forEach(row => {
        const rosterLink = row.querySelector('a[href*="roster.php?num="]');
        if (!rosterLink) return;
        const m = rosterLink.href.match(/num=(\d+)/);
        if (!m) return;
        const teamId = m[1];

        let cell = row.querySelector('.school-fed-cell');
        if (!cell) {
          cell = document.createElement('td');
          cell.className = 'lh18 txt school-fed-cell';
          cell.style.textAlign = 'center';
          row.appendChild(cell);
        }
        cell.textContent = '...';
        cell.style.backgroundColor = '';
        cell.removeAttribute('title');

        jobs.push({ teamId, cell });
      });

      if (!jobs.length) return;

      // Сбрасываем кэш при пересчёте
      if (forceRefresh) {
        try { localStorage.removeItem(CACHE_KEY); } catch {}
      }

      // Обновляем сводку
      const elSun = document.getElementById('vsol-fed-sun');
      const elRain = document.getElementById('vsol-fed-rain');
      const elNone = document.getElementById('vsol-fed-none');
      const elTotal = document.getElementById('vsol-fed-total');
      const elDone = document.getElementById('vsol-fed-done');
      const stats = { sun: 0, rain: 0, none: 0 };
      let done = 0;

      function updateSummary() {
        elSun.textContent = stats.sun;
        elRain.textContent = stats.rain;
        elNone.textContent = stats.none;
        elTotal.textContent = jobs.length;
        elDone.textContent = done;
      }
      updateSummary();

      const MAX_PARALLEL = 1;
      const DELAY_MS = 500;
      const MAX_RETRIES = 2;
      let active = 0;
      const queue = jobs.map(j => ({ ...j, retries: 0 }));

      function pump() {
        while (active < MAX_PARALLEL && queue.length) {
          const job = queue.shift();
          active++;
          fetchTeamSchool(job.teamId, (school) => {
            if (school === '' && job.retries < MAX_RETRIES) {
              // Пустой результат может быть таймаутом — retry
              job.retries++;
              queue.push(job);
              job.cell.textContent = `... (${job.retries})`;
            } else {
              job.cell.textContent = school || '-';
              if (school === '☀️') {
                job.cell.title = 'Солнечная школа (Д, Пк, Км)';
                job.cell.style.backgroundColor = '#fffacd';
                stats.sun++;
              } else if (school === '🌧️') {
                job.cell.title = 'Дождевая школа (Г, Ск, Пд)';
                job.cell.style.backgroundColor = '#e0f0ff';
                stats.rain++;
              } else {
                stats.none++;
              }
              done++;
              updateSummary();
            }
            active--;
            setTimeout(pump, DELAY_MS);
          });
        }
      }
      pump();
    }

    // Первый запуск — с кэшем
    runSchoolScan(false);

    // Кнопка «Пересчитать» — сброс кэша
    document.getElementById('vsol-fed-refresh').onclick = () => runSchoolScan(true);
  }

const href = location.href;
  console.log('[VSOL] href:', href);
  if (href.includes('/roster.php') && !href.includes('/roster_m.php') && !href.includes('/roster_s.php')) {
    prefetchMatchData();
  } else if (href.includes('/roster_m.php')) {
    cleanOpponentNames();
    enhanceRosterMatchesPage();
  } else if (href.includes('/roster_s.php')) {
    enhanceRosterStatsPage();
  } else if (href.includes('/managerzone.php')) {
    if (href.includes('pm=3')) {
      enhanceRosterStatsPage();
    } else if (href.includes('pm=2')) {
      cleanOpponentNames();
      enhanceRosterMatchesPage();
    }
  } else if (href.includes('/mng_asktoplay.php')) {
    enhanceAskToPlayPage();
  } else if (href.includes('/teams_cntr.php')) {
    enhanceFederationTeamsPage();
  } else if (href.includes('/realplayers.php')) {
    initPlayerParser();
  } else if (href.includes('/adm_baseplayers.php') && new URLSearchParams(window.location.search).get('nid')) {
    initPlayerParser();
    initBasePlayersCheck();
  } else if (location.hostname.includes('transfermarkt.')) {
    initTransfermarkt();
  } else if (href.includes('/fed_news.php')) {
    var _newsParams = new URLSearchParams(window.location.search);
    var _newsNationId = _newsParams.get('nation_id');
    if (_newsNationId) ensureNewsForm(_newsNationId);
    initFedNewsCalculatorTab(_newsNationId);
    initPlayedNationalTeamMatches();
    initNationalTeamMatches();
    initInterseasonCupResults();
    initLeagueTable();
    initContinentalCups(_newsNationId);
    initPlayedContinentalCupMatches(_newsNationId);
    initDivisionMatchComments(_newsNationId);
    initBBCodeToolbar();
  } else if (href.includes('/fed_news_edit.php')) {
    initBBCodeToolbar();
  } else if (href.includes('/federation.php')) {
    initAddNewsLink();
  } else if (href.includes('/manager_transflist.php') || href.includes('/manager_deltransf.php') || href.includes('/mng_transf.php')) {
    initTransferWatch();
  } else if (href.includes('/v2champ.php') || href.includes('/matchlist.php')) {
    initMatchCopyButtons();
  }

  // ========== Player Parser & Matcher (realplayers.php + transfermarkt) ==========

  function initPlayerParser() {
    // Remove position columns (И, GK..RF, V) ONLY on adm_baseplayers.php
    if (href.includes('/adm_baseplayers.php')) {
      removePositionColumns();
    }

    function removePositionColumns() {
      // Columns to hide: И(12), GK(13)..RF(22), V обновление(23) — visual column indices
      var COLS_TO_HIDE = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

      var headerRows = document.querySelectorAll('tr[bgcolor="#006600"]');
      if (!headerRows.length) return;
      var targetTable = headerRows[0].closest('table');
      if (!targetTable) return;

      var allRows = targetTable.querySelectorAll('tr');
      for (var ri = 0; ri < allRows.length; ri++) {
        var cells = allRows[ri].querySelectorAll(':scope > td');
        // Build visual-to-cell mapping (accounting for colspan)
        var visCol = 0;
        var cellVisStart = []; // cellVisStart[cellIdx] = first visual column of that cell
        for (var ci = 0; ci < cells.length; ci++) {
          cellVisStart[ci] = visCol;
          var cs = parseInt(cells[ci].getAttribute('colspan') || '1', 10);
          visCol += cs;
        }
        // Hide cells whose visual range overlaps with COLS_TO_HIDE
        for (var ci2 = 0; ci2 < cells.length; ci2++) {
          var cs2 = parseInt(cells[ci2].getAttribute('colspan') || '1', 10);
          var cellStart = cellVisStart[ci2];
          var cellEnd = cellStart + cs2 - 1;
          // Check if any of this cell's visual columns are in the hide list
          for (var vi = 0; vi < COLS_TO_HIDE.length; vi++) {
            if (COLS_TO_HIDE[vi] >= cellStart && COLS_TO_HIDE[vi] <= cellEnd) {
              cells[ci2].style.display = 'none';
              break;
            }
          }
        }
      }
    }

    function parseVSPlayers() {
      const players = [];
      const rows = document.querySelectorAll('#sortable tbody tr[id^="tr_"]');
      rows.forEach(row => {
        const playerId = row.querySelector('input[name="plr_id[]"]')?.value;
        const original = row.querySelector('input[name="orig_name[]"]')?.value || '';
        const link = row.querySelector('input[name="plr_linkvalue[]"]')?.value || '';
        if (playerId && playerId !== '0') {
          players.push({ id: playerId, original, link, row });
        }
      });
      return players;
    }

    function normalizeString(str) { return str.toLowerCase().trim().replace(/\s+/g, ' '); }

    function levenshteinDistance(a, b) {
      const m = a.length, n = b.length, d = [];
      for (let i = 0; i <= m; i++) d[i] = [i];
      for (let j = 0; j <= n; j++) d[0][j] = j;
      for (let i = 1; i <= m; i++)
        for (let j = 1; j <= n; j++)
          d[i][j] = a[i-1] === b[j-1] ? d[i-1][j-1] : Math.min(d[i-1][j-1], d[i][j-1], d[i-1][j]) + 1;
      return d[m][n];
    }

    function similarity(a, b) {
      const longer = a.length > b.length ? a : b;
      if (!longer.length) return 1;
      return (longer.length - levenshteinDistance(a, b)) / longer.length;
    }

    function findBestMatch(name, list, threshold = 0.85) {
      let best = null, bestScore = 0;
      list.forEach((c, i) => {
        const s = similarity(name, c);
        if (s > bestScore && s >= threshold) { bestScore = s; best = { name: c, index: i, score: s }; }
      });
      return best;
    }

    function compareAndHighlight() {
      const vsPlayers = parseVSPlayers();
      const tmData = GM_getValue('tmSavedPlayers', null);
      if (!tmData) { alert('Нет данных Transfermarkt! Сначала сохраните игроков на странице TM.'); return; }
      const tmPlayers = JSON.parse(tmData);

      // Build TM lookup by ID
      const tmById = {};
      tmPlayers.forEach(p => { if (p.tmId) tmById[p.tmId] = p; });
      const tmNames = tmPlayers.map(p => normalizeString(p.fullName));

      let notInTM = 0, similarMatches = 0, idMatches = 0;

      // Build set of VS player TM IDs for later "missing from VS" check
      const vsIds = new Set();

      vsPlayers.forEach(vp => {
        const origInput = vp.row.querySelector('input[name="orig_name[]"]');
        if (!origInput) return;
        origInput.style.fontWeight = ''; origInput.style.color = ''; origInput.title = '';

        // Try ID-based match first
        const vsTmId = (vp.link.match(/\/spieler\/(\d+)/) || [])[1];
        if (vsTmId) {
          vsIds.add(vsTmId);
          if (tmById[vsTmId]) {
            // Exact match by TM ID — player is confirmed present
            idMatches++;
            return;
          }
        }

        // Fall back to name matching
        if (!vp.original?.trim()) return;
        const vsName = normalizeString(vp.original);
        if (tmNames.some(t => t === vsName)) return;
        const sim = findBestMatch(vsName, tmNames, 0.75);
        if (sim) {
          origInput.style.fontWeight = 'bold'; origInput.style.color = '#FF8C00';
          origInput.title = `Похож на "${tmPlayers[sim.index].fullName}" (${Math.round(sim.score*100)}%)`;
          similarMatches++;
        } else {
          origInput.style.fontWeight = 'bold'; origInput.style.color = '#DC143C';
          origInput.title = 'Игрок не найден в Transfermarkt';
          notInTM++;
        }
      });

      // Find TM players missing from VS (not matched by ID or name)
      const vsOriginals = vsPlayers.map(p => normalizeString(p.original)).filter(o => o);
      const missing = tmPlayers.filter(tp => {
        // Skip if matched by ID
        if (tp.tmId && vsIds.has(tp.tmId)) return false;
        // Skip if matched by name
        const n = normalizeString(tp.fullName);
        if (vsOriginals.some(v => v === n)) return false;
        return !findBestMatch(n, vsOriginals, 0.85);
      });

      const filled = fillEmptyRows(missing);
      alert(`Сравнение:\n🔵 Совпадение по ID: ${idMatches}\n🔴 Нет в TM: ${notInTM}\n🟡 Похожие: ${similarMatches}\n🟢 Добавлено из TM: ${filled}\nВсего TM: ${tmPlayers.length}`);
    }

    function fillEmptyRows(missingPlayers) {
      const rows = document.querySelectorAll('#sortable tbody tr[id^="tr_"]');
      let count = 0;
      rows.forEach(row => {
        if (count >= missingPlayers.length) return;
        const pid = row.querySelector('input[name="plr_id[]"]')?.value;
        const orig = row.querySelector('input[name="orig_name[]"]')?.value || '';
        if ((pid === '0' || !pid) && !orig.trim()) {
          const p = missingPlayers[count];
          const inp = row.querySelector('input[name="orig_name[]"]');
          if (inp) {
            inp.value = p.fullName; inp.style.fontWeight = 'bold'; inp.style.color = '#228B22';
            inp.title = 'Добавлен из Transfermarkt';
            const linkInp = row.querySelector('input[name="plr_linkvalue[]"]');
            if (linkInp && p.profileUrl) {
              linkInp.value = p.profileUrl.startsWith('http') ? p.profileUrl : 'https://www.transfermarkt.world' + p.profileUrl;
            }
            count++;
          }
        }
      });
      return count;
    }

    // UI
    // Only show Compare button on realplayers.php (not adm_baseplayers.php)
    if (href.includes('/realplayers.php')) {
      const btnTable = document.querySelector('table.nil[align="center"]');
      if (btnTable) {
        const tr = btnTable.querySelector('tbody tr');
        if (tr) {
          const td = document.createElement('td');
          td.className = 'txt';
          const btn = document.createElement('a');
          btn.className = 'butn-orange'; btn.href = 'javascript:void(0)';
          btn.textContent = '🔍 Сравнить с ТМ';
          btn.onclick = e => { e.preventDefault(); compareAndHighlight(); };
          td.appendChild(btn);
          const last = tr.querySelector('td:last-child');
          tr.insertBefore(td, last);
        }
      }
      GM_registerMenuCommand('Сравнить с ТМ', compareAndHighlight);
    }
  }

  // ========== Base Players Check (adm_baseplayers.php) ==========

  function initBasePlayersCheck() {
    // Find the main table with team rows
    var headerRows = document.querySelectorAll('tr[bgcolor="#006600"]');
    if (!headerRows.length) return;
    var targetTable = headerRows[0].closest('table');
    if (!targetTable) return;

    // Add header columns for results
    for (var hi = 0; hi < headerRows.length; hi++) {
      var hTds = headerRows[hi].querySelectorAll('td');
      var lastTd = hTds[hTds.length - 1];

      var thNew = document.createElement('td');
      thNew.id = 'vsol-bp-col-new-header-' + hi;
      thNew.className = 'lh18 txtw';
      thNew.innerHTML = '<b>+ТМ</b>';
      thNew.title = 'Новые игроки на TM (нет в базе)';
      lastTd.parentNode.insertBefore(thNew, lastTd.nextSibling);

      var thGone = document.createElement('td');
      thGone.id = 'vsol-bp-col-gone-header-' + hi;
      thGone.className = 'lh18 txtw';
      thGone.innerHTML = '<b>-ТМ</b>';
      thGone.title = 'Ушедшие с TM (есть в базе, нет на TM)';
      thNew.parentNode.insertBefore(thGone, thNew.nextSibling);
    }

    // Add empty cells to all data rows + collect team info
    var allRows = targetTable.querySelectorAll('tr');
    var teams = [];
    for (var ri = 0; ri < allRows.length; ri++) {
      var row = allRows[ri];
      if (row.getAttribute('bgcolor') === '#006600') continue;
      var tds = row.querySelectorAll(':scope > td');
      if (tds.length < 10) continue;

      // Extract team num from realplayers.php link
      var rpLink = row.querySelector('a[href*="realplayers.php"]');
      if (!rpLink) continue;
      var numMatch = rpLink.getAttribute('href').match(/num=(\d+)/);
      if (!numMatch) continue;
      var teamNum = numMatch[1];

      // Extract TM URL from button onclick in the T column (td[9] visual)
      var tmBtn = row.querySelector('button.btn-tm');
      var tmUrl = '';
      if (tmBtn) {
        var onclick = tmBtn.getAttribute('onclick') || '';
        var urlMatch = onclick.match(/window\.open\('([^']+)'/);
        if (urlMatch) tmUrl = urlMatch[1];
      }

      // Add result cells
      var lastTd2 = tds[tds.length - 1];

      var tdNew = document.createElement('td');
      tdNew.id = 'vsol-bp-new-' + teamNum;
      tdNew.className = 'lh16 txt';
      tdNew.textContent = '-';
      tdNew.style.cssText = 'text-align:center;';
      lastTd2.parentNode.insertBefore(tdNew, lastTd2.nextSibling);

      var tdGone = document.createElement('td');
      tdGone.id = 'vsol-bp-gone-' + teamNum;
      tdGone.className = 'lh16 txt';
      tdGone.textContent = '-';
      tdGone.style.cssText = 'text-align:center;';
      tdNew.parentNode.insertBefore(tdGone, tdNew.nextSibling);

      teams.push({ teamNum: teamNum, tmUrl: tmUrl, tdNew: tdNew, tdGone: tdGone });
    }

    // Add "Check All" button
    var btnDiv = document.createElement('div');
    btnDiv.id = 'vsol-bp-check-div';
    btnDiv.style.cssText = 'margin:6px 0; padding:4px;';

    var checkBtn = document.createElement('a');
    checkBtn.id = 'vsol-bp-check-btn';
    checkBtn.href = 'javascript:void(0)';
    checkBtn.className = 'butn';
    checkBtn.textContent = 'Проверить все команды (TM)';
    checkBtn.onclick = function() { runCheck(); };
    btnDiv.appendChild(checkBtn);

    var refreshBtn = document.createElement('a');
    refreshBtn.id = 'vsol-bp-refresh-btn';
    refreshBtn.href = 'javascript:void(0)';
    refreshBtn.className = 'butn';
    refreshBtn.textContent = '🔄 Сбросить кэш';
    refreshBtn.style.marginLeft = '8px';
    refreshBtn.onclick = function() {
      teams.forEach(function(t) { try { localStorage.removeItem('vsol_bp_' + t.teamNum); } catch(e) {} });
      teams.forEach(function(t) { t.tdNew.textContent = '-'; t.tdNew.style.backgroundColor = ''; t.tdGone.textContent = '-'; t.tdGone.style.backgroundColor = ''; });
      alert('Кэш сброшен. Нажмите «Проверить все команды» для обновления.');
    };
    btnDiv.appendChild(refreshBtn);
    targetTable.parentNode.insertBefore(btnDiv, targetTable);

    var BP_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

    function getBpCache(teamNum) {
      try {
        var raw = localStorage.getItem('vsol_bp_' + teamNum);
        if (!raw) return null;
        var entry = JSON.parse(raw);
        if (Date.now() - entry.time > BP_CACHE_TTL) return null;
        return entry;
      } catch (e) { return null; }
    }

    function setBpCache(teamNum, newCount, goneCount) {
      try {
        localStorage.setItem('vsol_bp_' + teamNum, JSON.stringify({ newCount: newCount, goneCount: goneCount, time: Date.now() }));
      } catch (e) {}
    }

    function runCheck() {
      var teamsWithTM = teams.filter(function(t) { return t.tmUrl; });
      if (!teamsWithTM.length) { alert('Нет команд с TM-ссылками'); return; }

      checkBtn.textContent = 'Проверка 0/' + teamsWithTM.length + '...';
      var idx = 0;

      function checkNext() {
        if (idx >= teamsWithTM.length) {
          checkBtn.textContent = 'Проверить все команды (TM)';
          return;
        }

        var team = teamsWithTM[idx];
        idx++;
        checkBtn.textContent = 'Проверка ' + idx + '/' + teamsWithTM.length + '...';

        // Check cache first
        var cached = getBpCache(team.teamNum);
        if (cached) {
          team.tdNew.textContent = String(cached.newCount);
          team.tdNew.style.backgroundColor = cached.newCount > 0 ? '#FFCCCC' : '#CCFFCC';
          team.tdGone.textContent = String(cached.goneCount);
          team.tdGone.style.backgroundColor = cached.goneCount > 0 ? '#FFCCCC' : '#CCFFCC';
          checkNext(); // no delay for cached
          return;
        }

        // Step 1: fetch realplayers.php to get current base player TM IDs
        // Use GM_xmlhttpRequest to ensure full page access with proper session
        GM_xmlhttpRequest({
          method: 'GET',
          url: SITE_CONFIG.BASE_URL + '/realplayers.php?num=' + team.teamNum + '&sss=6',
          onload: function(response) {
            var htmlR = response.responseText;
            if (!htmlR || response.status !== 200) {
              team.tdNew.textContent = '⚠';
              team.tdGone.textContent = '⚠';
              setTimeout(checkNext, 1000);
              return;
            }

            // Parse spieler IDs from plrdata — filter by level=1 (основной состав)
            // Structure: ..., "tmLink", "origName", level, ...
            // Pattern: /spieler/{id}", "...", 1,  (level=1 after origName)
            var baseIds = new Set();
            var levelRegex = /\/spieler\/(\d+)",\s*"[^"]*",\s*(\d+)/g;
            var lm;
            while ((lm = levelRegex.exec(htmlR)) !== null) {
              var spielerId = lm[1];
              var level = parseInt(lm[2], 10);
              if (level === 1) baseIds.add(spielerId);
            }

            // Fallback: if no level-filtered results, get ALL spieler IDs
            if (baseIds.size === 0) {
              var allSpieler = htmlR.match(/\/spieler\/(\d+)/g) || [];
              var seenBase = {};
              for (var asi = 0; asi < allSpieler.length; asi++) {
                var asid = allSpieler[asi].replace('/spieler/', '');
                if (!seenBase[asid]) { seenBase[asid] = true; baseIds.add(asid); }
              }
            }
            console.log('[BaseCheck] team=' + team.teamNum + ' baseIds=' + baseIds.size + ' htmlLen=' + htmlR.length);

            // Step 2: fetch TM page to get current squad TM IDs
            var tmKaderUrl = team.tmUrl.replace('/startseite/', '/kader/');

            setTimeout(function() {
              GM_xmlhttpRequest({
                method: 'GET',
                url: tmKaderUrl,
                onload: function(tmResponse) {
                  if (tmResponse.status !== 200) {
                    team.tdNew.textContent = '⚠';
                    team.tdGone.textContent = '⚠';
                    setTimeout(checkNext, 1000);
                    return;
                  }

                  var tmIds = new Set();
                  var tmMatches = tmResponse.responseText.match(/\/profil\/spieler\/(\d+)/g) || [];
                  var seenTm = {};
                  for (var ti = 0; ti < tmMatches.length; ti++) {
                    var tmId = tmMatches[ti].replace('/profil/spieler/', '');
                    if (!seenTm[tmId]) { seenTm[tmId] = true; tmIds.add(tmId); }
                  }

                  var newCount = 0, goneCount = 0;
                  tmIds.forEach(function(id) { if (!baseIds.has(id)) newCount++; });
                  baseIds.forEach(function(id) { if (!tmIds.has(id)) goneCount++; });
                  console.log('[BaseCheck] team=' + team.teamNum + ' tmIds=' + tmIds.size + ' new=' + newCount + ' gone=' + goneCount);

                  setBpCache(team.teamNum, newCount, goneCount);
                  team.tdNew.textContent = String(newCount);
                  team.tdNew.style.backgroundColor = newCount > 0 ? '#FFCCCC' : '#CCFFCC';
                  team.tdGone.textContent = String(goneCount);
                  team.tdGone.style.backgroundColor = goneCount > 0 ? '#FFCCCC' : '#CCFFCC';

                  setTimeout(checkNext, 1000);
                },
                onerror: function() {
                  team.tdNew.textContent = '⚠';
                  team.tdGone.textContent = '⚠';
                  setTimeout(checkNext, 1000);
                }
              });
            }, 1000);
          },
          onerror: function() {
            team.tdNew.textContent = '⚠';
            team.tdGone.textContent = '⚠';
            setTimeout(checkNext, 1000);
          }
        });
      }

      checkNext();
    }
  }

  function initTransfermarkt() {
    function parseTMPlayers() {
      const players = [], seen = new Set();
      document.querySelectorAll('.items tbody tr').forEach(row => {
        const link = row.querySelector('td.posrela table.inline-table td.hauptlink a');
        if (!link) return;
        const name = link.textContent.trim();
        const profileUrl = link.getAttribute('href') || '';
        // Extract spieler ID from URL: .../profil/spieler/{id} or .../spieler/{id}
        const tmIdMatch = profileUrl.match(/\/spieler\/(\d+)/);
        const tmId = tmIdMatch ? tmIdMatch[1] : '';
        if (!tmId || seen.has(tmId)) return;
        seen.add(tmId);
        players.push({ fullName: name, profileUrl: profileUrl, tmId: tmId });
      });
      return players;
    }

    function saveTMPlayers() {
      const players = parseTMPlayers();
      GM_setValue('tmSavedPlayers', JSON.stringify(players));
      GM_setValue('tmSavedDate', new Date().toISOString());
      alert(`Сохранено ${players.length} игроков Transfermarkt`);
    }

    const table = document.querySelector('.responsive-table');
    if (table) {
      const div = document.createElement('div');
      div.style.cssText = 'margin:10px 0; padding:10px; background:#f0f0f0; border-radius:5px;';
      const btn = document.createElement('button');
      btn.textContent = '💾 Сохранить игроков TM';
      btn.style.cssText = 'padding:8px 16px; background:#4CAF50; color:white; border:none; border-radius:4px; cursor:pointer;';
      btn.onclick = e => { e.preventDefault(); saveTMPlayers(); };
      div.appendChild(btn);
      table.parentNode.insertBefore(div, table);
    }
    GM_registerMenuCommand('Сохранить игроков TM', () => { const p = parseTMPlayers(); GM_setValue('tmSavedPlayers', JSON.stringify(p)); GM_setValue('tmSavedDate', new Date().toISOString()); alert(`Сохранено ${p.length}`); });
  }

  // ========== Fed News Calculator Tab (fed_news.php) ==========

  function initFedNewsCalculatorTab(nationId) {
    if (!nationId) return;

    // Find News_Form
    var forms = document.querySelectorAll('form[action="/fed_news.php"]');
    var newsForm = null;
    for (var i = 0; i < forms.length; i++) {
      if (forms[i].querySelector('input[name="act"][value="save"]')) {
        newsForm = forms[i];
        break;
      }
    }
    if (!newsForm) return;

    // Create tab bar
    var tabBar = document.createElement('div');
    tabBar.id = 'vsol-tab-bar';
    tabBar.style.cssText = 'display:flex; margin-bottom:4px;';

    var tabNews = document.createElement('div');
    tabNews.id = 'vsol-tab-news';
    tabNews.textContent = 'Новость';
    tabNews.style.cssText = 'padding:4px 12px; cursor:pointer; border:1px solid #ccc; background:#f0f0f0;';

    var tabCalc = document.createElement('div');
    tabCalc.id = 'vsol-tab-calc';
    tabCalc.textContent = 'Калькулятор';
    tabCalc.style.cssText = 'padding:4px 12px; cursor:pointer; border:1px solid #ccc; background:#f0f0f0;';

    tabBar.appendChild(tabNews);
    tabBar.appendChild(tabCalc);

    // Insert tab bar immediately before News_Form
    newsForm.parentNode.insertBefore(tabBar, newsForm);

    // Create calculator panel (hidden) and insert after News_Form
    var calcPanel = document.createElement('div');
    calcPanel.id = 'vsol-calc-panel';
    calcPanel.style.display = 'none';

    newsForm.parentNode.insertBefore(calcPanel, newsForm.nextSibling);

    // Tab switching logic
    function activateTab(tabName) {
      if (tabName === 'news') {
        newsForm.style.display = '';
        calcPanel.style.display = 'none';
        tabNews.style.fontWeight = 'bold';
        tabNews.style.background = '#fff';
        tabNews.style.borderBottom = '1px solid #fff';
        tabCalc.style.fontWeight = 'normal';
        tabCalc.style.background = '#f0f0f0';
        tabCalc.style.borderBottom = '1px solid #ccc';
      } else if (tabName === 'calc') {
        newsForm.style.display = 'none';
        calcPanel.style.display = '';
        tabCalc.style.fontWeight = 'bold';
        tabCalc.style.background = '#fff';
        tabCalc.style.borderBottom = '1px solid #fff';
        tabNews.style.fontWeight = 'normal';
        tabNews.style.background = '#f0f0f0';
        tabNews.style.borderBottom = '1px solid #ccc';
      }
    }

    // ---- 8.1: idempotency flag ----
    var _calcLoaded = false;

    tabNews.addEventListener('click', function() { activateTab('news'); });
    tabCalc.addEventListener('click', function() {
      activateTab('calc');
      if (!_calcLoaded) { _calcLoaded = true; loadCalculatorData(nationId); }
    });

    // Activate «Новость» tab by default
    activateTab('news');

    // ---- Inlined parse helpers (copied from src/, no export) ----

    function parseDivisionLinks(html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var anchors = doc.querySelectorAll('a[href*="v2champ.php"]');
      var results = [];
      var seen = {};
      for (var i = 0; i < anchors.length; i++) {
        var a = anchors[i];
        var name = a.textContent.trim();
        // Skip empty names and purely numeric names (team position numbers in per-team rows)
        if (!name || /^\d+$/.test(name)) continue;
        var url = a.getAttribute('href') || '';
        var m = url.match(/[?&]num=(\d+)/);
        var divisionId = m ? m[1] : '';
        if (!divisionId || seen[divisionId]) continue;
        seen[divisionId] = true;
        results.push({ name: name, url: url, divisionId: divisionId });
      }
      return results;
    }

    function parseTourInfo(html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var anchors = doc.querySelectorAll('a[href*="tblshow=1&tour="]');
      var tours = [];
      var seen = {};
      var currentTour = 1;
      var foundRed = false;
      for (var i = 0; i < anchors.length; i++) {
        var a = anchors[i];
        var href = a.getAttribute('href') || '';
        var m = href.match(/[?&]tour=(\d+)/);
        if (!m) continue;
        var tourNum = parseInt(m[1], 10);
        if (seen[tourNum]) continue;
        seen[tourNum] = true;
        var font = a.querySelector('font[color="red"]');
        var isCurrent = font !== null;
        tours.push({ tourNum: tourNum, url: href, isCurrent: isCurrent });
        if (isCurrent && !foundRed) {
          currentTour = tourNum;
          foundRed = true;
        }
      }
      tours.sort(function(a, b) { return a.tourNum - b.tourNum; });
      if (!foundRed && tours.length > 0) currentTour = tours[tours.length - 1].tourNum;
      return { tours: tours, currentTour: currentTour };
    }

    function parseDivisionTable(html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var tables = doc.querySelectorAll('table.tbl');
      var targetTable = null;
      for (var t = 0; t < tables.length; t++) {
        var headerRow = tables[t].querySelector('tr[bgcolor="#006600"]');
        if (!headerRow) continue;
        var text = headerRow.textContent;
        if (text.includes('Команда') && text.includes('М')) {
          targetTable = tables[t];
          break;
        }
      }
      if (!targetTable) return null;
      var rows = [];
      var allRows = targetTable.querySelectorAll(':scope > tbody > tr, :scope > tr');
      for (var r = 0; r < allRows.length; r++) {
        var row = allRows[r];
        if (row.getAttribute('bgcolor') === '#006600') continue;
        var teamAnchor = row.querySelector('a[href*="roster.php"]');
        if (!teamAnchor) continue;
        var teamName = teamAnchor.textContent.trim();
        var teamLink = teamAnchor.getAttribute('href') || '';
        var posTable = row.querySelector('table.nil');
        var position = '';
        if (posTable) {
          var b = posTable.querySelector('b');
          if (b) position = b.textContent.trim();
        }
        var cells = row.querySelectorAll(':scope > td');
        var teamCellIndex = -1;
        for (var c = 0; c < cells.length; c++) {
          if (cells[c].querySelector('a[href*="roster.php"]')) { teamCellIndex = c; break; }
        }
        if (teamCellIndex < 0) continue;
        var games = cells[teamCellIndex + 1] ? cells[teamCellIndex + 1].textContent.trim() : '';
        var wins = cells[teamCellIndex + 2] ? cells[teamCellIndex + 2].textContent.trim() : '';
        var draws = cells[teamCellIndex + 3] ? cells[teamCellIndex + 3].textContent.trim() : '';
        var losses = cells[teamCellIndex + 4] ? cells[teamCellIndex + 4].textContent.trim() : '';
        var goalsCell = cells[teamCellIndex + 5];
        var goalsFor = '', goalsAgainst = '';
        if (goalsCell) {
          var goalsTds = goalsCell.querySelectorAll('table td');
          if (goalsTds.length >= 3) {
            goalsFor = goalsTds[0].textContent.trim();
            goalsAgainst = goalsTds[2].textContent.trim();
          }
        }
        var goalDiff = cells[teamCellIndex + 6] ? cells[teamCellIndex + 6].textContent.trim() : '';
        var points = cells[teamCellIndex + 7] ? cells[teamCellIndex + 7].textContent.trim() : '';
        var vs = cells[teamCellIndex + 8] ? cells[teamCellIndex + 8].textContent.trim() : '';
        var rm = cells[teamCellIndex + 10] ? cells[teamCellIndex + 10].textContent.trim() : '';
        // Movement: find go_up.gif / go_down.gif img anywhere in the row
        var movement = 'neutral';
        var moveImgs = row.querySelectorAll('img');
        for (var mi = 0; mi < moveImgs.length; mi++) {
          var msrc = moveImgs[mi].getAttribute('src') || '';
          if (msrc.indexOf('go_up.gif') !== -1) { movement = 'up'; break; }
          if (msrc.indexOf('go_down.gif') !== -1) { movement = 'down'; break; }
        }
        rows.push({ position: position, teamName: teamName, teamLink: teamLink,
          games: games, wins: wins, draws: draws, losses: losses,
          goalsFor: goalsFor, goalsAgainst: goalsAgainst, goalDiff: goalDiff,
          points: points, vs: vs, rm: rm, movement: movement });
      }
      if (rows.length === 0) return null;
      return { rows: rows };
    }

    function parseMatchList(html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var allRows = doc.querySelectorAll('tr');
      var results = [];
      var seenIds = {};
      for (var i = 0; i < allRows.length; i++) {
        var row = allRows[i];
        if (row.querySelector('a[href*="previewmatch.php"]')) continue;
        var viewmatchLink = row.querySelector('a[href*="viewmatch.php"]');
        if (!viewmatchLink) continue;
        var rosterLinks = row.querySelectorAll('a[href*="roster.php"]');
        if (rosterLinks.length < 2) continue;
        var href = viewmatchLink.getAttribute('href') || '';
        var matchIdMatch = href.match(/[?&]match_id=(\d+)/);
        var dayMatch = href.match(/[?&]day=(\d+)/);
        if (!matchIdMatch || !dayMatch) continue;
        var matchId = matchIdMatch[1];
        if (seenIds[matchId]) continue;
        seenIds[matchId] = true;
        var day = dayMatch[1];
        var homeTeam = rosterLinks[0].textContent.trim();
        var awayTeam = rosterLinks[1].textContent.trim();
        var homeUrl = rosterLinks[0].getAttribute('href') || '';
        var awayUrl = rosterLinks[1].getAttribute('href') || '';
        var scoreEl = viewmatchLink.querySelector('b');
        var score = scoreEl ? scoreEl.textContent.trim() : '';
        if (!homeTeam || !awayTeam || !score) continue;
        var matchUrl = SITE_CONFIG.BASE_URL + '/viewmatch.php?day=' + day + '&match_id=' + matchId;
        results.push({ matchId: matchId, day: day, homeTeam: homeTeam, awayTeam: awayTeam, homeUrl: homeUrl, awayUrl: awayUrl, score: score, matchUrl: matchUrl });
      }
      return results;
    }

    function parseMovement(row) {
      var imgs = row.querySelectorAll('img');
      for (var i = 0; i < imgs.length; i++) {
        var src = imgs[i].getAttribute('src') || '';
        if (src.indexOf('go_up.gif') !== -1) return 'up';
        if (src.indexOf('go_down.gif') !== -1) return 'down';
      }
      return 'neutral';
    }

    // ---- 8.2: renderDivisionSection ----

    function renderDivisionSection(divName, divId) {
      var section = document.createElement('div');
      section.id = 'vsol-div-section-' + divId;
      section.style.cssText = 'padding:8px;';

      var loading = document.createElement('div');
      loading.id = 'vsol-div-loading-' + divId;
      loading.textContent = 'Загрузка...';
      loading.style.cssText = 'color:#888; font-size:12px;';
      section.appendChild(loading);

      return section;
    }

    // ---- 8.4: renderDivisionTable ----

    function renderDivisionTable(tableData, divName, divId) {
      var table = document.createElement('table');
      table.className = 'tbl';
      table.id = 'vsol-div-table-' + divId;
      table.style.cssText = 'border-collapse:collapse; width:100%; font-size:12px; margin-bottom:6px;';

      var COL_KEYS = ['pos', 'move', 'team', 'games', 'wins', 'draws', 'losses', 'gf', 'ga', 'gd', 'pts', 'vs', 'rm'];
      var COL_LABELS = ['М', '↕', 'Команда', 'И', 'В', 'Н', 'П', 'М+', 'М-', '+/-', 'О', 'Vs', 'РМ'];

      // Header row
      var thead = document.createElement('thead');
      var headerRow = document.createElement('tr');
      headerRow.id = 'vsol-div-table-header-' + divId;
      headerRow.setAttribute('bgcolor', '#006600');
      for (var h = 0; h < COL_LABELS.length; h++) {
        var th = document.createElement('th');
        th.id = 'vsol-div-col-' + COL_KEYS[h] + '-' + divId;
        th.textContent = COL_LABELS[h];
        th.style.cssText = 'color:#fff; padding:2px 4px; text-align:center; white-space:nowrap;';
        headerRow.appendChild(th);
      }
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Data rows
      var tbody = document.createElement('tbody');
      var rows = tableData.rows;
      for (var r = 0; r < rows.length; r++) {
        var rowData = rows[r];
        var tr = document.createElement('tr');
        tr.id = 'vsol-div-table-row-' + divId + '-' + r;
        tr.style.background = r % 2 === 0 ? '#fff' : '#f5f5f5';

        var MOVE_EMOJI = { up: '🔼', down: '🔽', neutral: '➡️' };
        var movementEmoji = MOVE_EMOJI[rowData.movement] || '➡️';

        var cellValues = [
          rowData.position,
          movementEmoji,
          '', // team cell — special handling below
          rowData.games,
          rowData.wins,
          rowData.draws,
          rowData.losses,
          rowData.goalsFor,
          rowData.goalsAgainst,
          rowData.goalDiff,
          rowData.points,
          rowData.vs,
          rowData.rm
        ];

        for (var c = 0; c < cellValues.length; c++) {
          var td = document.createElement('td');
          td.id = 'vsol-div-cell-' + COL_KEYS[c] + '-' + divId + '-' + r;
          td.style.cssText = 'padding:2px 4px; text-align:center; white-space:nowrap;';
          if (c === 2) {
            // Team name cell — render as link
            td.style.textAlign = 'left';
            if (rowData.teamLink) {
              var a = document.createElement('a');
              var tl = rowData.teamLink;
              // Normalize: if relative (no protocol), make root-relative
              if (tl && !tl.startsWith('http')) {
                tl = '/' + tl.replace(/^\//, '');
              }
              a.href = tl;
              a.textContent = rowData.teamName;
              a.className = 'mnu';
              td.appendChild(a);
            } else {
              td.textContent = rowData.teamName;
            }
          } else {
            td.textContent = cellValues[c];
          }
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
      table.appendChild(tbody);
      return table;
    }

    // ---- 8.5: renderRoundSelector ----

    function renderRoundSelector(tourInfo, divId, selectedTour, onTourChange) {
      var wrapper = document.createElement('div');
      wrapper.id = 'vsol-div-tour-wrapper-' + divId;
      wrapper.style.cssText = 'margin-bottom:6px; font-size:12px;';

      var label = document.createElement('label');
      label.htmlFor = 'vsol-div-tour-sel-' + divId;
      label.textContent = 'Тур: ';
      wrapper.appendChild(label);

      var select = document.createElement('select');
      select.id = 'vsol-div-tour-sel-' + divId;

      var tours = tourInfo.tours;
      for (var i = 0; i < tours.length; i++) {
        var opt = document.createElement('option');
        opt.value = String(tours[i].tourNum);
        opt.textContent = 'Тур ' + tours[i].tourNum;
        if (tours[i].tourNum === selectedTour) opt.selected = true;
        select.appendChild(opt);
      }

      select.addEventListener('change', function() {
        var tourNum = parseInt(select.value, 10);
        if (typeof onTourChange === 'function') onTourChange(tourNum);
      });

      wrapper.appendChild(select);
      return wrapper;
    }

    // ---- 8.6: renderMatchList ----

    function renderMatchList(matches, divId) {
      console.log('[renderMatchList] divId=' + divId + ' matches=' + (matches ? matches.length : 0) + ' stack:', new Error().stack.split('\n').slice(1,4).join(' | '));
      var container = document.createElement('div');
      container.id = 'vsol-div-matches-' + divId;
      container.style.cssText = 'margin-top:6px;';

      if (!matches || matches.length === 0) {
        var empty = document.createElement('div');
        empty.id = 'vsol-div-matches-empty-' + divId;
        empty.textContent = 'Матчи не найдены';
        empty.style.cssText = 'color:#888; font-size:12px;';
        container.appendChild(empty);
        return container;
      }

      var table = document.createElement('table');
      table.setAttribute('border', '0');
      table.setAttribute('cellspacing', '0');
      table.setAttribute('cellpadding', '0');
      table.style.cssText = 'width:100%;';

      var tbody = document.createElement('tbody');
      table.appendChild(tbody);

      for (var i = 0; i < matches.length; i++) {
        var rows = renderMatchRow(matches[i], i);
        tbody.appendChild(rows.matchTr);
        tbody.appendChild(rows.detailsTr);
      }

      container.appendChild(table);
      return container;
    }

    // ---- 9.1: renderMatchRow ----

    // Returns { matchTr, detailsTr } — two <tr> elements for the match and its details
    function renderMatchRow(match, index) {
      // --- Match row: home (right) | score (center) | away (left) ---
      var matchTr = document.createElement('tr');
      matchTr.id = 'vsol-match-row-' + match.matchId;

      // Home team — right-aligned
      var tdHome = document.createElement('td');
      tdHome.id = 'vsol-match-home-' + match.matchId;
      tdHome.className = 'lh16 txtr';
      tdHome.setAttribute('nowrap', 'nowrap');
      tdHome.setAttribute('width', '45%');
      var homeLink = document.createElement('a');
      homeLink.className = 'mnu';
      homeLink.textContent = match.homeTeam;
      if (match.homeUrl) homeLink.href = '/' + match.homeUrl.replace(/^\//, '');
      tdHome.appendChild(homeLink);
      matchTr.appendChild(tdHome);

      // Score — centered, links to match page
      var tdScore = document.createElement('td');
      tdScore.id = 'vsol-match-score-' + match.matchId;
      tdScore.className = 'lh16 txtc';
      tdScore.setAttribute('width', '10%');
      tdScore.setAttribute('nowrap', 'nowrap');
      var scoreLink = document.createElement('a');
      scoreLink.id = 'vsol-match-link-' + match.matchId;
      scoreLink.href = match.matchUrl;
      scoreLink.target = '_blank';
      scoreLink.className = 'mnu';
      var scoreBold = document.createElement('b');
      scoreBold.textContent = match.score;
      scoreLink.appendChild(scoreBold);
      tdScore.appendChild(scoreLink);
      matchTr.appendChild(tdScore);

      // Away team — left-aligned
      var tdAway = document.createElement('td');
      tdAway.id = 'vsol-match-away-' + match.matchId;
      tdAway.className = 'lh16 txtl';
      tdAway.setAttribute('nowrap', 'nowrap');
      tdAway.setAttribute('width', '45%');
      var awayLink = document.createElement('a');
      awayLink.className = 'mnu';
      awayLink.textContent = match.awayTeam;
      if (match.awayUrl) awayLink.href = '/' + match.awayUrl.replace(/^\//, '');
      tdAway.appendChild(awayLink);
      matchTr.appendChild(tdAway);

      // --- Details row ---
      var detailsTr = document.createElement('tr');
      detailsTr.id = 'vsol-match-details-row-' + match.matchId;

      var detailsTd = document.createElement('td');
      detailsTd.setAttribute('colspan', '3');
      detailsTd.style.cssText = 'padding:0 0 4px 8px;';

      var detailsDiv = document.createElement('div');
      detailsDiv.id = 'vsol-match-details-' + match.matchId;
      detailsDiv.style.cssText = 'font-size:11px; color:#888;';
      detailsDiv.textContent = 'Загрузка...';

      detailsTd.appendChild(detailsDiv);
      detailsTr.appendChild(detailsTd);

      return { matchTr: matchTr, detailsTr: detailsTr };
    }

    // ---- 9.3: renderMatchDetails ----

    function renderMatchDetails(matchId, strength, events, comments, views) {
      var container = document.getElementById('vsol-match-details-' + matchId);
      if (!container) return;

      // Clear loading indicator
      container.textContent = '';

      // Strength block
      if (strength) {
        var strengthDiv = document.createElement('div');
        strengthDiv.id = 'vsol-match-strength-' + matchId;
        strengthDiv.style.cssText = 'margin-top:3px;';

        function renderStrengthRow(rowData) {
          if (!rowData) return null;

          var homeStronger = rowData.homeValue >= rowData.awayValue;
          // Home is always left (red), away is always right (green) — fixed layout
          var homeBg    = '#ff967e';
          var awayBg    = '#87e878';
          var homeColor = '#620';
          var awayColor = '#060';
          var diff = Math.abs(rowData.homeValue - rowData.awayValue);

          var outerTable = document.createElement('table');
          outerTable.setAttribute('width', '100%');
          outerTable.setAttribute('align', 'center');
          outerTable.setAttribute('cellspacing', '0');
          outerTable.setAttribute('cellpadding', '0');
          outerTable.style.cssText = 'margin:1px 0;';

          var innerTable = document.createElement('table');
          innerTable.className = 'tbl';
          innerTable.setAttribute('border', '1');
          innerTable.setAttribute('width', '100%');
          innerTable.setAttribute('align', 'left');

          var tr = document.createElement('tr');

          // Label cell — fixed 20%
          var labelTd = document.createElement('td');
          labelTd.id = 'vsol-match-strength-label-' + matchId + '-' + rowData.label.replace(/\s+/g, '');
          labelTd.height = '17';
          labelTd.className = 'lh16 txtl';
          labelTd.setAttribute('width', '20%');
          labelTd.textContent = rowData.label;
          tr.appendChild(labelTd);

          // Home cell — proportional share of remaining 80%
          var homeWidth = Math.round(rowData.homePercent * 0.8);
          var homeTd = document.createElement('td');
          homeTd.id = 'vsol-match-strength-home-' + matchId + '-' + rowData.label.replace(/\s+/g, '');
          homeTd.height = '17';
          homeTd.className = 'lh16 txtr';
          homeTd.setAttribute('width', homeWidth + '%');
          homeTd.setAttribute('bgcolor', homeBg);
          var homeStrong = document.createElement('strong');
          var homeFont = document.createElement('font');
          homeFont.setAttribute('color', homeColor);
          homeFont.textContent = String(rowData.homeValue);
          if (homeStronger && diff > 0) {
            var diffSpan = document.createElement('span');
            diffSpan.style.cssText = 'font-size:9px';
            diffSpan.textContent = '+' + diff;
            homeFont.appendChild(diffSpan);
          }
          homeStrong.appendChild(homeFont);
          homeTd.appendChild(homeStrong);
          tr.appendChild(homeTd);

          // Away cell — proportional share of remaining 80%
          var awayWidth = Math.round(rowData.awayPercent * 0.8);
          var awayTd = document.createElement('td');
          awayTd.id = 'vsol-match-strength-away-' + matchId + '-' + rowData.label.replace(/\s+/g, '');
          awayTd.height = '17';
          awayTd.className = 'lh16 txt';
          awayTd.setAttribute('width', awayWidth + '%');
          awayTd.setAttribute('bgcolor', awayBg);
          var awayStrong = document.createElement('strong');
          var awayFont = document.createElement('font');
          awayFont.setAttribute('color', awayColor);
          awayFont.textContent = String(rowData.awayValue);
          if (!homeStronger && diff > 0) {
            var diffSpan2 = document.createElement('span');
            diffSpan2.style.cssText = 'font-size:9px';
            diffSpan2.textContent = '+' + diff;
            awayFont.appendChild(diffSpan2);
          }
          awayStrong.appendChild(awayFont);
          awayTd.appendChild(awayStrong);
          tr.appendChild(awayTd);

          innerTable.appendChild(tr);
          var outerTd = document.createElement('td');
          outerTd.style.cssText = 'border:0';
          outerTd.appendChild(innerTable);
          var outerTr = document.createElement('tr');
          outerTr.appendChild(outerTd);
          outerTable.appendChild(outerTr);
          return outerTable;
        }

        var startLine = renderStrengthRow(strength.start);
        if (startLine) strengthDiv.appendChild(startLine);
        var endLine = renderStrengthRow(strength.end);
        if (endLine) strengthDiv.appendChild(endLine);

        container.appendChild(strengthDiv);
      }

      // Events block
      if (events && events.length > 0) {
        var eventsDiv = document.createElement('div');
        eventsDiv.id = 'vsol-match-events-' + matchId;
        eventsDiv.style.cssText = 'margin-top:3px;';

        for (var ei = 0; ei < events.length; ei++) {
          var ev = events[ei];
          var evLine = document.createElement('div');
          evLine.id = 'vsol-match-event-' + matchId + '-' + ei;
          evLine.style.cssText = 'margin:1px 0;';
          var evText = ev.minute + '\'' + ' ' + ev.playerName;
          if (ev.score) evText += ' (' + ev.score + ')';
          evLine.textContent = evText;
          eventsDiv.appendChild(evLine);
        }

        container.appendChild(eventsDiv);
      }

      // Comments block
      if (comments && comments.length > 0) {
        var commentsDiv = document.createElement('div');
        commentsDiv.id = 'vsol-match-comments-' + matchId;
        commentsDiv.style.cssText = 'margin-top:3px;';

        // Separate coach comments by side/timing and match comments
        var coachGrid = { home_before: null, away_before: null, home_after: null, away_after: null };
        var matchComments = [];

        for (var ci = 0; ci < comments.length; ci++) {
          var cm = comments[ci];
          if (cm.type === 'coach' && cm.side && cm.timing) {
            coachGrid[cm.side + '_' + cm.timing] = cm;
          } else {
            matchComments.push(cm);
          }
        }

        var hasCoach = coachGrid.home_before || coachGrid.away_before || coachGrid.home_after || coachGrid.away_after;

        // Render 2x2 coach grid if any coach comments exist
        if (hasCoach) {
          var coachTable = document.createElement('table');
          coachTable.id = 'vsol-match-coach-' + matchId;
          coachTable.setAttribute('width', '100%');
          coachTable.setAttribute('cellspacing', '0');
          coachTable.setAttribute('cellpadding', '2');

          function makeCoachCell(cm, idSuffix) {
            var td = document.createElement('td');
            td.id = 'vsol-match-coach-' + idSuffix + '-' + matchId;
            td.setAttribute('width', '50%');
            td.setAttribute('valign', 'top');
            td.style.cssText = 'font-size:11px; border:1px solid #eee; padding:3px;';
            if (cm) {
              var nickSpan = document.createElement('span');
              nickSpan.style.cssText = 'font-weight:bold; color:#444;';
              nickSpan.textContent = cm.nick + (cm.team ? ' (' + cm.team + ')' : '') + ': ';
              td.appendChild(nickSpan);
              td.appendChild(document.createTextNode(cm.text));
            } else {
              td.style.color = '#bbb';
              td.textContent = '—';
            }
            return td;
          }

          // Before row
          var hasBefore = coachGrid.home_before || coachGrid.away_before;
          if (hasBefore) {
            var trBefore = document.createElement('tr');
            trBefore.id = 'vsol-match-coach-before-' + matchId;
            trBefore.appendChild(makeCoachCell(coachGrid.home_before, 'home-before'));
            trBefore.appendChild(makeCoachCell(coachGrid.away_before, 'away-before'));
            coachTable.appendChild(trBefore);
          }

          // After row
          var hasAfter = coachGrid.home_after || coachGrid.away_after;
          if (hasAfter) {
            var trAfter = document.createElement('tr');
            trAfter.id = 'vsol-match-coach-after-' + matchId;
            trAfter.appendChild(makeCoachCell(coachGrid.home_after, 'home-after'));
            trAfter.appendChild(makeCoachCell(coachGrid.away_after, 'away-after'));
            coachTable.appendChild(trAfter);
          }

          commentsDiv.appendChild(coachTable);
        }

        // Render match comments full width
        for (var mi = 0; mi < matchComments.length; mi++) {
          var mc = matchComments[mi];
          var mcLine = document.createElement('div');
          mcLine.id = 'vsol-match-comment-' + matchId + '-' + mi;
          mcLine.style.cssText = 'margin:1px 0; font-size:11px;';
          var mcNick = document.createElement('span');
          mcNick.style.cssText = 'font-weight:bold; color:#444;';
          mcNick.textContent = (mc.nick || mc.managerNick || '') + ': ';
          mcLine.appendChild(mcNick);
          mcLine.appendChild(document.createTextNode(mc.text));
          commentsDiv.appendChild(mcLine);
        }

        container.appendChild(commentsDiv);
      }

      // Views block
      if (views) {
        var viewsDiv = document.createElement('div');
        viewsDiv.id = 'vsol-match-views-' + matchId;
        viewsDiv.style.cssText = 'margin-top:3px; color:#666;';

        var viewsText = 'Просмотров: ' + views.count;
        if (views.viewers && views.viewers.length > 0) {
          viewsText += ' (' + views.viewers.join(', ') + ')';
        }
        viewsDiv.textContent = viewsText;

        container.appendChild(viewsDiv);
      }
    }

    // ---- 9.2: loadMatchDetailsSequentially ----

    function loadMatchDetailsSequentially(matches) {
      console.log('[loadMatchDetailsSequentially] matches=' + (matches ? matches.length : 0) + ' ids=' + (matches ? matches.map(function(m){return m.matchId;}).join(',') : '') + ' stack:', new Error().stack.split('\n').slice(1,4).join(' | '));
      if (!matches || matches.length === 0) return;

      // Inline: parseMatchStrength
      function parseMatchStrength(html) {
        if (!html) return null;
        var doc = new DOMParser().parseFromString(html, 'text/html');

        function parseStrengthCell(td) {
          var valueText = '';
          for (var i = 0; i < td.childNodes.length; i++) {
            if (td.childNodes[i].nodeType === 3) valueText += td.childNodes[i].textContent;
          }
          var value = parseInt(valueText.trim(), 10);
          if (isNaN(value)) return null;
          var boldEl = td.querySelector('b');
          if (!boldEl) return null;
          var percent = parseInt(boldEl.textContent.trim().replace('%', ''), 10);
          if (isNaN(percent)) return null;
          return { value: value, percent: percent };
        }

        function parseStrengthRow(doc, labelText) {
          var allTds = doc.querySelectorAll('td');
          var labelTd = null;
          for (var i = 0; i < allTds.length; i++) {
            var td = allTds[i];
            var text = '';
            for (var j = 0; j < td.childNodes.length; j++) {
              if (td.childNodes[j].nodeType === 3) text += td.childNodes[j].textContent;
            }
            if (text.trim() === labelText) { labelTd = td; break; }
          }
          if (!labelTd) return null;
          var tr = labelTd.closest('tr');
          if (!tr) return null;
          var rdl = tr.querySelector('td.rdl');
          var gdl = tr.querySelector('td.gdl');
          if (!rdl || !gdl) return null;
          var homeData = parseStrengthCell(rdl);
          var awayData = parseStrengthCell(gdl);
          if (!homeData || !awayData) return null;
          return {
            label: labelText,
            homeValue: homeData.value,
            homePercent: homeData.percent,
            awayValue: awayData.value,
            awayPercent: awayData.percent,
            diff: awayData.value - homeData.value
          };
        }

        var startRow = parseStrengthRow(doc, 'Сила в начале матча');
        var endRow = parseStrengthRow(doc, 'Сила в конце матча');
        if (!startRow && !endRow) return null;
        return { start: startRow, end: endRow };
      }

      // Inline: parseMatchEvents
      function parseMatchEvents(html) {
        if (!html) return [];
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var rows = doc.querySelectorAll('tr[bgcolor="#c9f2c5"], tr[bgcolor="#eddac7"]');
        var events = [];

        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          var tds = row.querySelectorAll('td');
          if (tds.length === 0) continue;

          // Detect event type
          var type = null;
          var titleMap = { 'Гол': 'goal', 'Желтая карточка': 'yellow', 'Красная карточка': 'red', 'Замена': 'sub' };
          var imgs = row.querySelectorAll('img[title]');
          for (var ii = 0; ii < imgs.length; ii++) {
            var t = imgs[ii].getAttribute('title') || '';
            if (titleMap[t]) { type = titleMap[t]; break; }
          }
          if (!type) {
            var tdTitles = row.querySelectorAll('td[title]');
            for (var jj = 0; jj < tdTitles.length; jj++) {
              var tt = tdTitles[jj].getAttribute('title') || '';
              if (titleMap[tt]) { type = titleMap[tt]; break; }
            }
          }
          if (type !== 'goal') continue;

          var minute = tds[0].textContent.trim();
          if (!minute) minute = '?';
          var playerLinks = row.querySelectorAll('a.mnu');
          if (playerLinks.length === 0) continue;
          var playerName = playerLinks[0].textContent.trim();
          if (!playerName) continue;
          var score = tds[tds.length - 1].textContent.trim();

          events.push({ type: 'goal', minute: minute, playerName: playerName, score: score || undefined });
        }

        events.sort(function(a, b) {
          var pa = a.minute.split('+'); var pb = b.minute.split('+');
          var va = (parseInt(pa[0], 10) || 0) + (pa[1] ? (parseInt(pa[1], 10) || 0) * 0.01 : 0);
          var vb = (parseInt(pb[0], 10) || 0) + (pb[1] ? (parseInt(pb[1], 10) || 0) * 0.01 : 0);
          return va - vb;
        });
        return events;
      }

      // Inline: parseMatchComments
      function parseMatchComments(html) {
        if (!html) return [];
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var results = [];

        function findNextTobl(headingText) {
          var bolds = doc.querySelectorAll('b');
          for (var bi = 0; bi < bolds.length; bi++) {
            if (bolds[bi].textContent.indexOf(headingText) === -1) continue;
            var el = bolds[bi];
            while (el && !(el.tagName === 'TABLE' && el.className.indexOf('tobl') !== -1)) {
              el = el.parentElement;
            }
            if (!el) continue;
            var sib = el.nextElementSibling;
            while (sib) {
              if (sib.tagName === 'TABLE' && sib.className.indexOf('tobl') !== -1) return sib;
              sib = sib.nextElementSibling;
            }
          }
          return null;
        }

        // 1. Coach comments: «Комментарии тренеров команд:»
        var coachTobl = findNextTobl('Комментарии тренеров команд');
        if (coachTobl) {
          var nolTable = coachTobl.querySelector('table.nol');
          if (nolTable) {
            var nolRows = nolTable.querySelectorAll('tr');
            for (var ri = 0; ri < nolRows.length; ri++) {
              var tds = nolRows[ri].querySelectorAll(':scope > td');
              if (tds.length < 2) continue;
              // Determine timing
              var timing = null;
              for (var ti = 0; ti < tds.length; ti++) {
                var bolds2 = tds[ti].querySelectorAll('b');
                for (var bi2 = 0; bi2 < bolds2.length; bi2++) {
                  var bt = bolds2[bi2].textContent.toLowerCase();
                  if (bt.indexOf('до матча') !== -1 || bt.indexOf('перед матчем') !== -1) { timing = 'before'; break; }
                  if (bt.indexOf('после матча') !== -1) { timing = 'after'; break; }
                }
                if (timing) break;
              }
              if (!timing) continue;
              var sides = ['home', 'away'];
              for (var si = 0; si < 2; si++) {
                var td = tds[si];
                var commentDiv = td.querySelector('div[style*="padding-top:5px"]');
                if (!commentDiv) continue;
                var text = commentDiv.textContent;
                var textMatch = text.match(/\):\s*"([^"]+)"/);
                if (!textMatch) continue;
                var links = commentDiv.querySelectorAll('a b');
                var nick = links.length > 0 ? links[links.length - 1].textContent.trim() : '';
                if (!nick) continue;
                var team = '';
                var bolds3 = commentDiv.querySelectorAll('b');
                for (var bi3 = 0; bi3 < bolds3.length; bi3++) {
                  if (!bolds3[bi3].closest('a')) { team = bolds3[bi3].textContent.trim(); break; }
                }
                results.push({ type: 'coach', side: sides[si], timing: timing, nick: nick, team: team, text: textMatch[1].trim() });
              }
            }
          }
        }

        // 2. Match comments: «Комментарии к матчу:»
        var matchTobl = findNextTobl('Комментарии к матчу');
        if (matchTobl) {
          var rows = matchTobl.querySelectorAll('tr[id^="c"]');
          for (var ri2 = 0; ri2 < rows.length; ri2++) {
            var id = rows[ri2].id.replace('c', '');
            if (!id || isNaN(Number(id))) continue;
            var nickSpan = rows[ri2].querySelector('span[id="nick' + id + '"]');
            if (!nickSpan) continue;
            var nick2 = nickSpan.textContent.trim();
            if (!nick2) continue;
            var messDiv = rows[ri2].querySelector('div[id="mess' + id + '"]');
            var textDiv = rows[ri2].querySelector('div[id="id' + id + '"]');
            var rawText = messDiv ? messDiv.textContent.trim() : (textDiv ? textDiv.textContent.trim() : '');
            if (!rawText) continue;
            results.push({ type: 'match', nick: nick2, text: rawText });
          }
        }

        return results;
      }

      // Inline: parseMatchViews
      function parseMatchViews(html) {
        if (!html) return null;
        var doc = new DOMParser().parseFromString(html, 'text/html');

        // Find <b> containing "Матч посетили N менеджеров:"
        var bolds = doc.querySelectorAll('b');
        for (var i = 0; i < bolds.length; i++) {
          var b = bolds[i];
          var bText = b.textContent;
          if (bText.indexOf('посетили') === -1) continue;
          var numMatch = bText.match(/(\d+)/);
          if (!numMatch) continue;
          var count = parseInt(numMatch[1], 10);
          // Viewer links are siblings of <b> inside the parent <p>
          var parent = b.parentNode;
          var viewers = [];
          var links = parent.querySelectorAll('a[href*="v3_profile.php"]');
          for (var li = 0; li < links.length; li++) {
            var nick = links[li].textContent.trim();
            if (nick) viewers.push(nick);
          }
          if (viewers.length === 0) {
            links = parent.querySelectorAll('a[href*="managerzone.php"]');
            for (var li2 = 0; li2 < links.length; li2++) {
              var nick2 = links[li2].textContent.trim();
              if (nick2) viewers.push(nick2);
            }
          }
          return { count: count, viewers: viewers };
        }
        return null;
      }

      var mIndex = 0;
      var total = matches.length;
      var results = new Array(total); // store parsed data indexed by position

      // Progress bar
      var progressId = 'vsol-match-progress-' + matches[0].matchId;
      var progressWrap = document.createElement('div');
      progressWrap.id = progressId;
      progressWrap.style.cssText = 'margin:4px 0; font-size:11px; color:#555;';

      var progressBar = document.createElement('div');
      progressBar.style.cssText = 'height:4px; background:#e0e0e0; border-radius:2px; margin-top:2px;';
      var progressFill = document.createElement('div');
      progressFill.style.cssText = 'height:4px; background:#009900; border-radius:2px; width:0%; transition:width 0.2s;';
      progressBar.appendChild(progressFill);

      var progressText = document.createElement('span');
      progressText.textContent = 'Загрузка матчей: 0 / ' + total;
      progressWrap.appendChild(progressText);
      progressWrap.appendChild(progressBar);

      // Insert progress bar before the match table (inside vsol-div-matches container)
      var firstMatchRow = document.getElementById('vsol-match-row-' + matches[0].matchId);
      var matchesParent = firstMatchRow ? firstMatchRow.closest('[id^="vsol-div-matches-"]') : null;
      if (matchesParent) {
        matchesParent.insertBefore(progressWrap, matchesParent.firstChild);
      }

      // Hide all details divs while loading
      for (var hi = 0; hi < matches.length; hi++) {
        var detEl = document.getElementById('vsol-match-details-' + matches[hi].matchId);
        if (detEl) detEl.style.display = 'none';
      }

      function loadNextMatch() {
        if (mIndex >= matches.length) return;
        var matchIndex = mIndex;
        var match = matches[matchIndex];
        mIndex++;

        // Check cache first
        var cached = getMatchDetailsCache(match.matchId);
        if (cached) {
          results[matchIndex] = cached;
          var done = matchIndex + 1;
          progressText.textContent = 'Загрузка матчей: ' + done + ' / ' + total;
          progressFill.style.width = Math.round(done / total * 100) + '%';
          if (done === total) {
            for (var ri = 0; ri < matches.length; ri++) {
              var detailsEl = document.getElementById('vsol-match-details-' + matches[ri].matchId);
              if (!detailsEl) continue;
              detailsEl.style.display = '';
              if (results[ri] && results[ri].error) {
                detailsEl.textContent = 'Ошибка загрузки матча';
              } else if (results[ri]) {
                renderMatchDetails(matches[ri].matchId, results[ri].strength, results[ri].events, results[ri].comments, results[ri].views);
              }
            }
            if (progressWrap.parentNode) progressWrap.parentNode.removeChild(progressWrap);
          }
          // No delay needed for cache hits — process next immediately
          loadNextMatch();
          return;
        }

        var url = SITE_CONFIG.BASE_URL + '/viewmatch.php?day=' + match.day + '&match_id=' + match.matchId;
        httpGet(url, function(errM, html) {
          var done = matchIndex + 1;

          if (errM || !html) {
            results[matchIndex] = { error: true };
          } else {
            var parsed = {
              strength: parseMatchStrength(html),
              events: parseMatchEvents(html),
              comments: parseMatchComments(html),
              views: parseMatchViews(html)
            };
            results[matchIndex] = parsed;
            setMatchDetailsCache(match.matchId, parsed);
          }

          // Update progress bar
          progressText.textContent = 'Загрузка матчей: ' + done + ' / ' + total;
          progressFill.style.width = Math.round(done / total * 100) + '%';

          if (done === total) {
            // All loaded — render all details and remove progress bar
            for (var ri = 0; ri < matches.length; ri++) {
              var detailsEl = document.getElementById('vsol-match-details-' + matches[ri].matchId);
              if (!detailsEl) continue;
              detailsEl.style.display = '';
              if (results[ri] && results[ri].error) {
                detailsEl.textContent = 'Ошибка загрузки матча';
              } else if (results[ri]) {
                renderMatchDetails(matches[ri].matchId, results[ri].strength, results[ri].events, results[ri].comments, results[ri].views);
              }
            }
            if (progressWrap.parentNode) progressWrap.parentNode.removeChild(progressWrap);
          }

          setTimeout(loadNextMatch, 300);
        });
      }

      loadNextMatch();
    }

    // ---- Match details cache (localStorage, 7-day TTL) ----

    var MATCH_DETAILS_TTL = 7 * 24 * 60 * 60 * 1000;

    function getMatchDetailsCache(matchId) {
      try {
        var raw = localStorage.getItem('vsol_md_' + matchId);
        if (!raw) return null;
        var entry = JSON.parse(raw);
        if (!entry || Date.now() - entry.time > MATCH_DETAILS_TTL) return null;
        return entry.data;
      } catch (e) { return null; }
    }

    function setMatchDetailsCache(matchId, data) {
      try {
        localStorage.setItem('vsol_md_' + matchId, JSON.stringify({ data: data, time: Date.now() }));
      } catch (e) {}
    }

    function clearMatchDetailsCache(matchIds) {
      try {
        for (var i = 0; i < matchIds.length; i++) {
          localStorage.removeItem('vsol_md_' + matchIds[i]);
        }
      } catch (e) {}
    }

    // ---- 8.3: loadDivisionsSequentially ----

    function loadDivision(divId, divName) {
      console.log('[loadDivision] divId=' + divId + ' divName=' + divName);
      var section = document.getElementById('vsol-div-section-' + divId);
      if (!section) return;

      // Step 1: get tour info to find lastTour
      httpGet(SITE_CONFIG.BASE_URL + '/v2champ.php?num=' + divId + '&tblshow=1', function(err1, html1) {
        if (err1 || !html1) {
          var loadingEl = document.getElementById('vsol-div-loading-' + divId);
          if (loadingEl) loadingEl.textContent = 'Ошибка загрузки ' + divName;
          return;
        }

        var tourInfo = parseTourInfo(html1);
        // currentTour = red-marked (upcoming) tour; lastTour = last played = currentTour - 1
        var lastTour = Math.max(1, tourInfo.currentTour - 1);

        // Step 2: get division table + match list for lastTour
        setTimeout(function() {
          httpGet(SITE_CONFIG.BASE_URL + '/v2champ.php?num=' + divId + '&tblshow=1&tour=' + lastTour, function(err2, html2) {
            var loadingEl = document.getElementById('vsol-div-loading-' + divId);

            if (err2 || !html2) {
              if (loadingEl) loadingEl.textContent = 'Ошибка загрузки ' + divName;
              return;
            }

            var tableData = parseDivisionTable(html2);
            var matches = parseMatchList(html2);

            // Remove loading indicator
            if (loadingEl) loadingEl.parentNode.removeChild(loadingEl);

            // Render round selector — pre-select lastTour (currentTour - 1)
            var roundSelector = renderRoundSelector(tourInfo, divId, lastTour, function(tourNum) {
              var sel = document.getElementById('vsol-div-tour-sel-' + divId);
              if (sel) sel.disabled = true;
              httpGet(SITE_CONFIG.BASE_URL + '/v2champ.php?num=' + divId + '&tblshow=1&tour=' + tourNum, function(errT, htmlT) {
                if (sel) sel.disabled = false;
                if (errT || !htmlT) return;
                var newTableData = parseDivisionTable(htmlT);
                var newMatches = parseMatchList(htmlT);
                var oldTable = document.getElementById('vsol-div-table-' + divId);
                if (oldTable && newTableData) {
                  var newTable = renderDivisionTable(newTableData, divName, divId);
                  oldTable.parentNode.replaceChild(newTable, oldTable);
                }
                var oldMatches = document.getElementById('vsol-div-matches-' + divId);
                if (oldMatches) {
                  var newMatchList = renderMatchList(newMatches, divId);
                  oldMatches.parentNode.replaceChild(newMatchList, oldMatches);
                  loadMatchDetailsSequentially(newMatches);
                }
              });
            });
            section.appendChild(roundSelector);

            if (tableData) {
              var tableEl = renderDivisionTable(tableData, divName, divId);
              section.appendChild(tableEl);
            } else {
              var noTable = document.createElement('div');
              noTable.id = 'vsol-div-notable-' + divId;
              noTable.textContent = 'Таблица не найдена';
              noTable.style.cssText = 'color:#888; font-size:12px;';
              section.appendChild(noTable);
            }

            var matchListEl = renderMatchList(matches, divId);
            console.log('[loadDivision] appending matchList for divId=' + divId + ' matches=' + matches.length);
            section.appendChild(matchListEl);

            // Reload button — clears cache for this division's matches and reloads
            var reloadBtn = document.createElement('button');
            reloadBtn.id = 'vsol-div-reload-' + divId;
            reloadBtn.textContent = '🔄 Перезагрузить';
            reloadBtn.style.cssText = 'margin-top:6px; padding:2px 8px; font-size:11px; cursor:pointer; border:1px solid #009900; background:#f0fff0; border-radius:3px;';
            reloadBtn.onclick = function() {
              clearMatchDetailsCache(matches.map(function(m) { return m.matchId; }));
              // Remove existing content and re-run loadDivision
              while (section.firstChild) section.removeChild(section.firstChild);
              var newLoading = document.createElement('div');
              newLoading.id = 'vsol-div-loading-' + divId;
              newLoading.textContent = 'Загрузка...';
              newLoading.style.cssText = 'color:#888; font-size:12px;';
              section.appendChild(newLoading);
              loadDivision(divId, divName);
            };
            section.appendChild(reloadBtn);

            loadMatchDetailsSequentially(matches);
          });
        }, 300);
      });
    }

    // ---- 8.1: loadCalculatorData ----

    function loadCalculatorData(nationId) {
      // Show loading indicator
      var loadingDiv = document.createElement('div');
      loadingDiv.id = 'vsol-calc-loading';
      loadingDiv.textContent = 'Загрузка данных...';
      loadingDiv.style.cssText = 'color:#888; font-size:13px; margin-bottom:8px;';
      calcPanel.appendChild(loadingDiv);

      httpGet(SITE_CONFIG.BASE_URL + '/teams_cntr.php?num=' + nationId, function(err, html) {
        if (loadingDiv.parentNode) loadingDiv.parentNode.removeChild(loadingDiv);

        if (err || !html) {
          var errDiv = document.createElement('div');
          errDiv.id = 'vsol-calc-error';
          errDiv.textContent = 'Ошибка загрузки данных федерации';
          calcPanel.appendChild(errDiv);
          return;
        }

        var divisions = parseDivisionLinks(html);

        if (!divisions || divisions.length === 0) {
          var noneDiv = document.createElement('div');
          noneDiv.id = 'vsol-calc-nodivisions';
          noneDiv.textContent = 'Дивизионы не найдены';
          calcPanel.appendChild(noneDiv);
          return;
        }

        // Build division tab bar
        var divTabBar = document.createElement('div');
        divTabBar.id = 'vsol-div-tab-bar';
        divTabBar.style.cssText = 'display:flex; flex-wrap:wrap; gap:2px; margin-bottom:6px;';
        calcPanel.appendChild(divTabBar);

        // Build content area
        var divContent = document.createElement('div');
        divContent.id = 'vsol-div-content';
        divContent.style.cssText = 'border:1px solid #ccc; padding:8px; min-height:40px;';
        calcPanel.appendChild(divContent);

        // Track which divisions have been loaded
        var loaded = {};
        var activeDivId = null;

        function activateDivTab(divId, divName) {
          console.log('[activateDivTab] divId=' + divId + ' loaded=' + JSON.stringify(loaded));
          // Update tab styles
          var tabs = divTabBar.querySelectorAll('[id^="vsol-div-tab-"]');
          for (var t = 0; t < tabs.length; t++) {
            var isActive = tabs[t].id === 'vsol-div-tab-' + divId;
            tabs[t].style.fontWeight = isActive ? 'bold' : 'normal';
            tabs[t].style.background = isActive ? '#fff' : '#f0f0f0';
            tabs[t].style.borderBottom = isActive ? '1px solid #fff' : '1px solid #ccc';
          }

          // Show/hide section panels
          var sections = divContent.querySelectorAll('[id^="vsol-div-section-"]');
          for (var s = 0; s < sections.length; s++) {
            sections[s].style.display = 'none';
          }

          activeDivId = divId;

          // Create section if first visit
          if (!loaded[divId]) {
            loaded[divId] = true;
            var section = renderDivisionSection(divName, divId);
            divContent.appendChild(section);
          }

          // Show active section
          var activeSection = document.getElementById('vsol-div-section-' + divId);
          if (activeSection) activeSection.style.display = '';

          // Load data on first visit
          if (!loaded[divId + '_fetched']) {
            loaded[divId + '_fetched'] = true;
            loadDivision(divId, divName);
          }
        }

        // Create a tab for each division
        for (var i = 0; i < divisions.length; i++) {
          (function(div) {
            var tab = document.createElement('div');
            tab.id = 'vsol-div-tab-' + div.divisionId;
            tab.textContent = div.name;
            tab.style.cssText = 'padding:3px 10px; cursor:pointer; border:1px solid #ccc; background:#f0f0f0; font-size:12px;';
            tab.addEventListener('click', function() {
              activateDivTab(div.divisionId, div.name);
            });
            divTabBar.appendChild(tab);
          })(divisions[i]);
        }

        // Activate first division by default
        activateDivTab(divisions[0].divisionId, divisions[0].name);
      });
    }

  }

  // ========== Division Match Comments (fed_news.php) ==========

  // Shared parse helpers used by initDivisionMatchComments
  function parseMatchHeaderLocal(html) {
    // Extracts home team, away team, score and their roster links from viewmatch.php
    if (!html) return null;
    var doc = new DOMParser().parseFromString(html, 'text/html');
    // The match header row contains two roster.php links and a <b>score</b>
    var rosterLinks = doc.querySelectorAll('a[href*="roster.php"].mnuw');
    if (rosterLinks.length < 2) return null;
    var homeHref = rosterLinks[0].getAttribute('href') || '';
    var awayHref = rosterLinks[1].getAttribute('href') || '';
    // Normalize to root-relative
    if (homeHref && !homeHref.startsWith('http') && !homeHref.startsWith('/')) homeHref = '/' + homeHref;
    if (awayHref && !awayHref.startsWith('http') && !awayHref.startsWith('/')) awayHref = '/' + awayHref;
    // Extract bold team names (first <b> inside each link)
    var homeB = rosterLinks[0].querySelector('b');
    var awayB = rosterLinks[1].querySelector('b');
    var homeTeam = homeB ? homeB.textContent.trim() : rosterLinks[0].textContent.trim();
    var awayTeam = awayB ? awayB.textContent.trim() : rosterLinks[1].textContent.trim();
    // Score: find <b> that looks like N:N near the roster links
    var row = rosterLinks[0].closest('tr');
    var score = '';
    if (row) {
      var bolds = row.querySelectorAll('b');
      for (var bi = 0; bi < bolds.length; bi++) {
        if (/^\d+:\d+$/.test(bolds[bi].textContent.trim())) {
          score = bolds[bi].textContent.trim();
          break;
        }
      }
    }
    return { homeTeam: homeTeam, awayTeam: awayTeam, homeHref: homeHref, awayHref: awayHref, score: score };
  }

  function parseMatchStrengthLocal(html) {
    if (!html) return null;
    var doc = new DOMParser().parseFromString(html, 'text/html');
    function parseCell(td) {
      var v = ''; for (var i = 0; i < td.childNodes.length; i++) { if (td.childNodes[i].nodeType === 3) v += td.childNodes[i].textContent; }
      var val = parseInt(v.trim(), 10); if (isNaN(val)) return null;
      var b = td.querySelector('b'); if (!b) return null;
      var pct = parseInt(b.textContent.trim().replace('%',''), 10); if (isNaN(pct)) return null;
      return { value: val, percent: pct };
    }
    function parseRow(labelText) {
      var tds = doc.querySelectorAll('td'); var labelTd = null;
      for (var i = 0; i < tds.length; i++) {
        var t = ''; for (var j = 0; j < tds[i].childNodes.length; j++) { if (tds[i].childNodes[j].nodeType === 3) t += tds[i].childNodes[j].textContent; }
        if (t.trim() === labelText) { labelTd = tds[i]; break; }
      }
      if (!labelTd) return null;
      var tr = labelTd.closest('tr'); if (!tr) return null;
      var rdl = tr.querySelector('td.rdl'); var gdl = tr.querySelector('td.gdl');
      if (!rdl || !gdl) return null;
      var h = parseCell(rdl); var a = parseCell(gdl); if (!h || !a) return null;
      return { label: labelText, homeValue: h.value, homePercent: h.percent, awayValue: a.value, awayPercent: a.percent, diff: a.value - h.value };
    }
    var s = parseRow('Сила в начале матча'); var e = parseRow('Сила в конце матча');
    if (!s && !e) return null;
    return { start: s, end: e };
  }

  function parseMatchEventsLocal(html) {
    if (!html) return [];
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var rows = doc.querySelectorAll('tr[bgcolor="#c9f2c5"], tr[bgcolor="#eddac7"]');
    var events = [];
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i]; var tds = row.querySelectorAll('td'); if (!tds.length) continue;
      var type = null;
      var titleMap = { 'Гол': 'goal' };
      var imgs = row.querySelectorAll('img[title]');
      for (var ii = 0; ii < imgs.length; ii++) { if (titleMap[imgs[ii].getAttribute('title')]) { type = titleMap[imgs[ii].getAttribute('title')]; break; } }
      if (!type) { var tdts = row.querySelectorAll('td[title]'); for (var jj = 0; jj < tdts.length; jj++) { if (titleMap[tdts[jj].getAttribute('title')]) { type = titleMap[tdts[jj].getAttribute('title')]; break; } } }
      if (type !== 'goal') continue;
      var minute = tds[0].textContent.trim(); if (!minute) minute = '?';
      var pl = row.querySelectorAll('a.mnu'); if (!pl.length) continue;
      var playerName = pl[0].textContent.trim(); if (!playerName) continue;
      var score = tds[tds.length - 1].textContent.trim();
      var desc = '';
      for (var di = 0; di < tds.length; di++) {
        if (tds[di].querySelector('a.mnu')) {
          var res = ''; var nodes = tds[di].childNodes;
          for (var ni = 0; ni < nodes.length; ni++) {
            if (nodes[ni].nodeType === 3) { res += nodes[ni].textContent; }
            else if (nodes[ni].nodeType === 1 && nodes[ni].tagName === 'A') {
              var href = nodes[ni].getAttribute('href') || '';
              if (href && !href.startsWith('http') && !href.startsWith('/')) href = '/' + href;
              res += '[a href=' + href + ' target="_blank"]' + nodes[ni].textContent.trim() + '[/a]';
            }
          }
          desc = res.trim(); break;
        }
      }
      events.push({ type: 'goal', minute: minute, playerName: playerName, score: score || undefined, descriptionBBCode: desc || undefined });
    }
    events.sort(function(a, b) {
      var pa = a.minute.split('+'); var pb = b.minute.split('+');
      return ((parseInt(pa[0],10)||0) + (pa[1]?(parseInt(pa[1],10)||0)*0.01:0)) - ((parseInt(pb[0],10)||0) + (pb[1]?(parseInt(pb[1],10)||0)*0.01:0));
    });
    return events;
  }

  function parseMatchCommentsLocal(html) {
    if (!html) return [];
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var results = [];
    function findNextTobl(headingText) {
      var bolds = doc.querySelectorAll('b');
      for (var bi = 0; bi < bolds.length; bi++) {
        if (bolds[bi].textContent.indexOf(headingText) === -1) continue;
        var el = bolds[bi];
        while (el && !(el.tagName === 'TABLE' && el.className.indexOf('tobl') !== -1)) el = el.parentElement;
        if (!el) continue;
        var sib = el.nextElementSibling;
        while (sib) { if (sib.tagName === 'TABLE' && sib.className.indexOf('tobl') !== -1) return sib; sib = sib.nextElementSibling; }
      }
      return null;
    }
    var coachTobl = findNextTobl('Комментарии тренеров команд');
    if (coachTobl) {
      var nol = coachTobl.querySelector('table.nol');
      if (nol) {
        var nolRows = nol.querySelectorAll('tr');
        for (var ri = 0; ri < nolRows.length; ri++) {
          var tds = nolRows[ri].querySelectorAll(':scope > td'); if (tds.length < 2) continue;
          var timing = null;
          for (var ti = 0; ti < tds.length; ti++) {
            var bs = tds[ti].querySelectorAll('b');
            for (var bi2 = 0; bi2 < bs.length; bi2++) {
              var bt = bs[bi2].textContent.toLowerCase();
              if (bt.indexOf('до матча') !== -1 || bt.indexOf('перед матчем') !== -1) { timing = 'before'; break; }
              if (bt.indexOf('после матча') !== -1) { timing = 'after'; break; }
            }
            if (timing) break;
          }
          if (!timing) continue;
          var sides = ['home', 'away'];
          for (var si = 0; si < 2; si++) {
            var cd = tds[si].querySelector('div[style*="padding-top:5px"]'); if (!cd) continue;
            var tm = cd.textContent.match(/\):\s*"([^"]+)"/); if (!tm) continue;
            var lks = cd.querySelectorAll('a b');
            var nick = lks.length > 0 ? lks[lks.length-1].textContent.trim() : ''; if (!nick) continue;
            var team = ''; var bbs = cd.querySelectorAll('b');
            for (var bi3 = 0; bi3 < bbs.length; bi3++) { if (!bbs[bi3].closest('a')) { team = bbs[bi3].textContent.trim(); break; } }
            results.push({ type: 'coach', side: sides[si], timing: timing, nick: nick, team: team, text: tm[1].trim() });
          }
        }
      }
    }
    var matchTobl = findNextTobl('Комментарии к матчу');
    if (matchTobl) {
      var mrows = matchTobl.querySelectorAll('tr[id^="c"]');
      for (var mri = 0; mri < mrows.length; mri++) {
        var id = mrows[mri].id.replace('c',''); if (!id || isNaN(Number(id))) continue;
        var ns = mrows[mri].querySelector('span[id="nick'+id+'"]'); if (!ns) continue;
        var nick2 = ns.textContent.trim(); if (!nick2) continue;
        var md = mrows[mri].querySelector('div[id="mess'+id+'"]');
        var td2 = mrows[mri].querySelector('div[id="id'+id+'"]');
        var rawText = md ? md.textContent.trim() : (td2 ? td2.textContent.trim() : ''); if (!rawText) continue;
        results.push({ type: 'match', nick: nick2, text: rawText });
      }
    }
    return results;
  }

  function initDivisionMatchComments(nationId) {
    if (!nationId) return;
    var btnContainer = document.querySelector('p:has(a.butn)');
    if (!btnContainer) return;

    var btn = document.createElement('a');
    btn.href = 'javascript:void(0)';
    btn.className = 'butn';
    btn.textContent = 'Матчи с комментариями';
    btn.style.marginLeft = '5px';

    btn.onclick = function() {
      btn.textContent = 'Загрузка...';

      // --- BB-code formatter for one match ---
      function formatMatchBBCode(divName, tourNum, match, details) {
        var parts = [];

        // Header
        parts.push('[hr]');
        parts.push('[b]' + divName + ' — Тур ' + tourNum + '[/b]');

        // Match link
        parts.push(
          '[table align=center border=0][tr][td]' +
          '[a href=' + match.matchUrl + ' target="_blank"]' +
          match.homeTeam + ' - ' + match.awayTeam + '  ' + match.score +
          '[/a][/td][/tr][/table]'
        );

        // Strength
        if (details.strength) {
          var sLines = [];
          function fmtStrRow(row) {
            var diff = Math.abs(row.awayValue - row.homeValue);
            var diffStr = diff > 0 ? '[small]+' + diff + '[/small]' : '';
            var hw = Math.max(row.homePercent - 10, 5);
            var aw = Math.max(row.awayPercent - 10, 5);
            var homeBg, homeFg, awayBg, awayFg, hd, ad;
            if (row.homeValue >= row.awayValue) {
              homeBg = '#87e878'; homeFg = '#060'; hd = diffStr;
              awayBg = '#ff967e'; awayFg = '#620'; ad = '';
            } else {
              homeBg = '#ff967e'; homeFg = '#620'; hd = '';
              awayBg = '#87e878'; awayFg = '#060'; ad = diffStr;
            }
            return '[table width=100%][tr]' +
              '[td align=left]' + row.label + '[/td]' +
              '[td bgcolor=' + homeBg + ' width=' + hw + '% align=center][b][color=' + homeFg + ']' + row.homeValue + hd + '[/color][/b][/td]' +
              '[td bgcolor=' + awayBg + ' width=' + aw + '%][b][color=' + awayFg + ']' + row.awayValue + ad + '[/color][/b][/td]' +
              '[/tr][/table]';
          }
          if (details.strength.start) sLines.push(fmtStrRow(details.strength.start));
          if (details.strength.end) sLines.push(fmtStrRow(details.strength.end));
          if (sLines.length) parts.push(sLines.join('\n'));
        }

        // Events
        if (details.events && details.events.length > 0) {
          for (var ei = 0; ei < details.events.length; ei++) {
            var e = details.events[ei];
            var desc = e.descriptionBBCode || e.playerName;
            var evLine = '[table width=70% align=center border=0][tr][td align=center]⚽ ' +
              e.minute + "' " + desc + (e.score ? ' (' + e.score + ')' : '') +
              '[/td][/tr][/table]';
            parts.push(evLine);
          }
        }

        // Coach comments — 2-column table, one row per timing
        var comments = details.comments || [];
        var coachBefore = { home: null, away: null };
        var coachAfter  = { home: null, away: null };
        var matchComments = [];

        for (var ci = 0; ci < comments.length; ci++) {
          var cm = comments[ci];
          if (cm.type === 'coach') {
            var slot = cm.timing === 'before' ? coachBefore : coachAfter;
            if (cm.side === 'home') slot.home = cm;
            else slot.away = cm;
          } else {
            matchComments.push(cm);
          }
        }

        function coachCell(cm, timing) {
          if (!cm) return '[td width=50%][/td]';
          var label = cm.timing === 'before' ? 'до матча' : 'после матча';
          return '[td width=50%][b]' + cm.nick + '[/b] (' + (cm.team || '') + ', ' + label + '): "' + cm.text + '"[/td]';
        }

        var hasCoachBefore = coachBefore.home || coachBefore.away;
        var hasCoachAfter  = coachAfter.home  || coachAfter.away;

        if (hasCoachBefore || hasCoachAfter) {
          var coachRows = [];
          if (hasCoachBefore) {
            coachRows.push('[tr]' + coachCell(coachBefore.home, 'before') + coachCell(coachBefore.away, 'before') + '[/tr]');
          }
          if (hasCoachAfter) {
            coachRows.push('[tr]' + coachCell(coachAfter.home, 'after') + coachCell(coachAfter.away, 'after') + '[/tr]');
          }
          parts.push('[table border=0 width=100%]' + coachRows.join('') + '[/table]');
        }

        // Match comments — full width
        if (matchComments.length > 0) {
          var mcRows = matchComments.map(function(mc) {
            var nick = mc.nick || mc.managerNick || '';
            return '[tr][td]' + nick + ': "' + mc.text + '"[/td][/tr]';
          });
          parts.push('[table border=0 width=100%]' + mcRows.join('') + '[/table]');
        }

        return parts.join('\n');
      }

      // --- Main flow ---
      httpGet(SITE_CONFIG.BASE_URL + '/teams_cntr.php?num=' + nationId, function(err, html) {
        if (err || !html) {
          alert('Ошибка загрузки дивизионов');
          btn.textContent = 'Матчи с комментариями';
          return;
        }

        var divisions = (function parseDivLinks(h) {
          var doc = new DOMParser().parseFromString(h, 'text/html');
          var anchors = doc.querySelectorAll('a[href*="v2champ.php"]');
          var res = []; var seen = {};
          for (var i = 0; i < anchors.length; i++) {
            var a = anchors[i];
            var name = a.textContent.trim();
            if (!name) continue;
            var url = a.getAttribute('href') || '';
            var m = url.match(/[?&]num=(\d+)/);
            var divId = m ? m[1] : '';
            if (!divId || seen[divId]) continue;
            seen[divId] = true;
            res.push({ name: name, divisionId: divId });
          }
          return res;
        })(html);

        if (!divisions.length) {
          alert('Дивизионы не найдены');
          btn.textContent = 'Матчи с комментариями';
          return;
        }

        var allMatchBBCodes = [];
        var divIndex = 0;

        function processNextDiv() {
          if (divIndex >= divisions.length) {
            // Done — insert into memo
            if (allMatchBBCodes.length > 0) {
              var memo = document.getElementById('memo');
              if (memo) {
                var text = allMatchBBCodes.join('\n');
                memo.value = memo.value ? memo.value + '\n\n' + text : text;
                memo.dispatchEvent(new Event('change'));
                if (typeof preview === 'function') preview();
              }
            } else {
              alert('Матчей с комментариями не найдено');
            }
            btn.textContent = 'Матчи с комментариями';
            return;
          }

          var div = divisions[divIndex++];
          var divId = div.divisionId;
          var divName = div.name;

          // Get tour info
          httpGet(SITE_CONFIG.BASE_URL + '/v2champ.php?num=' + divId + '&tblshow=1', function(e1, h1) {
            if (e1 || !h1) { setTimeout(processNextDiv, 300); return; }

            var tourInfo = (function parseTI(h) {
              var doc = new DOMParser().parseFromString(h, 'text/html');
              var anchors = doc.querySelectorAll('a[href*="tblshow=1&tour="]');
              var seen = {}; var currentTour = 1; var foundRed = false;
              for (var i = 0; i < anchors.length; i++) {
                var href = anchors[i].getAttribute('href') || '';
                var m = href.match(/[?&]tour=(\d+)/);
                if (!m) continue;
                var tn = parseInt(m[1], 10);
                if (seen[tn]) continue; seen[tn] = true;
                if (anchors[i].querySelector('font[color="red"]') && !foundRed) {
                  currentTour = tn; foundRed = true;
                }
              }
              return { currentTour: currentTour };
            })(h1);

            var lastTour = Math.max(1, tourInfo.currentTour - 1);

            setTimeout(function() {
              httpGet(SITE_CONFIG.BASE_URL + '/v2champ.php?num=' + divId + '&tblshow=1&tour=' + lastTour, function(e2, h2) {
                if (e2 || !h2) { setTimeout(processNextDiv, 300); return; }

                // Parse matches
                var matches = (function parseML(h) {
                  var doc = new DOMParser().parseFromString(h, 'text/html');
                  var rows = doc.querySelectorAll('tr');
                  var res = []; var seen = {};
                  for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    if (row.querySelector('a[href*="previewmatch.php"]')) continue;
                    var vl = row.querySelector('a[href*="viewmatch.php"]');
                    if (!vl) continue;
                    var rl = row.querySelectorAll('a[href*="roster.php"]');
                    if (rl.length < 2) continue;
                    var href = vl.getAttribute('href') || '';
                    var mid = (href.match(/[?&]match_id=(\d+)/) || [])[1];
                    var day = (href.match(/[?&]day=(\d+)/) || [])[1];
                    if (!mid || !day || seen[mid]) continue;
                    seen[mid] = true;
                    var sc = vl.querySelector('b');
                    var score = sc ? sc.textContent.trim() : '';
                    if (!score) continue;
                    res.push({
                      matchId: mid, day: day,
                      homeTeam: rl[0].textContent.trim(),
                      awayTeam: rl[1].textContent.trim(),
                      score: score,
                      matchUrl: SITE_CONFIG.BASE_URL + '/viewmatch.php?day=' + day + '&match_id=' + mid
                    });
                  }
                  return res;
                })(h2);

                var matchIndex = 0;

                function processNextMatch() {
                  if (matchIndex >= matches.length) {
                    setTimeout(processNextDiv, 300);
                    return;
                  }
                  var match = matches[matchIndex++];

                  // Check cache first
                  var cached = getMatchDetailsCache(match.matchId);
                  if (cached) {
                    if (cached.comments && cached.comments.length > 0) {
                      allMatchBBCodes.push(formatMatchBBCode(divName, lastTour, match, cached));
                    }
                    processNextMatch();
                    return;
                  }

                  setTimeout(function() {
                    httpGet(SITE_CONFIG.BASE_URL + '/viewmatch.php?day=' + match.day + '&match_id=' + match.matchId, function(em, hm) {
                      if (!em && hm) {
                        var details = {
                          strength: parseMatchStrengthLocal(hm),
                          events: parseMatchEventsLocal(hm),
                          comments: parseMatchCommentsLocal(hm),
                          views: null
                        };
                        setMatchDetailsCache(match.matchId, details);
                        if (details.comments && details.comments.length > 0) {
                          allMatchBBCodes.push(formatMatchBBCode(divName, lastTour, match, details));
                        }
                      }
                      processNextMatch();
                    });
                  }, 300);
                }

                processNextMatch();
              });
            }, 300);
          });
        }

        processNextDiv();
      });
    };

    btnContainer.insertBefore(btn, btnContainer.firstChild);
  }

  // ========== BB-Code Toolbar (fed_news.php) ==========

  function initBBCodeToolbar() {
    var memo = document.getElementById('memo');
    if (!memo) return;
    if (document.getElementById('bbcode-toolbar')) return;

    var toolbar = document.createElement('div');
    toolbar.id = 'bbcode-toolbar';
    toolbar.style.cssText = 'margin:4px 0; display:flex; flex-wrap:wrap; gap:2px;';

    var tags = [
      { label: 'B', open: '[b]', close: '[/b]', title: 'Жирный' },
      { label: 'I', open: '[i]', close: '[/i]', title: 'Курсив' },
      { label: 'U', open: '[u]', close: '[/u]', title: 'Подчёркнутый' },
      { label: 'S', open: '[s]', close: '[/s]', title: 'Зачёркнутый' },
      { label: 'sm', open: '[small]', close: '[/small]', title: 'Маленький шрифт' },
      { label: 'tt', open: '[tt]', close: '[/tt]', title: 'Моноширинный' },
      { label: 'sub', open: '[sub]', close: '[/sub]', title: 'Нижний индекс' },
      { label: 'sup', open: '[sup]', close: '[/sup]', title: 'Верхний индекс' },
      { label: '🎨', open: '[color=#]', close: '[/color]', title: 'Цвет' },
      { label: '🔗', open: '[a href= target="_blank"]', close: '[/a]', title: 'Ссылка' },
      { label: '—', open: '[hr]', close: '', title: 'Разделитель' },
      { label: '▦', open: '[table width=70% align=center]\n[tr][td]', close: '[/td][/tr]\n[/table]', title: 'Таблица' },
      { label: 'tr', open: '[tr]', close: '[/tr]', title: 'Строка таблицы' },
      { label: 'td', open: '[td]', close: '[/td]', title: 'Ячейка таблицы' },
      { label: 'list', open: '[list]\n', close: '\n[/list]', title: 'Список' },
      { label: '[*]', open: '[*] ', close: '', title: 'Элемент списка' },
    ];

    for (var i = 0; i < tags.length; i++) {
      (function(tag) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = tag.label;
        btn.title = tag.title;
        btn.style.cssText = 'padding:2px 6px; cursor:pointer; font-size:12px; min-width:28px; border:1px solid #999; background:#f0f0f0; border-radius:3px;';
        btn.addEventListener('click', function() {
          var start = memo.selectionStart;
          var end = memo.selectionEnd;
          var selected = memo.value.substring(start, end);
          var before = memo.value.substring(0, start);
          var after = memo.value.substring(end);
          memo.value = before + tag.open + selected + tag.close + after;
          memo.focus();
          var cursorPos = start + tag.open.length + selected.length;
          if (!selected && tag.close) cursorPos = start + tag.open.length;
          memo.selectionStart = memo.selectionEnd = cursorPos;
          memo.dispatchEvent(new Event('change'));
          if (typeof preview === 'function') preview();
        });
        toolbar.appendChild(btn);
      })(tags[i]);
    }

    // Insert toolbar right after memo (or its parent <p>)
    var memoContainer = memo.parentNode;
    if (memoContainer.tagName === 'P') {
      memoContainer.parentNode.insertBefore(toolbar, memoContainer.nextSibling);
    } else {
      memo.parentNode.insertBefore(toolbar, memo.nextSibling);
    }

    // Move the script buttons container (p:has(a.butn)) right after the toolbar
    var btnContainer = document.querySelector('p:has(a.butn)');
    if (btnContainer) {
      // Remove "Федерация ..." link — it's redundant next to the toolbar
      var fedLinks = btnContainer.querySelectorAll('a.butn[href*="federation.php"]');
      for (var fl = 0; fl < fedLinks.length; fl++) fedLinks[fl].remove();
      toolbar.parentNode.insertBefore(btnContainer, toolbar.nextSibling);
    }
  }

  // ========== Ensure News Form (fed_news.php) ==========

  function ensureNewsForm(nationId) {
    // Check if the news form already exists and is inside the main content area
    var mainContent = document.querySelector('.tmain div');
    var forms = document.querySelectorAll('form[action="/fed_news.php"]');
    var existingForm = null;
    for (var i = 0; i < forms.length; i++) {
      var actInput = forms[i].querySelector('input[name="act"][value="save"]');
      if (actInput) { existingForm = forms[i]; break; }
    }

    if (existingForm && mainContent && mainContent.contains(existingForm)) {
      // Form exists inside main content — all good
      return;
    }

    if (existingForm && mainContent && !mainContent.contains(existingForm)) {
      // Form and related content exist outside main content area — move everything inside
      // Find all sibling elements around the form that belong together
      // (h1 title, description paragraphs, preview table, form, buttons, script, bbcode help)
      var outsideH1 = null;
      var allH1s = document.querySelectorAll('h1');
      for (var h = 0; h < allH1s.length; h++) {
        if (!mainContent.contains(allH1s[h])) { outsideH1 = allH1s[h]; break; }
      }

      // Collect all elements to move: from outsideH1 (or form) to the end of its parent
      var startNode = outsideH1 || existingForm;
      var parent = startNode.parentNode;
      var nodesToMove = [];
      var node = startNode;
      while (node) {
        var next = node.nextSibling;
        nodesToMove.push(node);
        node = next;
      }

      // Insert all collected nodes at the end of mainContent
      for (var n = 0; n < nodesToMove.length; n++) {
        mainContent.appendChild(nodesToMove[n]);
      }
      return;
    }

    // Form not found — create it
    var form = document.createElement('form');
    form.action = '/fed_news.php';
    form.method = 'POST';

    var actHidden = document.createElement('input');
    actHidden.type = 'hidden';
    actHidden.name = 'act';
    actHidden.value = 'save';
    form.appendChild(actHidden);

    var nationHidden = document.createElement('input');
    nationHidden.type = 'hidden';
    nationHidden.name = 'nation_id';
    nationHidden.value = nationId;
    form.appendChild(nationHidden);

    var titleLabel = document.createElement('p');
    titleLabel.className = 'lh18 txt';
    titleLabel.style.marginBottom = '0';
    titleLabel.textContent = 'Заголовок: ';
    var titleInput = document.createElement('input');
    titleInput.name = 'title';
    titleInput.type = 'text';
    titleInput.maxLength = 100;
    titleInput.style.cssText = 'width:706px; margin:1px auto; padding:1px';
    titleInput.className = 'form2';
    titleLabel.appendChild(titleInput);
    form.appendChild(titleLabel);

    var memoP = document.createElement('p');
    memoP.className = 'lh18 txt';
    memoP.style.marginTop = '0';
    var memo = document.createElement('textarea');
    memo.id = 'memo';
    memo.name = 'memo';
    memo.className = 'form2';
    memo.style.cssText = 'width:770px; margin:1px auto; padding:1px; height:300px';
    memoP.appendChild(memo);
    form.appendChild(memoP);

    // Button container for script buttons (hidden anchor as marker for p:has(a.butn))
    var btnContainer = document.createElement('p');
    var markerLink = document.createElement('a');
    markerLink.className = 'butn';
    markerLink.href = 'javascript:void(0)';
    markerLink.style.display = 'none';
    btnContainer.appendChild(markerLink);
    form.appendChild(btnContainer);

    var submitBtn = document.createElement('p');
    submitBtn.innerHTML = '<a href="javascript:void(0)" class="butn-green" onclick="this.closest(\'form\').submit(); return false;">Добавить новость</a>' +
      ' <a href="https://www.virtualsoccer.ru/federation.php?num=' + nationId + '" class="butn">Назад</a>';
    form.appendChild(submitBtn);

    // Insert form in a sensible place on the page — inside main content area
    if (mainContent) {
      var errorH1 = mainContent.querySelector('h1');
      var insertPoint = null;
      if (errorH1) {
        var sibling = errorH1.nextElementSibling;
        while (sibling && sibling.tagName === 'P') {
          insertPoint = sibling;
          sibling = sibling.nextElementSibling;
        }
      }
      if (insertPoint) {
        insertPoint.parentNode.insertBefore(form, insertPoint.nextSibling);
      } else if (errorH1) {
        errorH1.parentNode.insertBefore(form, errorH1.nextSibling);
      } else {
        mainContent.appendChild(form);
      }
    } else {
      document.body.appendChild(form);
    }
  }

  // ========== Add News Link (federation.php) ==========

  function initAddNewsLink() {
    var urlParams = new URLSearchParams(window.location.search);
    var num = urlParams.get('num');
    if (!num) return;

    var navPanels = document.querySelectorAll('div.lh16.txt');
    var navPanel = null;
    for (var i = 0; i < navPanels.length; i++) {
      if (navPanels[i].textContent.indexOf('Новости') !== -1 &&
          navPanels[i].textContent.indexOf('Команды') !== -1 &&
          navPanels[i].textContent.indexOf('Сборные') !== -1) {
        navPanel = navPanels[i];
        break;
      }
    }
    if (!navPanel) return;

    var link = document.createElement('a');
    link.href = 'fed_news.php?nation_id=' + num;
    link.textContent = 'Добавить новость';
    navPanel.appendChild(document.createTextNode(' | '));
    navPanel.appendChild(link);
  }

  // ========== Match Copy Buttons (v2champ.php) ==========

  function initMatchCopyButtons() {
    // Find all match rows: <tr> containing a[href*="viewmatch.php"] and two a[href*="roster.php"]
    var allRows = document.querySelectorAll('tr');
    var seen = {};

    for (var i = 0; i < allRows.length; i++) {
      var row = allRows[i];
      var vmLink = row.querySelector('a[href*="viewmatch.php"]');
      if (!vmLink) continue;
      var rosterLinks = row.querySelectorAll('a[href*="roster.php"]');
      if (rosterLinks.length < 2) continue;

      var href = vmLink.getAttribute('href') || '';
      var matchIdM = href.match(/[?&]match_id=(\d+)/);
      var dayM = href.match(/[?&]day=(\d+)/);
      if (!matchIdM || !dayM) continue;
      var matchId = matchIdM[1];
      if (seen[matchId]) continue;
      seen[matchId] = true;

      // Skip unplayed matches (previewmatch)
      if (row.querySelector('a[href*="previewmatch.php"]')) continue;

      // Add copy button to the score cell (the one containing viewmatch link)
      var scoreTd = vmLink.closest('td');
      if (!scoreTd) continue;

      var copyBtn = document.createElement('span');
      copyBtn.id = 'vsol-copy-match-' + matchId;
      copyBtn.textContent = '📋';
      copyBtn.title = 'Копировать BB-code матча';
      copyBtn.style.cssText = 'cursor:pointer; margin-left:4px; font-size:11px; opacity:0.6;';
      copyBtn.onmouseover = function() { this.style.opacity = '1'; };
      copyBtn.onmouseout = function() { this.style.opacity = '0.6'; };

      (function(mid, day, btn) {
        btn.onclick = function() {
          btn.textContent = '⏳';
          var matchUrl = SITE_CONFIG.BASE_URL + '/viewmatch.php?day=' + day + '&match_id=' + mid;
          httpGet(matchUrl, function(err, html) {
            if (err || !html) {
              btn.textContent = '❌';
              setTimeout(function() { btn.textContent = '📋'; }, 2000);
              return;
            }

            var header = parseMatchHeaderLocal(html);
            var strength = parseMatchStrengthLocal(html);
            var events = parseMatchEventsLocal(html);

            var parts = [];

            // Match header
            if (header) {
              parts.push('[table align=center border=0][tr][td][a href=' + matchUrl + ' target="_blank"][b]' +
                header.homeTeam + '[/b] - [b]' + header.awayTeam + '[/b]  ' + header.score + '[/a][/td][/tr][/table]');
            }

            // Strength
            if (strength) {
              function fmtStr(row) {
                if (!row) return '';
                var diff = Math.abs(row.awayValue - row.homeValue);
                var diffStr = diff > 0 ? '[small]+' + diff + '[/small]' : '';
                var hw = Math.max(row.homePercent - 10, 5);
                var aw = Math.max(row.awayPercent - 10, 5);
                var hd = row.homeValue >= row.awayValue ? diffStr : '';
                var ad = row.awayValue > row.homeValue ? diffStr : '';
                return '[table width=100%][tr]' +
                  '[td align=left]' + row.label + '[/td]' +
                  '[td bgcolor=#ff967e width=' + hw + '% align=center][b][color=#620]' + row.homeValue + hd + '[/color][/b][/td]' +
                  '[td bgcolor=#87e878 width=' + aw + '%][b][color=#060]' + row.awayValue + ad + '[/color][/b][/td]' +
                  '[/tr][/table]';
              }
              if (strength.start) parts.push(fmtStr(strength.start));
              if (strength.end) parts.push(fmtStr(strength.end));
            }

            // Events
            if (events && events.length > 0) {
              for (var ei = 0; ei < events.length; ei++) {
                var e = events[ei];
                var desc = e.descriptionBBCode || e.playerName;
                parts.push('[table width=70% align=center border=0][tr][td align=center]⚽ ' +
                  e.minute + "' " + desc + (e.score ? ' (' + e.score + ')' : '') +
                  '[/td][/tr][/table]');
              }
            }

            var bbcode = parts.join('\n');

            // Copy to clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(bbcode).then(function() {
                btn.textContent = '✅';
                setTimeout(function() { btn.textContent = '📋'; }, 2000);
              }).catch(function() {
                fallbackCopy(bbcode, btn);
              });
            } else {
              fallbackCopy(bbcode, btn);
            }
          });
        };
      })(matchId, dayM[1], copyBtn);

      scoreTd.appendChild(copyBtn);
    }

    function fallbackCopy(text, btn) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed; left:-9999px;';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        btn.textContent = '✅';
      } catch (e) {
        btn.textContent = '❌';
      }
      document.body.removeChild(ta);
      setTimeout(function() { btn.textContent = '📋'; }, 2000);
    }
  }

  // ========== Transfer Watch (manager_transflist.php) ==========

  var WATCH_STORAGE_KEY = 'vsol_transfer_watch';

  function getWatchList() {
    try {
      var raw = localStorage.getItem(WATCH_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function saveWatchList(list) {
    try { localStorage.setItem(WATCH_STORAGE_KEY, JSON.stringify(list)); } catch (e) {}
  }

  function initTransferWatch() {
    // Find the navigation bar: div.lh18.txtr containing "Выставить на рынок"
    var navDivs = document.querySelectorAll('div.lh18.txtr');
    var navDiv = null;
    for (var i = 0; i < navDivs.length; i++) {
      if (navDivs[i].textContent.indexOf('Выставить на рынок') !== -1) {
        navDiv = navDivs[i];
        break;
      }
    }
    if (!navDiv) return;

    // Add "Наблюдение" link to the nav bar
    var sep = document.createTextNode(' | ');
    navDiv.appendChild(sep);

    var watchLink = document.createElement('a');
    watchLink.id = 'vsol-watch-link';
    watchLink.href = 'javascript:void(0)';
    watchLink.className = 'mnu';
    watchLink.textContent = 'Наблюдение';
    watchLink.onclick = function() { toggleWatchPanel(); return false; };
    navDiv.appendChild(watchLink);

    // Create the watch panel (hidden by default)
    var panel = document.createElement('div');
    panel.id = 'vsol-watch-panel';
    panel.style.cssText = 'display:none; margin-top:10px; padding:8px; border:1px solid #ccc; background:#f8fff8;';

    // Input row: team number input + add button
    var inputRow = document.createElement('div');
    inputRow.id = 'vsol-watch-input-row';
    inputRow.style.cssText = 'margin-bottom:8px;';

    var inputLabel = document.createElement('span');
    inputLabel.id = 'vsol-watch-input-label';
    inputLabel.className = 'lh18 txt';
    inputLabel.textContent = 'Номер команды: ';
    inputRow.appendChild(inputLabel);

    var input = document.createElement('input');
    input.id = 'vsol-watch-input';
    input.type = 'text';
    input.className = 'form2';
    input.style.cssText = 'width:80px; margin-right:6px;';
    input.placeholder = 'num';
    inputRow.appendChild(input);

    var addBtn = document.createElement('a');
    addBtn.id = 'vsol-watch-add-btn';
    addBtn.href = 'javascript:void(0)';
    addBtn.className = 'butn';
    addBtn.textContent = 'Добавить';
    addBtn.onclick = function() {
      var teamNum = input.value.trim();
      if (!teamNum || isNaN(parseInt(teamNum, 10))) {
        alert('Введите номер команды');
        return;
      }
      addBtn.textContent = 'Загрузка...';
      // Fetch roster page to get team name
      httpGet(SITE_CONFIG.BASE_URL + '/roster.php?num=' + teamNum, function(err, html) {
        addBtn.textContent = 'Добавить';
        if (err || !html) {
          alert('Ошибка загрузки команды');
          return;
        }
        var doc = new DOMParser().parseFromString(html, 'text/html');
        // Team name from the page title or h1
        var teamName = '';
        var tmhd = doc.querySelector('.tmhd');
        if (tmhd) {
          teamName = tmhd.textContent.trim().replace(/\s*\([^)]+\)\s*$/, '');
        }
        if (!teamName) {
          var h1 = doc.querySelector('h1');
          if (h1) teamName = h1.textContent.trim();
        }
        if (!teamName) teamName = 'Команда #' + teamNum;

        var list = getWatchList();
        // Check for duplicates
        for (var wi = 0; wi < list.length; wi++) {
          if (list[wi].teamNum === teamNum) {
            alert('Команда уже в списке');
            return;
          }
        }
        list.push({ teamNum: teamNum, teamName: teamName, addedAt: Date.now() });
        saveWatchList(list);
        input.value = '';
        renderWatchList();
      });
    };
    inputRow.appendChild(addBtn);
    panel.appendChild(inputRow);

    // Watch list container
    var listContainer = document.createElement('div');
    listContainer.id = 'vsol-watch-list';
    panel.appendChild(listContainer);

    // Insert panel after the nav bar's parent td
    var parentTd = navDiv.closest('td');
    if (parentTd && parentTd.parentNode) {
      var panelRow = document.createElement('tr');
      panelRow.id = 'vsol-watch-panel-row';
      var panelTd = document.createElement('td');
      panelTd.id = 'vsol-watch-panel-td';
      panelTd.setAttribute('colspan', '2');
      panelTd.appendChild(panel);
      panelRow.appendChild(panelTd);
      parentTd.parentNode.parentNode.insertBefore(panelRow, parentTd.parentNode.nextSibling);
    }

    function toggleWatchPanel() {
      panel.style.display = panel.style.display === 'none' ? '' : 'none';
      if (panel.style.display !== 'none') renderWatchList();
    }

    function renderWatchList() {
      var list = getWatchList();
      listContainer.innerHTML = '';

      if (list.length === 0) {
        var empty = document.createElement('div');
        empty.id = 'vsol-watch-empty';
        empty.className = 'lh16 txt';
        empty.style.cssText = 'color:#888;';
        empty.textContent = 'Список наблюдения пуст';
        listContainer.appendChild(empty);
        return;
      }

      var table = document.createElement('table');
      table.id = 'vsol-watch-table';
      table.className = 'tbl';
      table.style.cssText = 'width:100%;';

      // Header
      var thead = document.createElement('thead');
      var headerRow = document.createElement('tr');
      headerRow.id = 'vsol-watch-table-header';
      headerRow.setAttribute('bgcolor', '#006600');
      var headers = ['Команда', 'Номер', ''];
      var headerKeys = ['team', 'num', 'actions'];
      for (var hi = 0; hi < headers.length; hi++) {
        var th = document.createElement('td');
        th.id = 'vsol-watch-col-' + headerKeys[hi];
        th.className = 'lh18 txtw';
        th.innerHTML = '<b>' + headers[hi] + '</b>';
        headerRow.appendChild(th);
      }
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Rows
      var tbody = document.createElement('tbody');
      for (var ri = 0; ri < list.length; ri++) {
        (function(entry, idx) {
          var tr = document.createElement('tr');
          tr.id = 'vsol-watch-row-' + idx;

          var tdName = document.createElement('td');
          tdName.id = 'vsol-watch-name-' + idx;
          tdName.className = 'lh16 txtl';
          var nameLink = document.createElement('a');
          nameLink.href = '/roster.php?num=' + entry.teamNum;
          nameLink.className = 'mnu';
          nameLink.target = '_blank';
          nameLink.textContent = entry.teamName;
          tdName.appendChild(nameLink);
          tr.appendChild(tdName);

          var tdNum = document.createElement('td');
          tdNum.id = 'vsol-watch-num-' + idx;
          tdNum.className = 'lh16 txt';
          tdNum.textContent = entry.teamNum;
          tr.appendChild(tdNum);

          var tdActions = document.createElement('td');
          tdActions.id = 'vsol-watch-actions-' + idx;
          tdActions.className = 'lh16 txt';
          var removeBtn = document.createElement('a');
          removeBtn.id = 'vsol-watch-remove-' + idx;
          removeBtn.href = 'javascript:void(0)';
          removeBtn.className = 'mnu';
          removeBtn.style.cssText = 'color:#990000;';
          removeBtn.textContent = '✕';
          removeBtn.title = 'Удалить из наблюдения';
          removeBtn.onclick = function() {
            var currentList = getWatchList();
            currentList.splice(idx, 1);
            saveWatchList(currentList);
            renderWatchList();
          };
          tdActions.appendChild(removeBtn);
          tr.appendChild(tdActions);

          tbody.appendChild(tr);
        })(list[ri], ri);
      }
      table.appendChild(tbody);
      listContainer.appendChild(table);
    }
  }

  // ========== Interseason Cup Results (fed_news.php) ==========

  function initInterseasonCupResults() {
    function parseCupTable(html) {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const headerRow = doc.querySelector('tr[bgcolor="#006600"]');
      if (!headerRow) return { headers: [], entries: [] };

      const headerCells = headerRow.querySelectorAll('td');
      const headers = [];
      for (const cell of headerCells) {
        headers.push(cell.textContent.trim());
      }

      const entries = [];
      const allRows = doc.querySelectorAll('tr');
      for (const row of allRows) {
        if (row === headerRow) continue;
        const cells = row.querySelectorAll('td');
        if (cells.length < 6) continue;

        // Column 0 is № (row number), Column 1 is Див, Column 2 is №№
        const rowNum = cells[0]?.textContent.trim().replace(/\.$/, '');
        const div = cells[1]?.textContent.trim();
        const nnText = cells[2]?.textContent.replace(/[^0-9]/g, '');
        const nn = parseInt(nnText, 10);
        if (isNaN(nn)) continue;

        // Find team name cell — the one containing an <a> with href to roster.php
        var teamName = '';
        var teamHref = '';
        for (var ci = 3; ci < cells.length; ci++) {
          var link = cells[ci].querySelector('a[href*="roster.php"]');
          if (link) {
            teamName = link.textContent.trim();
            teamHref = link.getAttribute('href') || '';
            break;
          }
        }
        if (!teamName) continue;

        // Stats columns start after the team name cell (ci+1)
        const cols = [];
        for (let i = ci + 1; i < cells.length; i++) {
          cols.push(cells[i].textContent.trim());
        }

        entries.push({ nn, rowNum, div, teamName, teamLink: teamHref, cols });
      }

      return { headers, entries };
    }

    function filterAndSort(entries) {
      return entries
        .filter(function (e) { return e.nn >= 1 && e.nn <= 100; })
        .sort(function (a, b) { return a.nn - b.nn; });
    }

    function formatBBCode(entries, headers) {
      var lines = [];
      var headerCells = headers.map(function(h) { return '[td]' + h + '[/td]'; }).join('');
      lines.push('[tr]' + headerCells + '[/tr]');
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        var link = e.teamLink;
        if (link && !link.startsWith('http')) {
          link = SITE_CONFIG.BASE_URL + '/' + link.replace(/^\//, '');
        }
        var teamCell = '[a href=' + link + ' target="_blank"]' + e.teamName + '[/a]';
        var parts = [e.rowNum || String(i + 1), e.div || '', String(e.nn), teamCell];
        for (var j = 0; j < e.cols.length; j++) {
          parts.push(e.cols[j]);
        }
        var rowCells = parts.map(function(p) { return '[td]' + p + '[/td]'; }).join('');
        lines.push('[tr]' + rowCells + '[/tr]');
      }
      return '[table width="100%"]\n' + lines.join('\n') + '\n[/table]';
    }

    function insertIntoMemo(text) {
      var memo = document.getElementById('memo');
      if (!memo) return;
      memo.value = memo.value ? memo.value + '\n\n' + text : text;
      memo.dispatchEvent(new Event('change'));
      if (typeof preview === 'function') preview();
    }

    function fetchCurrentSeason(callback) {
      var url = SITE_CONFIG.BASE_URL + '/roster_m.php';
      httpGet(url, function(err, html) {
        if (err || !html) { callback(null); return; }
        var match = html.match(/season=(\d+)/);
        callback(match ? match[1] : null);
      });
    }

    // --- Entry point ---
    var urlParams = new URLSearchParams(window.location.search);
    var nationId = urlParams.get('nation_id');
    if (!nationId) return;

    var btnContainer = document.querySelector('p:has(a.butn)');
    if (!btnContainer) return;

    var btn = document.createElement('a');
    btn.href = 'javascript:void(0)';
    btn.className = 'butn';
    btn.textContent = 'Итоги Кубка Межсезонья';
    btn.style.marginLeft = '5px';

    btn.onclick = function() {
      btn.textContent = 'Загрузка...';
      fetchCurrentSeason(function(season) {
        if (!season) {
          alert('Ошибка: не удалось определить текущий сезон');
          btn.textContent = 'Итоги Кубка Межсезонья';
          return;
        }
        var cupUrl = SITE_CONFIG.BASE_URL + '/cupm_table.php?season=' + season + '&div=1&sort=' + nationId;
        httpGet(cupUrl, function(err, html) {
          if (err || !html) {
            alert('Ошибка загрузки таблицы Кубка Межсезонья');
            btn.textContent = 'Итоги Кубка Межсезонья';
            return;
          }
          var result = parseCupTable(html);
          var filtered = filterAndSort(result.entries);
          var bbcode = formatBBCode(filtered, result.headers);
          insertIntoMemo(bbcode);
          btn.textContent = 'Итоги Кубка Межсезонья';
        });
      });
    };

    btnContainer.insertBefore(btn, btnContainer.firstChild);
  }

  // ========== Continental Cups (fed_news.php) ==========

  function initContinentalCups(nationId) {
    if (!nationId) return;
    var btnContainer = document.querySelector('p:has(a.butn)');
    if (!btnContainer) return;

    var btn = document.createElement('a');
    btn.href = 'javascript:void(0)';
    btn.className = 'butn';
    btn.textContent = 'Мирокубки отборы';
    btn.style.marginLeft = '5px';

    btn.onclick = function() {
      btn.textContent = 'Загрузка...';

      // Step 1: fetch teams_cntr.php to build teamNum → manager map
      httpGet(SITE_CONFIG.BASE_URL + '/teams_cntr.php?num=' + nationId, function(errT, htmlT) {
        var managerMap = {};
        if (!errT && htmlT) {
          var docT = new DOMParser().parseFromString(htmlT, 'text/html');
          var teamRows = docT.querySelectorAll('tr');
          for (var ri = 0; ri < teamRows.length; ri++) {
            var teamLink = teamRows[ri].querySelector('a[href*="roster.php"]');
            var mgrLink  = teamRows[ri].querySelector('a[href*="v3_profile.php"]');
            if (!teamLink || !mgrLink) continue;
            var tHref = teamLink.getAttribute('href') || '';
            var tNum  = (tHref.match(/[?&]num=(\d+)/) || [])[1];
            var mHref = mgrLink.getAttribute('href') || '';
            var mNum  = (mHref.match(/[?&]num=(\d+)/) || [])[1];
            // Nick is in td[5] (6th td), full name is in td[4] via v3_profile link
            var tds = teamRows[ri].querySelectorAll('td');
            var mNick = tds.length > 5 ? tds[5].textContent.trim() : '';
            if (!mNick) mNick = mgrLink.textContent.trim(); // fallback to full name
            if (tNum && mNum && mNick) {
              managerMap[tNum] = { nick: mNick, num: mNum };
            }
          }
        }

        // Step 2: fetch cup page
        setTimeout(function() {
          httpGet(SITE_CONFIG.BASE_URL + '/fed_continental_cups.php?num=' + nationId, function(err, html) {
            if (err || !html) {
              alert('Ошибка загрузки мирокубков');
              btn.textContent = 'Мирокубки отборы';
              return;
            }

            var entries = parseContinentalCups(html);
            if (!entries.length) {
              alert('Данные мирокубков не найдены');
              btn.textContent = 'Мирокубки отборы';
              return;
            }

            // Attach manager info
            for (var i = 0; i < entries.length; i++) {
              var mgr = managerMap[entries[i].teamNum];
              if (mgr) {
                entries[i].managerNick = mgr.nick;
                entries[i].managerNum  = mgr.num;
              }
            }

            var bbcode = formatContinentalCupsBBCode(entries);
            var memo = document.getElementById('memo');
            if (memo) {
              memo.value = memo.value ? memo.value + '\n\n' + bbcode : bbcode;
              memo.dispatchEvent(new Event('input'));
            }
            btn.textContent = 'Мирокубки отборы';
          });
        }, 300);
      });
    };

    btnContainer.insertBefore(btn, btnContainer.firstChild);
  }

  function parseContinentalCups(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');

    // Find the main cup table: table.tbl with style containing margin-bottom:10px
    var tables = doc.querySelectorAll('table.tbl');
    var mainTable = null;
    for (var i = 0; i < tables.length; i++) {
      var style = tables[i].getAttribute('style') || '';
      if (style.indexOf('margin-bottom') !== -1) {
        mainTable = tables[i];
        break;
      }
    }
    if (!mainTable) return [];

    var entries = [];
    var rows = mainTable.querySelectorAll('tr');

    for (var ri = 0; ri < rows.length; ri++) {
      var row = rows[ri];
      // Skip header row
      if (row.getAttribute('bgcolor') === '#006600') continue;

      // Get direct td children only (not nested)
      var tds = row.querySelectorAll(':scope > td');
      if (tds.length < 6) continue;

      // td[0]: position number
      var pos = tds[0].textContent.trim().replace('.', '');
      if (!pos || isNaN(parseInt(pos, 10))) continue;

      // td[1]: cup name
      var cupName = tds[1].textContent.trim();

      // td[2]: team link + stage badge img
      var teamLink = tds[2].querySelector('a[href*="roster.php"]');
      if (!teamLink) continue;
      var teamHref = teamLink.getAttribute('href') || '';
      var teamNum = (teamHref.match(/[?&]num=(\d+)/) || [])[1] || '';
      // Team name: strip city in parentheses
      var teamName = teamLink.textContent.trim().replace(/\s*\([^)]+\)\s*$/, '');

      // Stage from img title in td[2]: title="<b>CupName</b></br>StageName"
      var stageImg = tds[2].querySelector('img[title]');
      var stageName = '';
      if (stageImg) {
        var title = stageImg.getAttribute('title') || '';
        // Decode HTML entities and extract stage after </br>
        var decoded = title.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        var stageMatch = decoded.match(/<\/b><\/br>([^"]+)/);
        if (stageMatch) stageName = stageMatch[1].trim();
      }

      // td[5]: qualification method
      var qualification = tds[5].textContent.trim();

      entries.push({
        pos: parseInt(pos, 10),
        cupName: cupName,
        teamName: teamName,
        teamNum: teamNum,
        stageName: stageName,
        qualification: qualification
      });
    }

    return entries;
  }

  function formatContinentalCupsBBCode(entries) {
    // Assign row colors: first cup = #FFCCFF, subsequent cups = #FFEE88
    // Determine the "top" cup (first entry's cup name)
    var topCup = entries.length > 0 ? entries[0].cupName : '';

    var header = '[table width=100% align=center border=1]' +
      '[tr]' +
      '[td bgcolor=darkgreen width=25%][color=#FFFFE3][b]Команда[/b][/color][/td]' +
      '[td bgcolor=darkgreen width=25%][color=#FFFFE3][b]Менеджер[/b][/color][/td]' +
      '[td bgcolor=darkgreen width=25%][color=#FFFFE3][b]Результат[/b][/color][/td]' +
      '[td bgcolor=darkgreen][color=#FFFFE3][b]Турнир[/b][/color][/td]' +
      '[/tr]';

    var rows = entries.map(function(e) {
      var bg = e.cupName === topCup ? '#FFCCFF' : '#FFEE88';
      var teamHref = e.teamNum ? '/roster.php?num=' + e.teamNum : '#';
      var stageAndCup = e.stageName ? e.stageName + ' ' + e.cupName : e.cupName;

      var managerCell = '';
      if (e.managerNick && e.managerNum) {
        managerCell = '[a href=/v3_profile.php?num=' + e.managerNum + ' target="_blank"][b][color=#060]' + e.managerNick + '[/color][/b][/a]';
      }

      return '[tr]' +
        '[td bgcolor=' + bg + '][a href=' + teamHref + ' target="_blank"][b][color=#060]' + e.teamName + '[/color][/b][/a][/td]' +
        '[td bgcolor=' + bg + ']' + managerCell + '[/td]' +
        '[td bgcolor=' + bg + '][b][color=#060]' + e.qualification + '[/color][/b][/td]' +
        '[td bgcolor=' + bg + '][b][color=#060]' + stageAndCup + '[/color][/b][/td]' +
        '[/tr]';
    });

    return header + '\n' + rows.join('\n') + '\n[/table]';
  }

  // ========== Played Continental Cup Matches (fed_news.php) ==========

  function initPlayedContinentalCupMatches(nationId) {
    if (!nationId) return;
    var btnContainer = document.querySelector('p:has(a.butn)');
    if (!btnContainer) return;

    var btn = document.createElement('a');
    btn.href = 'javascript:void(0)';
    btn.className = 'butn';
    btn.textContent = 'Сыгранные мирокубки';
    btn.style.marginLeft = '5px';

    btn.onclick = function() {
      btn.textContent = 'Загрузка...';

      // Remove existing select if any
      var existing = btnContainer.querySelector('#cup-team-selector');
      if (existing) existing.remove();

      // Fetch cup page to get list of teams
      httpGet(SITE_CONFIG.BASE_URL + '/fed_continental_cups.php?num=' + nationId, function(err, html) {
        if (err || !html) {
          alert('Ошибка загрузки мирокубков');
          btn.textContent = 'Сыгранные мирокубки';
          return;
        }

        var entries = parseContinentalCups(html);
        if (!entries.length) {
          alert('Команды в мирокубках не найдены');
          btn.textContent = 'Сыгранные мирокубки';
          return;
        }

        // Deduplicate teams
        var seen = {};
        var teams = [];
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (!seen[e.teamNum]) {
            seen[e.teamNum] = true;
            teams.push({ teamNum: e.teamNum, teamName: e.teamName });
          }
        }

        // Build select
        var select = document.createElement('select');
        select.id = 'cup-team-selector';
        select.style.marginLeft = '5px';

        var defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = '— Выберите команду —';
        select.appendChild(defaultOpt);

        for (var ti = 0; ti < teams.length; ti++) {
          var opt = document.createElement('option');
          opt.value = teams[ti].teamNum;
          opt.textContent = teams[ti].teamName;
          select.appendChild(opt);
        }

        select.onchange = function() {
          var teamNum = select.value;
          if (!teamNum) return;
          var teamName = select.options[select.selectedIndex].textContent;
          select.disabled = true;
          btn.textContent = 'Загрузка матчей...';

          httpGet(SITE_CONFIG.BASE_URL + '/roster_m.php?num=' + teamNum, function(errR, htmlR) {
            if (errR || !htmlR) {
              alert('Ошибка загрузки матчей');
              select.disabled = false;
              btn.textContent = 'Сыгранные мирокубки';
              return;
            }

            // Parse cup matches from roster_m.php
            var cupMatches = parseCupMatchesFromRoster(htmlR);
            if (!cupMatches.length) {
              alert('Сыгранных матчей в мирокубках не найдено');
              select.disabled = false;
              btn.textContent = 'Сыгранные мирокубки';
              return;
            }

            // Load each match sequentially
            var matchIndex = 0;
            var sections = [];

            function loadNextCupMatch() {
              if (matchIndex >= cupMatches.length) {
                // All done — format and insert
                var bbcode = formatCupMatchesBBCode(teamName, sections);
                var memo = document.getElementById('memo');
                if (memo) {
                  memo.value = memo.value ? memo.value + '\n\n' + bbcode : bbcode;
                  memo.dispatchEvent(new Event('input'));
                }
                select.disabled = false;
                btn.textContent = 'Сыгранные мирокубки';
                return;
              }

              var match = cupMatches[matchIndex++];
              btn.textContent = 'Загрузка ' + matchIndex + '/' + cupMatches.length + '...';

              setTimeout(function() {
                httpGet(match.matchUrl, function(errM, htmlM) {
                  if (!errM && htmlM) {
                    var strength = parseMatchStrengthLocal(htmlM);
                    var events   = parseMatchEventsLocal(htmlM);
                    var header   = parseMatchHeaderLocal(htmlM);
                    sections.push({
                      match: match,
                      strength: strength,
                      events: events,
                      header: header
                    });
                  }
                  loadNextCupMatch();
                });
              }, 300);
            }

            loadNextCupMatch();
          });
        };

        btn.parentNode.insertBefore(select, btn.nextSibling);
        btn.textContent = 'Сыгранные мирокубки';
      });
    };

    btnContainer.insertBefore(btn, btnContainer.firstChild);
  }

  function parseCupMatchesFromRoster(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var rows = doc.querySelectorAll('table.tbl tr');
    var matches = [];

    // Find «Стадия» column index from header row
    var stageIndex = 6; // default fallback
    var headerRow = doc.querySelector('table.tbl tr[bgcolor="#006600"]');
    if (headerRow) {
      var headerTds = headerRow.querySelectorAll('td');
      for (var hi = 0; hi < headerTds.length; hi++) {
        if (/Стадия/i.test(headerTds[hi].textContent)) { stageIndex = hi; break; }
      }
    }

    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var tds = row.querySelectorAll('td');
      if (tds.length < 11) continue;

      // Filter: tournament cell (td[2]) must contain confederation_cup.php link
      var cupLink = tds[2].querySelector('a[href*="confederation_cup"]');
      if (!cupLink) continue;

      // Skip unplayed matches
      var resultTd = tds[4];
      if (!resultTd || !resultTd.hasAttribute('title')) continue;
      if (resultTd.getAttribute('title').trim() === 'Матч ещё не сыгран') continue;

      var tournamentName = cupLink.textContent.trim();
      var stageName = tds[stageIndex] ? tds[stageIndex].textContent.trim() : '';
      var opponent = tds[3] ? tds[3].textContent.trim() : '';
      var result = resultTd.textContent.trim();
      var homeAway = tds[5] ? tds[5].textContent.trim() : '';

      // Match link in td[10]
      var matchAnchor = tds[10] ? tds[10].querySelector('a[href*="viewmatch.php"]') : null;
      if (!matchAnchor) continue;

      var matchHref = matchAnchor.getAttribute('href') || '';
      var matchUrl = matchHref.startsWith('http') ? matchHref : SITE_CONFIG.BASE_URL + '/' + matchHref.replace(/^\//, '');

      matches.push({
        tournamentName: tournamentName,
        stageName: stageName,
        opponent: opponent,
        result: result,
        homeAway: homeAway,
        matchUrl: matchUrl
      });
    }

    return matches;
  }

  function formatCupMatchesBBCode(teamName, sections) {
    if (!sections.length) return '';

    var parts = [];
    parts.push('[b]Мирокубки — ' + teamName + '[/b]');
    parts.push('[hr]');

    for (var i = 0; i < sections.length; i++) {
      var s = sections[i];
      var m = s.match;

      // Match header: tournament + stage
      parts.push('[b]' + m.tournamentName + (m.stageName ? ' — ' + m.stageName : '') + '[/b]');

      // Match link — use header from viewmatch.php if available, plain text team names
      var matchTitle;
      if (s.header && s.header.homeTeam && s.header.awayTeam) {
        matchTitle = '[b]' + s.header.homeTeam + '[/b] - [b]' + s.header.awayTeam + '[/b]  ' + (s.header.score || m.result);
      } else {
        matchTitle = (m.homeAway === 'Д' ? teamName + ' - ' + m.opponent : m.opponent + ' - ' + teamName) + '  ' + m.result;
      }
      parts.push(
        '[table align=center border=0][tr][td]' +
        '[a href=' + m.matchUrl + ' target="_blank"]' + matchTitle + '[/a]' +
        '[/td][/tr][/table]'
      );

      // Strength
      if (s.strength) {
        var sLines = [];
        function fmtRow(row) {
          if (!row) return '';
          var diff = Math.abs(row.awayValue - row.homeValue);
          var diffStr = diff > 0 ? '[small]+' + diff + '[/small]' : '';
          var hw = Math.max(row.homePercent - 10, 5);
          var aw = Math.max(row.awayPercent - 10, 5);
          var hd = row.homeValue >= row.awayValue ? diffStr : '';
          var ad = row.awayValue > row.homeValue ? diffStr : '';
          return '[table width=100%][tr]' +
            '[td align=left]' + row.label + '[/td]' +
            '[td bgcolor=#ff967e width=' + hw + '% align=center][b][color=#620]' + row.homeValue + hd + '[/color][/b][/td]' +
            '[td bgcolor=#87e878 width=' + aw + '%][b][color=#060]' + row.awayValue + ad + '[/color][/b][/td]' +
            '[/tr][/table]';
        }
        if (s.strength.start) sLines.push(fmtRow(s.strength.start));
        if (s.strength.end) sLines.push(fmtRow(s.strength.end));
        if (sLines.length) parts.push(sLines.join('\n'));
      }

      // Events
      if (s.events && s.events.length > 0) {
        for (var ei = 0; ei < s.events.length; ei++) {
          var e = s.events[ei];
          var desc = e.descriptionBBCode || e.playerName;
          parts.push('[table width=70% align=center border=0][tr][td align=center]⚽ ' +
            e.minute + "' " + desc + (e.score ? ' (' + e.score + ')' : '') +
            '[/td][/tr][/table]');
        }
      }

      if (i < sections.length - 1) parts.push('');
    }

    return parts.join('\n');
  }

  // ========== League Table (fed_news.php) ==========

  function initLeagueTable() {
    // --- Pure functions (copied from src/ modules) ---

    function parseDivisionLinks(html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var anchors = doc.querySelectorAll('a[href*="v2champ.php"]');
      var results = [];
      var seen = {};

      for (var i = 0; i < anchors.length; i++) {
        var a = anchors[i];
        var name = a.textContent.trim();
        // Skip empty and purely numeric names (team position numbers)
        if (!name || /^\d+$/.test(name)) continue;

        var url = a.getAttribute('href') || '';
        var match = url.match(/[?&]num=(\d+)/);
        var divisionId = match ? match[1] : '';
        if (!divisionId || seen[divisionId]) continue;
        seen[divisionId] = true;

        results.push({ name: name, url: url, divisionId: divisionId });
      }

      return results;
    }

    function parseDivisionTable(html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');

      var tables = doc.querySelectorAll('table.tbl');
      var targetTable = null;

      for (var ti = 0; ti < tables.length; ti++) {
        var headerRow = tables[ti].querySelector('tr[bgcolor="#006600"]');
        if (!headerRow) continue;
        var text = headerRow.textContent;
        if (text.indexOf('Команда') !== -1 && text.indexOf('М') !== -1) {
          targetTable = tables[ti];
          break;
        }
      }

      if (!targetTable) return null;

      var rows = [];
      var allRows = targetTable.querySelectorAll(':scope > tbody > tr, :scope > tr');

      for (var ri = 0; ri < allRows.length; ri++) {
        var row = allRows[ri];
        if (row.getAttribute('bgcolor') === '#006600') continue;

        var teamAnchor = row.querySelector('a[href*="roster.php"]');
        if (!teamAnchor) continue;

        var teamName = teamAnchor.textContent.trim();
        var teamLink = teamAnchor.getAttribute('href') || '';

        var posTable = row.querySelector('table.nil');
        var position = '';
        if (posTable) {
          var b = posTable.querySelector('b');
          if (b) position = b.textContent.trim();
        }

        var cells = row.querySelectorAll(':scope > td');

        var teamCellIndex = -1;
        for (var ci = 0; ci < cells.length; ci++) {
          if (cells[ci].querySelector('a[href*="roster.php"]')) {
            teamCellIndex = ci;
            break;
          }
        }
        if (teamCellIndex < 0) continue;

        var games = cells[teamCellIndex + 1] ? cells[teamCellIndex + 1].textContent.trim() : '';
        var wins = cells[teamCellIndex + 2] ? cells[teamCellIndex + 2].textContent.trim() : '';
        var draws = cells[teamCellIndex + 3] ? cells[teamCellIndex + 3].textContent.trim() : '';
        var losses = cells[teamCellIndex + 4] ? cells[teamCellIndex + 4].textContent.trim() : '';

        var goalsCell = cells[teamCellIndex + 5];
        var goalsFor = '';
        var goalsAgainst = '';
        if (goalsCell) {
          var goalsTds = goalsCell.querySelectorAll('table td');
          if (goalsTds.length >= 3) {
            goalsFor = goalsTds[0].textContent.trim();
            goalsAgainst = goalsTds[2].textContent.trim();
          }
        }

        var goalDiff = cells[teamCellIndex + 6] ? cells[teamCellIndex + 6].textContent.trim() : '';
        var points = cells[teamCellIndex + 7] ? cells[teamCellIndex + 7].textContent.trim() : '';
        var vs = cells[teamCellIndex + 8] ? cells[teamCellIndex + 8].textContent.trim() : '';
        var rm = cells[teamCellIndex + 10] ? cells[teamCellIndex + 10].textContent.trim() : '';

        rows.push({
          position: position,
          teamName: teamName,
          teamLink: teamLink,
          games: games,
          wins: wins,
          draws: draws,
          losses: losses,
          goalsFor: goalsFor,
          goalsAgainst: goalsAgainst,
          goalDiff: goalDiff,
          points: points,
          vs: vs,
          rm: rm
        });
      }

      if (rows.length === 0) return null;

      return { rows: rows };
    }

    function formatDivisionTableBBCode(data, divisionName) {
      var lines = [];

      var headers = ['М', 'Команда', 'И', 'В', 'Н', 'П', 'М', '+/-', 'О', 'Vs', 'РМ'];
      var headerCells = headers.map(function(h) { return '[td]' + h + '[/td]'; }).join('');
      lines.push('[tr]' + headerCells + '[/tr]');

      for (var i = 0; i < data.rows.length; i++) {
        var row = data.rows[i];
        var tLink = row.teamLink || '';
        if (tLink && !tLink.startsWith('http') && !tLink.startsWith('/')) tLink = '/' + tLink;
        var teamCell = '[a href=' + tLink + ' target="_blank"]' + row.teamName + '[/a]';
        var goals = row.goalsFor + ' - ' + row.goalsAgainst;
        var rowCells = [
          row.position,
          teamCell,
          row.games,
          row.wins,
          row.draws,
          row.losses,
          goals,
          row.goalDiff,
          row.points,
          row.vs,
          row.rm
        ].map(function(c) { return '[td]' + c + '[/td]'; }).join('');
        lines.push('[tr]' + rowCells + '[/tr]');
      }

      return '[b]' + divisionName + '[/b]\n\n[table width=70% align=center]\n' + lines.join('\n') + '\n[/table]';
    }

    function insertIntoMemo(text) {
      var memo = document.getElementById('memo');
      if (!memo) return;
      memo.value = memo.value ? memo.value + '\n\n' + text : text;
      memo.dispatchEvent(new Event('change'));
      if (typeof preview === 'function') preview();
    }

    // --- Entry point ---
    var urlParams = new URLSearchParams(window.location.search);
    var nationId = urlParams.get('nation_id');
    if (!nationId) return;

    var btnContainer = document.querySelector('p:has(a.butn)');
    if (!btnContainer) return;

    var btn = document.createElement('a');
    btn.href = 'javascript:void(0)';
    btn.className = 'butn';
    btn.textContent = 'Таблица дивизиона';
    btn.style.marginLeft = '5px';

    btn.onclick = function() {
      btn.textContent = 'Загрузка...';
      var teamsUrl = SITE_CONFIG.BASE_URL + '/teams_cntr.php?num=' + nationId;
      httpGet(teamsUrl, function(err, html) {
        if (err || !html) {
          alert('Ошибка загрузки списка дивизионов');
          btn.textContent = 'Таблица дивизиона';
          return;
        }
        var divisions = parseDivisionLinks(html);
        if (!divisions.length) {
          alert('Дивизионы не найдены');
          btn.textContent = 'Таблица дивизиона';
          return;
        }
        var existingSelect = btnContainer.querySelector('#division-selector');
        if (existingSelect) existingSelect.remove();
        var select = document.createElement('select');
        select.id = 'division-selector';
        select.style.marginLeft = '5px';
        var defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '— Выберите дивизион —';
        select.appendChild(defaultOption);
        for (var i = 0; i < divisions.length; i++) {
          var opt = document.createElement('option');
          opt.value = divisions[i].divisionId;
          opt.textContent = divisions[i].name;
          opt.setAttribute('data-url', divisions[i].url);
          opt.setAttribute('data-name', divisions[i].name);
          select.appendChild(opt);
        }
        select.onchange = function() {
          var divisionId = select.value;
          if (!divisionId) return;
          var selectedOption = select.options[select.selectedIndex];
          var divName = selectedOption.getAttribute('data-name') || '';
          btn.textContent = 'Загрузка таблицы...';
          var champUrl = SITE_CONFIG.BASE_URL + '/v2champ.php?num=' + divisionId;
          httpGet(champUrl, function(err2, html2) {
            if (err2 || !html2) {
              alert('Ошибка загрузки таблицы дивизиона');
              btn.textContent = 'Таблица дивизиона';
              return;
            }
            var data = parseDivisionTable(html2);
            if (!data) {
              alert('Таблица не найдена');
              btn.textContent = 'Таблица дивизиона';
              return;
            }
            var bbcode = formatDivisionTableBBCode(data, divName);
            insertIntoMemo(bbcode);
            btn.textContent = 'Таблица дивизиона';
          });
        };
        btn.parentNode.insertBefore(select, btn.nextSibling);
        btn.textContent = 'Таблица дивизиона';
      });
    };

    btnContainer.insertBefore(btn, btnContainer.firstChild);
  }

  // ========== Played National Team Matches (fed_news.php) ==========

  function initPlayedNationalTeamMatches() {
    // --- Constants ---
    var TEAM_TYPES = [
      { type: 0, name: 'Национальная', suffix: '(нац.)' },
      { type: 1, name: 'Молодёжная',   suffix: '(мол.)' },
      { type: 2, name: 'Юношеская',    suffix: '(юн.)' }
    ];

    // --- Pure functions (copied from src/ modules) ---

    function parseNationNum(html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var link = doc.querySelector('a[href*="nation.php?num="]');
      if (link) {
        var m = link.getAttribute('href').match(/num=(\d+)/);
        if (m) return m[1];
      }
      return null;
    }

    function parseGroupTable(html, fedNationNum) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var headerRows = doc.querySelectorAll('tr[bgcolor="#006600"]');
      var targetTable = null;
      for (var hi = 0; hi < headerRows.length; hi++) {
        var text = headerRows[hi].textContent;
        if (!text.includes('Команда')) continue;
        var parentTable = headerRows[hi].closest('table');
        if (!parentTable) continue;
        var nationLink = parentTable.querySelector('a[href*="nation.php?num=' + fedNationNum + '"]');
        if (nationLink) {
          targetTable = parentTable;
          break;
        }
      }
      if (!targetTable) return null;
      var headerRow = targetTable.querySelector('tr[bgcolor="#006600"]');
      if (!headerRow) return null;
      var headerCells = headerRow.querySelectorAll('td');
      var headers = [];
      for (var hci = 0; hci < headerCells.length; hci++) {
        headers.push(headerCells[hci].textContent.trim());
      }
      if (headers.length < 3) return null;
      var rows = [];
      var highlightIndex = -1;
      var allRows = targetTable.querySelectorAll('tr');
      for (var ri = 0; ri < allRows.length; ri++) {
        var row = allRows[ri];
        if (row === headerRow) continue;
        var cells = row.querySelectorAll('td');
        if (cells.length < 3) continue;
        var teamName = '';
        var teamLink = '';
        var linkCellIndex = -1;
        for (var ci = 0; ci < cells.length; ci++) {
          var lnk = cells[ci].querySelector('a[href*="nation.php"]');
          if (lnk) {
            teamName = lnk.textContent.trim();
            teamLink = lnk.getAttribute('href') || '';
            linkCellIndex = ci;
            break;
          }
        }
        if (!teamName || linkCellIndex < 0) continue;
        var position = cells[0].textContent.trim().replace(/\.$/, '');
        var stats = [];
        for (var si = linkCellIndex + 1; si < cells.length; si++) {
          stats.push(cells[si].textContent.trim());
        }
        var isCurrentFed = teamLink.includes('num=' + fedNationNum);
        if (isCurrentFed) highlightIndex = rows.length;
        rows.push({ position: position, teamName: teamName, teamLink: teamLink, stats: stats, isCurrentFed: isCurrentFed });
      }
      if (rows.length === 0) return null;
      return { headers: headers, rows: rows, highlightIndex: highlightIndex };
    }

    function extractCountryFromHeader(doc) {
      var hdr = doc.querySelector('td.hdr2l a');
      if (hdr) {
        var text = hdr.textContent.trim();
        var cleaned = text.replace(/\s*\([^)]+\)\s*$/, '').trim();
        if (cleaned) return cleaned;
      }
      var hdrCells = doc.querySelectorAll('[class*="hdr2l"]');
      for (var i = 0; i < hdrCells.length; i++) {
        var link = hdrCells[i].querySelector('a');
        if (link) {
          var t = link.textContent.trim();
          var c = t.replace(/\s*\([^)]+\)\s*$/, '').trim();
          if (c) return c;
        }
      }
      return '';
    }

    function parsePlayedMatch(html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var allLinks = doc.querySelectorAll('a[href*="viewmatch.php"]');
      // Collect all played match links (exclude previewmatch), take the LAST one
      var viewMatchLink = null;
      for (var li = 0; li < allLinks.length; li++) {
        var h = allLinks[li].getAttribute('href') || '';
        if (h.includes('previewmatch.php')) continue;
        viewMatchLink = allLinks[li]; // keep overwriting — last one wins
      }
      if (!viewMatchLink) return null;
      var matchUrl = viewMatchLink.getAttribute('href') || '';
      var score = viewMatchLink.textContent.trim();
      var parentDiv = viewMatchLink.closest('div');
      var country2 = '';
      var isAway = false;
      if (parentDiv) {
        var divText = parentDiv.textContent;
        if (/- Г -/.test(divText)) {
          isAway = true;
        }
        var opponentLink = parentDiv.querySelector('a[href*="nation.php?num="]');
        if (opponentLink) {
          var opponentText = opponentLink.textContent.trim();
          country2 = opponentText.replace(/\s*\((?:юн|мол|нац)\.?\)\s*$/, '').trim();
        }
      }
      var country1 = extractCountryFromHeader(doc);
      if (!matchUrl || !score) return null;
      return { matchUrl: matchUrl, country1: country1, country2: country2, score: score, isAway: isAway };
    }

    function parseWorldcupLink(html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var link = doc.querySelector('a[href*="worldcup.php"]');
      if (!link) return null;
      var href = link.getAttribute('href') || '';
      var hashIndex = href.indexOf('#');
      if (hashIndex !== -1) {
        href = href.substring(0, hashIndex);
      }
      return href || null;
    }

    function isoToFlagEmoji(iso) {
      if (iso === 'ENGLAND') return '\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}';
      if (iso === 'SCOTLAND') return '\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}';
      if (iso === 'WALES') return '\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}';
      if (iso === 'NIR') return '\u{1F3F4}\u{E0067}\u{E0062}\u{E006E}\u{E0069}\u{E0072}\u{E007F}';
      var upper = iso.toUpperCase();
      return String.fromCodePoint(
        0x1F1E6 + upper.charCodeAt(0) - 65,
        0x1F1E6 + upper.charCodeAt(1) - 65
      );
    }

    var COUNTRY_ISO = {
      'Россия': 'RU', 'России': 'RU',
      'Украина': 'UA', 'Украины': 'UA',
      'Беларусь': 'BY', 'Беларуси': 'BY',
      'Польша': 'PL', 'Польши': 'PL',
      'Германия': 'DE', 'Германии': 'DE',
      'Франция': 'FR', 'Франции': 'FR',
      'Испания': 'ES', 'Испании': 'ES',
      'Италия': 'IT', 'Италии': 'IT',
      'Англия': 'ENGLAND', 'Англии': 'ENGLAND',
      'Португалия': 'PT', 'Португалии': 'PT',
      'Нидерланды': 'NL', 'Нидерландов': 'NL',
      'Бельгия': 'BE', 'Бельгии': 'BE',
      'Швеция': 'SE', 'Швеции': 'SE',
      'Норвегия': 'NO', 'Норвегии': 'NO',
      'Дания': 'DK', 'Дании': 'DK',
      'Финляндия': 'FI', 'Финляндии': 'FI',
      'Чехия': 'CZ', 'Чехии': 'CZ',
      'Словакия': 'SK', 'Словакии': 'SK',
      'Австрия': 'AT', 'Австрии': 'AT',
      'Швейцария': 'CH', 'Швейцарии': 'CH',
      'Хорватия': 'HR', 'Хорватии': 'HR',
      'Сербия': 'RS', 'Сербии': 'RS',
      'Греция': 'GR', 'Греции': 'GR',
      'Турция': 'TR', 'Турции': 'TR',
      'Румыния': 'RO', 'Румынии': 'RO',
      'Болгария': 'BG', 'Болгарии': 'BG',
      'Венгрия': 'HU', 'Венгрии': 'HU',
      'Шотландия': 'SCOTLAND', 'Шотландии': 'SCOTLAND',
      'Ирландия': 'IE', 'Ирландии': 'IE',
      'Исландия': 'IS', 'Исландии': 'IS',
      'Словения': 'SI', 'Словении': 'SI',
      'Босния и Герцеговина': 'BA', 'Боснии и Герцеговины': 'BA',
      'Черногория': 'ME', 'Черногории': 'ME',
      'Северная Македония': 'MK', 'Северной Македонии': 'MK',
      'Албания': 'AL', 'Албании': 'AL',
      'Литва': 'LT', 'Литвы': 'LT',
      'Латвия': 'LV', 'Латвии': 'LV',
      'Эстония': 'EE', 'Эстонии': 'EE',
      'Молдова': 'MD', 'Молдовы': 'MD',
      'Грузия': 'GE', 'Грузии': 'GE',
      'Армения': 'AM', 'Армении': 'AM',
      'Азербайджан': 'AZ', 'Азербайджана': 'AZ',
      'Кипр': 'CY', 'Кипра': 'CY',
      'Люксембург': 'LU', 'Люксембурга': 'LU',
      'Мальта': 'MT', 'Мальты': 'MT',
      'Казахстан': 'KZ', 'Казахстана': 'KZ',
      'Бразилия': 'BR', 'Бразилии': 'BR',
      'Аргентина': 'AR', 'Аргентины': 'AR',
      'Мексика': 'MX', 'Мексики': 'MX',
      'США': 'US',
      'Колумбия': 'CO', 'Колумбии': 'CO',
      'Чили': 'CL',
      'Уругвай': 'UY', 'Уругвая': 'UY',
      'Перу': 'PE',
      'Парагвай': 'PY', 'Парагвая': 'PY',
      'Эквадор': 'EC', 'Эквадора': 'EC',
      'Венесуэла': 'VE', 'Венесуэлы': 'VE',
      'Боливия': 'BO', 'Боливии': 'BO',
      'Канада': 'CA', 'Канады': 'CA',
      'Коста-Рика': 'CR', 'Коста-Рики': 'CR',
      'Панама': 'PA', 'Панамы': 'PA',
      'Гондурас': 'HN', 'Гондураса': 'HN',
      'Сальвадор': 'SV', 'Сальвадора': 'SV',
      'Ямайка': 'JM', 'Ямайки': 'JM',
      'Гватемала': 'GT', 'Гватемалы': 'GT',
      'Никарагуа': 'NI',
      'Куба': 'CU', 'Кубы': 'CU',
      'Тринидад и Тобаго': 'TT', 'Тринидада и Тобаго': 'TT',
      'Гаити': 'HT',
      'Доминиканская Республика': 'DO', 'Доминиканской Республики': 'DO',
      'Суринам': 'SR', 'Суринама': 'SR',
      'Гайана': 'GY', 'Гайаны': 'GY',
      'Белиз': 'BZ', 'Белиза': 'BZ',
      'Барбадос': 'BB', 'Барбадоса': 'BB',
      'Гренада': 'GD', 'Гренады': 'GD',
      'Багамские о-ва': 'BS',
      'Антигуа и Барбуда': 'AG',
      'Сент-Люсия': 'LC',
      'Сент-Винсент и Гренадины': 'VC',
      'Сент-Китс и Невис': 'KN',
      'Доминика': 'DM', 'Доминики': 'DM',
      'Монтсеррат': 'MS', 'Монтсеррата': 'MS',
      'Аруба': 'AW', 'Арубы': 'AW',
      'Кюрасао': 'CW',
      'Бонэйр': 'BQ',
      'Каймановы о-ва': 'KY',
      'Бермудские о-ва': 'BM',
      'Пуэрто-Рико': 'PR',
      'Мартиника': 'MQ', 'Мартиники': 'MQ',
      'Гваделупа': 'GP', 'Гваделупы': 'GP',
      'Американские Виргинские о-ва': 'VI',
      'Британские Виргинские о-ва': 'VG',
      'Япония': 'JP', 'Японии': 'JP',
      'Южная Корея': 'KR', 'Южной Кореи': 'KR',
      'Китай': 'CN', 'Китая': 'CN',
      'Иран': 'IR', 'Ирана': 'IR',
      'Саудовская Аравия': 'SA', 'Саудовской Аравии': 'SA',
      'Австралия': 'AU', 'Австралии': 'AU',
      'Узбекистан': 'UZ', 'Узбекистана': 'UZ',
      'Ирак': 'IQ', 'Ирака': 'IQ',
      'Катар': 'QA', 'Катара': 'QA',
      'ОАЭ': 'AE',
      'Таиланд': 'TH', 'Таиланда': 'TH',
      'Вьетнам': 'VN', 'Вьетнама': 'VN',
      'Индия': 'IN', 'Индии': 'IN',
      'Индонезия': 'ID', 'Индонезии': 'ID',
      'Малайзия': 'MY', 'Малайзии': 'MY',
      'Сингапур': 'SG', 'Сингапура': 'SG',
      'Филиппины': 'PH', 'Филиппин': 'PH',
      'Бахрейн': 'BH', 'Бахрейна': 'BH',
      'Иордания': 'JO', 'Иордании': 'JO',
      'Оман': 'OM', 'Омана': 'OM',
      'Кувейт': 'KW', 'Кувейта': 'KW',
      'Сирия': 'SY', 'Сирии': 'SY',
      'Палестина': 'PS', 'Палестины': 'PS',
      'Ливан': 'LB', 'Ливана': 'LB',
      'Кыргызстан': 'KG', 'Кыргызстана': 'KG',
      'Таджикистан': 'TJ', 'Таджикистана': 'TJ',
      'Туркменистан': 'TM', 'Туркменистана': 'TM',
      'КНДР': 'KP',
      'Мьянма': 'MM', 'Мьянмы': 'MM',
      'Монголия': 'MN', 'Монголии': 'MN',
      'Камбоджа': 'KH', 'Камбоджи': 'KH',
      'Лаос': 'LA', 'Лаоса': 'LA',
      'Непал': 'NP', 'Непала': 'NP',
      'Бангладеш': 'BD', 'Бангладеша': 'BD',
      'Шри-Ланка': 'LK', 'Шри-Ланки': 'LK',
      'Тайвань': 'TW', 'Тайваня': 'TW',
      'Гонконг': 'HK', 'Гонконга': 'HK',
      'Макао': 'MO',
      'Папуа Новая Гвинея': 'PG', 'Папуа Новой Гвинеи': 'PG',
      'Тонга': 'TO', 'Тонги': 'TO',
      'Египет': 'EG', 'Египта': 'EG',
      'Нигерия': 'NG', 'Нигерии': 'NG',
      'ЮАР': 'ZA',
      'Камерун': 'CM', 'Камеруна': 'CM',
      'Гана': 'GH', 'Ганы': 'GH',
      "Кот-д'Ивуар": 'CI', "Кот-д'Ивуара": 'CI',
      'Сенегал': 'SN', 'Сенегала': 'SN',
      'Тунис': 'TN', 'Туниса': 'TN',
      'Алжир': 'DZ', 'Алжира': 'DZ',
      'Марокко': 'MA',
      'Мали': 'ML',
      'Конго': 'CG',
      'ДР Конго': 'CD',
      'Замбия': 'ZM', 'Замбии': 'ZM',
      'Зимбабве': 'ZW',
      'Кения': 'KE', 'Кении': 'KE',
      'Уганда': 'UG', 'Уганды': 'UG',
      'Танзания': 'TZ', 'Танзании': 'TZ',
      'Мозамбик': 'MZ', 'Мозамбика': 'MZ',
      'Эфиопия': 'ET', 'Эфиопии': 'ET',
      'Ангола': 'AO', 'Анголы': 'AO',
      'Буркина-Фасо': 'BF',
      'Габон': 'GA', 'Габона': 'GA',
      'Гвинея': 'GN', 'Гвинеи': 'GN',
      'Ливия': 'LY', 'Ливии': 'LY',
      'Мадагаскар': 'MG', 'Мадагаскара': 'MG',
      'Новая Зеландия': 'NZ', 'Новой Зеландии': 'NZ',
      'Фиджи': 'FJ',
      'Самоа': 'WS',
      'Вануату': 'VU',
      'Израиль': 'IL', 'Израиля': 'IL',
      'Уэльс': 'WALES', 'Уэльса': 'WALES',
      'Северная Ирландия': 'NIR', 'Северной Ирландии': 'NIR',
      'Реюньон': 'RE', 'Пакистан': 'PK', 'Пакистана': 'PK', 'Эритрея': 'ER', 'Эритреи': 'ER'
    };

    function getCountryFlag(countryName) {
      var code = COUNTRY_ISO[countryName];
      if (!code) return '';
      return isoToFlagEmoji(code);
    }

    function formatGroupTableBBCode(tableData) {
      var lines = [];
      var headerCells = tableData.headers.map(function(h) { return '[td]' + h + '[/td]'; }).join('');
      lines.push('[tr]' + headerCells + '[/tr]');
      for (var i = 0; i < tableData.rows.length; i++) {
        var r = tableData.rows[i];
        var cellValues = [r.position, r.teamName];
        for (var j = 0; j < r.stats.length; j++) {
          cellValues.push(r.stats[j]);
        }
        var hl = (i === tableData.highlightIndex);
        var rowCells = cellValues.map(function(c) {
          return hl ? '[td bgcolor=#FFFFBF]' + c + '[/td]' : '[td]' + c + '[/td]';
        }).join('');
        lines.push('[tr]' + rowCells + '[/tr]');
      }
      return '[table width=70% align=center]\n' + lines.join('\n') + '\n[/table]';
    }

    function formatMatchLinkBBCode(matchData, typeName) {
      var linkText = matchData.flag1 + ' ' + matchData.country1 + ' ' + typeName +
        ' - ' + matchData.flag2 + ' ' + matchData.country2 + ' ' + typeName +
        '  ' + matchData.score;
      return '[table align=center border=0][tr][td]' +
        '[a href=' + matchData.matchUrl + ' target="_blank"]' +
        linkText +
        '[/a]' +
        '[/td][/tr][/table]';
    }

    function invertScore(score) {
      var parts = score.split(':');
      if (parts.length !== 2) return score;
      return parts[1] + ':' + parts[0];
    }

    function parseMatchEvents(html) {
      if (!html) return [];

      var doc = new DOMParser().parseFromString(html, 'text/html');
      var rows = doc.querySelectorAll('tr[bgcolor="#c9f2c5"], tr[bgcolor="#eddac7"]');
      var events = [];

      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var event = parseEventRow(row);
        if (event) {
          events.push(event);
        }
      }

      events.sort(function (a, b) {
        return parseMinute(a.minute) - parseMinute(b.minute);
      });

      return events;
    }

    function detectEventType(row) {
      var titleMap = {
        'Гол': 'goal',
        'Желтая карточка': 'yellow',
        'Красная карточка': 'red',
        'Замена': 'sub'
      };

      var imgs = row.querySelectorAll('img[title]');
      for (var i = 0; i < imgs.length; i++) {
        var title = imgs[i].getAttribute('title') || '';
        if (titleMap[title]) return titleMap[title];
      }

      var tds = row.querySelectorAll('td[title]');
      for (var j = 0; j < tds.length; j++) {
        var tdTitle = tds[j].getAttribute('title') || '';
        if (titleMap[tdTitle]) return titleMap[tdTitle];
      }

      var allTds = row.querySelectorAll('td');
      for (var k = 0; k < allTds.length; k++) {
        var style = allTds[k].getAttribute('style') || '';
        if (style.indexOf('gol.gif') !== -1) return 'goal';
        if (style.indexOf('zhk.gif') !== -1) return 'yellow';
        if (style.indexOf('kk.gif') !== -1) return 'red';
      }

      return null;
    }

    function parseEventRow(row) {
      var type = detectEventType(row);
      if (type !== 'goal') return null;

      var tds = row.querySelectorAll('td');
      if (tds.length === 0) return null;

      var minute = tds[0].textContent.trim();
      if (!minute) minute = '?';

      var playerLinks = row.querySelectorAll('a.mnu');
      if (playerLinks.length === 0) return null;

      var playerName = playerLinks[0].textContent.trim();
      if (!playerName) return null;

      var score = tds[tds.length - 1].textContent.trim();

      var descriptionBBCode = '';
      for (var di = 0; di < tds.length; di++) {
        if (tds[di].querySelector('a.mnu')) {
          descriptionBBCode = convertDescriptionTobbcode(tds[di]);
          break;
        }
      }

      return {
        type: type, minute: minute, playerName: playerName,
        score: score || undefined,
        descriptionBBCode: descriptionBBCode || undefined
      };
    }

    function convertDescriptionTobbcode(td) {
      var result = '';
      for (var ci = 0; ci < td.childNodes.length; ci++) {
        var node = td.childNodes[ci];
        if (node.nodeType === 3) {
          result += node.textContent;
        } else if (node.nodeType === 1 && node.tagName === 'A') {
          var href = node.getAttribute('href') || '';
          if (href && !href.startsWith('http') && !href.startsWith('/')) {
            href = '/' + href;
          }
          var text = node.textContent.trim();
          result += '[a href=' + href + ' target="_blank"]' + text + '[/a]';
        }
      }
      return result.trim();
    }

    function parseMinute(minuteStr) {
      var parts = minuteStr.split('+');
      var base = parseInt(parts[0], 10) || 0;
      var extra = parts.length > 1 ? (parseInt(parts[1], 10) || 0) : 0;
      return base + extra * 0.01;
    }

    function formatEventsSummaryBBCode(events) {
      if (!events || events.length === 0) return '';

      var lines = [];
      for (var i = 0; i < events.length; i++) {
        var e = events[i];
        var desc = e.descriptionBBCode || e.playerName;
        var text = '⚽ ' + e.minute + "' " + desc;
        if (e.score) {
          text += ' (' + e.score + ')';
        }
        lines.push('[table width=70% align=center border=0][tr][td align=center]' + text + '[/td][/tr][/table]');
      }

      return lines.join('\n');
    }

    function parseMatchStrength(html) {
      if (!html) return null;
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var startRow = parseStrengthRow(doc, 'Сила в начале матча');
      var endRow = parseStrengthRow(doc, 'Сила в конце матча');
      if (!startRow && !endRow) return null;
      return { start: startRow, end: endRow };
    }

    function parseStrengthRow(doc, labelText) {
      var allTds = doc.querySelectorAll('td');
      var labelTd = null;
      for (var i = 0; i < allTds.length; i++) {
        var td = allTds[i];
        var text = '';
        for (var j = 0; j < td.childNodes.length; j++) {
          if (td.childNodes[j].nodeType === 3) text += td.childNodes[j].textContent;
        }
        if (text.trim() === labelText) { labelTd = td; break; }
      }
      if (!labelTd) return null;
      var tr = labelTd.closest('tr');
      if (!tr) return null;
      var rdl = tr.querySelector('td.rdl');
      var gdl = tr.querySelector('td.gdl');
      if (!rdl || !gdl) return null;
      var homeData = parseStrengthCell(rdl);
      var awayData = parseStrengthCell(gdl);
      if (!homeData || !awayData) return null;
      return {
        label: labelText,
        homeValue: homeData.value, homePercent: homeData.percent,
        awayValue: awayData.value, awayPercent: awayData.percent,
        diff: awayData.value - homeData.value
      };
    }

    function parseStrengthCell(td) {
      var valueText = '';
      for (var i = 0; i < td.childNodes.length; i++) {
        if (td.childNodes[i].nodeType === 3) valueText += td.childNodes[i].textContent;
      }
      var value = parseInt(valueText.trim(), 10);
      if (isNaN(value)) return null;
      var boldEl = td.querySelector('b');
      if (!boldEl) return null;
      var percent = parseInt(boldEl.textContent.trim().replace('%', ''), 10);
      if (isNaN(percent)) return null;
      return { value: value, percent: percent };
    }

    function formatStrengthBBCode(strength) {
      if (!strength) return '';
      var lines = [];
      if (strength.start) lines.push(formatStrengthRowBBCode(strength.start));
      if (strength.end) lines.push(formatStrengthRowBBCode(strength.end));
      return lines.join('\n');
    }

    function formatStrengthRowBBCode(row) {
      // Home always left (red), away always right (green) — fixed layout matching calculator tab
      var diff = Math.abs(row.awayValue - row.homeValue);
      var diffStr = diff > 0 ? '[small]+' + diff + '[/small]' : '';
      var homeWidth = Math.max(row.homePercent - 10, 5);
      var awayWidth = Math.max(row.awayPercent - 10, 5);

      // Fixed colors: home=red, away=green; +diff on the stronger side
      var homeBg = '#ff967e'; var homeFg = '#620';
      var awayBg = '#87e878'; var awayFg = '#060';
      var homeDiff = row.homeValue >= row.awayValue ? diffStr : '';
      var awayDiff = row.awayValue > row.homeValue ? diffStr : '';

      return '[table width=100%][tr]' +
        '[td align=left]' + row.label + '[/td]' +
        '[td bgcolor=' + homeBg + ' width=' + homeWidth + '% align=center][b][color=' + homeFg + ']' + row.homeValue + homeDiff + '[/color][/b][/td]' +
        '[td bgcolor=' + awayBg + ' width=' + awayWidth + '%][b][color=' + awayFg + ']' + row.awayValue + awayDiff + '[/color][/b][/td]' +
        '[/tr][/table]';
    }

    var SECTION_ORDER = ['Национальная', 'Молодёжная', 'Юношеская'];

    function formatBBCodeReport(sections) {
      var parts = [];
      parts.push('[table width="100%" border=0][tr][td]НОВОСТИ СБОРНЫХ[/td][/tr][/table]');
      parts.push('[hr]');
      var sorted = sections.slice().sort(function(a, b) {
        return SECTION_ORDER.indexOf(a.typeName) - SECTION_ORDER.indexOf(b.typeName);
      });
      for (var i = 0; i < sorted.length; i++) {
        var section = sorted[i];
        parts.push('[table width="100%" border=0][tr][td][b]' + section.typeName + '[/b][/td][/tr][/table]');
        if (section.matchLinkBBCode) {
          parts.push(section.matchLinkBBCode);
        }
        if (section.strengthBBCode) {
          parts.push(section.strengthBBCode);
        }
        if (section.eventSummaryBBCode) {
          parts.push(section.eventSummaryBBCode);
        }
        if (section.groupTableBBCode) {
          if (section.eventSummaryBBCode || section.strengthBBCode) {
            parts.push('');
          }
          parts.push(section.groupTableBBCode);
        }
        if (i < sorted.length - 1) {
          parts.push('');
        }
      }
      return parts.join('\n');
    }

    function insertIntoMemo(text) {
      var memo = document.getElementById('memo');
      if (!memo) return;
      memo.value = memo.value ? memo.value + '\n\n' + text : text;
      memo.dispatchEvent(new Event('change'));
      if (typeof preview === 'function') preview();
    }

    // --- HTTP helpers (Promise wrappers around httpGet) ---

    function fetchNationNum(fedId, type) {
      return new Promise(function(resolve) {
        var url = SITE_CONFIG.BASE_URL + '/fed_sborn.php?num=' + fedId + '&type=' + type;
        httpGet(url, function(err, html) {
          if (err || !html) { resolve(null); return; }
          resolve(parseNationNum(html));
        });
      });
    }

    function fetchNationPage(nationNum) {
      return new Promise(function(resolve) {
        var url = SITE_CONFIG.BASE_URL + '/nation.php?num=' + nationNum;
        httpGet(url, function(err, html) {
          if (err || !html) { resolve(null); return; }
          resolve(html);
        });
      });
    }

    function fetchWorldcupPage(worldcupUrl) {
      return new Promise(function(resolve) {
        httpGet(worldcupUrl, function(err, html) {
          if (err || !html) { resolve(null); return; }
          resolve(html);
        });
      });
    }

    function fetchViewmatchPage(viewmatchUrl) {
      return new Promise(function(resolve) {
        httpGet(viewmatchUrl, function(err, html) {
          if (err || !html) { resolve(null); return; }
          resolve(html);
        });
      });
    }

    // --- Entry point ---
    var urlParams = new URLSearchParams(window.location.search);
    var nationId = urlParams.get('nation_id');
    if (!nationId) return;

    var btnContainer = document.querySelector('p:has(a.butn)');
    if (!btnContainer) return;

    var btn = document.createElement('a');
    btn.href = 'javascript:void(0)';
    btn.className = 'butn';
    btn.textContent = 'Сыгранный матч сборных';
    btn.style.marginLeft = '5px';

    btn.onclick = async function() {
      btn.textContent = 'Загрузка...';
      try {
        var sections = [];
        for (var ti = 0; ti < TEAM_TYPES.length; ti++) {
          var tt = TEAM_TYPES[ti];
          var nationNum = await fetchNationNum(nationId, tt.type);
          if (!nationNum) continue;
          await new Promise(function(r) { setTimeout(r, 400); });

          var html = await fetchNationPage(nationNum);
          if (!html) continue;
          await new Promise(function(r) { setTimeout(r, 400); });

          var worldcupUrl = parseWorldcupLink(html);
          var matchData = parsePlayedMatch(html);

          var groupTable = null;
          if (worldcupUrl) {
            var worldcupHtml = await fetchWorldcupPage(worldcupUrl);
            if (worldcupHtml) {
              groupTable = parseGroupTable(worldcupHtml, nationNum);
            }
            await new Promise(function(r) { setTimeout(r, 400); });
          }

          var groupTableBBCode = groupTable ? formatGroupTableBBCode(groupTable) : null;
          var matchLinkBBCode = null;
          var eventSummaryBBCode = null;
          var strengthBBCode = null;

          if (matchData) {
            // If away, swap so home team (opponent) is on the left
            if (matchData.isAway) {
              var tmp = matchData.country1;
              matchData.country1 = matchData.country2;
              matchData.country2 = tmp;
              matchData.score = invertScore(matchData.score);
            }
            matchData.flag1 = getCountryFlag(matchData.country1);
            matchData.flag2 = getCountryFlag(matchData.country2);
            matchData.typeSuffix = tt.suffix;
            matchLinkBBCode = formatMatchLinkBBCode(matchData, tt.suffix);

            var viewmatchHtml = await fetchViewmatchPage(matchData.matchUrl);
            if (viewmatchHtml) {
              var matchEvents = parseMatchEvents(viewmatchHtml);
              eventSummaryBBCode = formatEventsSummaryBBCode(matchEvents) || null;

              var strength = parseMatchStrength(viewmatchHtml);
              strengthBBCode = formatStrengthBBCode(strength) || null;
            }
            await new Promise(function(r) { setTimeout(r, 400); });
          }

          sections.push({
            typeName: tt.name,
            groupTableBBCode: groupTableBBCode,
            matchLinkBBCode: matchLinkBBCode,
            eventSummaryBBCode: eventSummaryBBCode,
            strengthBBCode: strengthBBCode
          });
        }

        if (sections.length === 0) {
          alert('Не удалось загрузить данные ни для одного типа сборной');
        } else {
          var report = formatBBCodeReport(sections);
          insertIntoMemo(report);
        }
      } catch (e) {
        console.error('[initPlayedNationalTeamMatches] error:', e);
        alert('Ошибка загрузки данных сборных');
      }
      btn.textContent = 'Сыгранный матч сборных';
    };

    btnContainer.insertBefore(btn, btnContainer.firstChild);
  }

  // ========== National Team Matches (fed_news.php) ==========

  function initNationalTeamMatches() {
    const urlParams = new URLSearchParams(window.location.search);
    const federationId = urlParams.get('nation_id');
    if (!federationId) return;

    const teamNames = { 0: 'Сборная', 1: 'Молодежная', 2: 'Юношеская' };

    function fetchTeamData(fedId, type) {
      return new Promise((resolve, reject) => {
        httpGet(`${SITE_CONFIG.BASE_URL}/fed_sborn.php?num=${fedId}&type=${type}`, (err, html) => {
          if (err || !html) { resolve(null); return; }
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const link = doc.querySelector('a[href*="nation.php?num="]');
          if (link) {
            const m = link.getAttribute('href').match(/num=(\d+)/);
            if (m) { resolve({ nationNum: m[1] }); return; }
          }
          resolve(null);
        });
      });
    }

    function fetchTeamMatches(nationNum) {
      return new Promise((resolve, reject) => {
        httpGet(`${SITE_CONFIG.BASE_URL}/nation.php?num=${nationNum}`, (err, html) => {
          if (err || !html) { resolve([]); return; }
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const matches = [];
          const previewLinks = doc.querySelectorAll('a[href*="previewmatch.php"]');
          if (previewLinks.length) {
            const parentDiv = previewLinks[0].closest('div');
            if (parentDiv) {
              const opponentLink = parentDiv.querySelector('a[href*="nation.php"]');
              matches.push({
                text: parentDiv.textContent.trim(),
                opponent: opponentLink ? opponentLink.textContent.trim() : '',
                link: previewLinks[0].getAttribute('href')
              });
            }
          }
          resolve(matches);
        });
      });
    }

    async function fetchAllMatches() {
      const allMatches = [];
      for (let type = 0; type <= 2; type++) {
        const data = await fetchTeamData(federationId, type);
        if (data) {
          const matches = await fetchTeamMatches(data.nationNum);
          if (matches.length) allMatches.push({ teamName: teamNames[type], matches });
        }
      }
      return allMatches;
    }

    function formatMatches(allMatches) {
      if (!allMatches.length) return 'Будущие матчи сборных не найдены.';
      let text = '[b]Будущие матчи сборных:[/b]\n\n';
      allMatches.forEach(t => { text += `[b]${t.teamName}:[/b]\n`; t.matches.forEach(m => { text += `${m.text}\n`; }); text += '\n'; });
      return text;
    }

    // UI — кнопка
    const btnContainer = document.querySelector('p:has(a.butn)');
    if (!btnContainer) return;
    const btn = document.createElement('a');
    btn.href = 'javascript:void(0)'; btn.className = 'butn';
    btn.textContent = 'Будущие матчи сборных'; btn.style.marginLeft = '5px';
    btn.onclick = async () => {
      btn.textContent = 'Загрузка...';
      try {
        const allMatches = await fetchAllMatches();
        const text = formatMatches(allMatches);
        const memo = document.getElementById('memo');
        if (memo) {
          memo.value = memo.value ? memo.value + '\n\n' + text : text;
          memo.dispatchEvent(new Event('change'));
          if (typeof preview === 'function') preview();
        }
      } catch (e) { alert('Ошибка загрузки матчей'); }
      btn.textContent = 'Будущие матчи сборных';
    };
    btnContainer.insertBefore(btn, btnContainer.firstChild);
  }
})();
