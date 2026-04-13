// ==UserScript==
// @name         VSOL: weather and FWDs count
// @license MIT
// @namespace    http://tampermonkey.net/
// @version      1.0352
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
// @match        *://*.virtualsoccer.ru/fed_news.php*
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
      'Южный Судан':217,'Ямайка':176,'Япония':177,'Бонэйр':195
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
      'Пакистана':117,'Эритреи':170,'Реюньона':208
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
  } else if (location.hostname.includes('transfermarkt.')) {
    initTransfermarkt();
  } else if (href.includes('/fed_news.php')) {
    initPlayedNationalTeamMatches();
    initNationalTeamMatches();
    initInterseasonCupResults();
  }

  // ========== Player Parser & Matcher (realplayers.php + transfermarkt) ==========

  function initPlayerParser() {
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
      const tmNames = tmPlayers.map(p => normalizeString(p.fullName));
      let notInTM = 0, similarMatches = 0;

      vsPlayers.forEach(vp => {
        if (!vp.original?.trim()) return;
        const vsName = normalizeString(vp.original);
        const origInput = vp.row.querySelector('input[name="orig_name[]"]');
        if (!origInput) return;
        origInput.style.fontWeight = ''; origInput.style.color = ''; origInput.title = '';
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

      const vsOriginals = vsPlayers.map(p => normalizeString(p.original)).filter(o => o);
      const missing = tmPlayers.filter(tp => {
        const n = normalizeString(tp.fullName);
        if (vsOriginals.some(v => v === n)) return false;
        return !findBestMatch(n, vsOriginals, 0.85);
      });

      const filled = fillEmptyRows(missing);
      alert(`Сравнение:\n🔴 Нет в TM: ${notInTM}\n🟡 Похожие: ${similarMatches}\n🟢 Добавлено из TM: ${filled}\nВсего TM: ${tmPlayers.length}`);
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

  function initTransfermarkt() {
    function parseTMPlayers() {
      const players = [], seen = new Set();
      document.querySelectorAll('.items tbody tr').forEach(row => {
        const link = row.querySelector('td.posrela table.inline-table td.hauptlink a');
        if (!link) return;
        const name = link.textContent.trim();
        if (seen.has(name)) return;
        seen.add(name);
        players.push({ fullName: name, profileUrl: link.getAttribute('href') });
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
      var viewMatchLink = null;
      for (var li = 0; li < allLinks.length; li++) {
        var h = allLinks[li].getAttribute('href') || '';
        if (h.includes('previewmatch.php')) continue;
        viewMatchLink = allLinks[li];
        break;
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
      if (!minute) return null;

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
      // Home always left, away always right. Colors: weaker=red, stronger=green.
      var diff = Math.abs(row.awayValue - row.homeValue);
      var diffStr = diff > 0 ? '[small]+' + diff + '[/small]' : '';
      var homeWidth = Math.max(row.homePercent - 10, 5);
      var awayWidth = Math.max(row.awayPercent - 10, 5);

      var homeBg, homeFg, awayBg, awayFg, homeDiff, awayDiff;
      if (row.homeValue >= row.awayValue) {
        // Home is stronger or equal
        homeBg = '#87e878'; homeFg = '#060'; homeDiff = diffStr;
        awayBg = '#ff967e'; awayFg = '#620'; awayDiff = '';
      } else {
        // Away is stronger
        homeBg = '#ff967e'; homeFg = '#620'; homeDiff = '';
        awayBg = '#87e878'; awayFg = '#060'; awayDiff = diffStr;
      }

      return '[table width=100%][tr]' +
        '[td align=left]' + row.label + '[/td]' +
        '[td bgcolor=' + homeBg + ' width=' + homeWidth + '% align=right][b][color=' + homeFg + ']' + row.homeValue + homeDiff + '[/color][/b][/td]' +
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
