// ==UserScript==
// @name         VirtualSoccer - Будущие матчи сборных
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Добавляет кнопку для вставки информации о будущих матчах сборных в новости федерации
// @author       You
// @match        https://www.virtualsoccer.ru/fed_news.php?nation_id=*
// @grant        GM_xmlhttpRequest
// @connect      virtualsoccer.ru
// ==/UserScript==

(function() {
    'use strict';

    // Получаем federation ID из URL
    const urlParams = new URLSearchParams(window.location.search);
    const federationId = urlParams.get('nation_id');

    if (!federationId) {
        console.log('Federation ID not found in URL');
        return;
    }

    // Маппинг типов сборных
    const teamTypes = {
        0: 'national',
        1: 'u23',
        2: 'u19'
    };

    const teamNames = {
        0: 'Сборная',
        1: 'Молодежная',
        2: 'Юношеская'
    };

    // Создаем кнопку
    function createButton() {
        const buttonContainer = document.querySelector('p:has(a.butn)');
        if (!buttonContainer) return;

        const button = document.createElement('a');
        button.href = 'javascript:void(0)';
        button.className = 'butn';
        button.textContent = 'Будущие матчи сборных';
        button.style.marginLeft = '5px';
        button.onclick = fetchNationalTeamMatches;

        buttonContainer.insertBefore(button, buttonContainer.firstChild);
    }

    // Основная функция для получения матчей
    async function fetchNationalTeamMatches() {
        try {
            button.textContent = 'Загрузка...';
            const allMatches = [];

            // Проходим по всем типам сборных
            for (let type = 0; type <= 2; type++) {
                const teamData = await fetchTeamData(federationId, type);
                if (teamData) {
                    const matches = await fetchTeamMatches(teamData.nationNum);
                    if (matches.length > 0) {
                        allMatches.push({
                            teamName: teamNames[type],
                            matches: matches
                        });
                    }
                }
            }

            // Формируем текст для вставки
            const matchText = formatMatches(allMatches);
            insertIntoMemo(matchText);

            button.textContent = 'Будущие матчи сборных';
        } catch (error) {
            console.error('Error fetching matches:', error);
            alert('Ошибка при загрузке данных о матчах');
            button.textContent = 'Будущие матчи сборных';
        }
    }

    // Получаем данные о сборной
    function fetchTeamData(fedId, type) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: `https://www.virtualsoccer.ru/fed_sborn.php?num=${fedId}&type=${type}`,
                onload: function(response) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(response.responseText, 'text/html');
                    
                    // Ищем ссылку на nation.php
                    const nationLink = doc.querySelector('a[href*="nation.php?num="]');
                    if (nationLink) {
                        const href = nationLink.getAttribute('href');
                        const match = href.match(/num=(\d+)/);
                        if (match) {
                            resolve({ nationNum: match[1] });
                            return;
                        }
                    }
                    resolve(null);
                },
                onerror: function(error) {
                    reject(error);
                }
            });
        });
    }

    // Получаем матчи сборной
    function fetchTeamMatches(nationNum) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: `https://www.virtualsoccer.ru/nation.php?num=${nationNum}`,
                onload: function(response) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(response.responseText, 'text/html');
                    
                    const matches = [];
                    
                    // Ищем все ссылки на previewmatch.php
                    const previewLinks = doc.querySelectorAll('a[href*="previewmatch.php"]');
                    
                    if (previewLinks.length > 0) {
                        // Берем только первый будущий матч
                        const firstLink = previewLinks[0];
                        const parentDiv = firstLink.closest('div');
                        
                        if (parentDiv) {
                            const matchText = parentDiv.textContent.trim();
                            const opponentLink = parentDiv.querySelector('a[href*="nation.php"]');
                            const opponent = opponentLink ? opponentLink.textContent.trim() : '';
                            
                            matches.push({
                                text: matchText,
                                opponent: opponent,
                                link: firstLink.getAttribute('href')
                            });
                        }
                    }
                    
                    resolve(matches);
                },
                onerror: function(error) {
                    reject(error);
                }
            });
        });
    }

    // Форматируем матчи для вставки
    function formatMatches(allMatches) {
        if (allMatches.length === 0) {
            return 'Будущие матчи сборных не найдены.';
        }

        let text = '[b]Будущие матчи сборных:[/b]\n\n';
        
        allMatches.forEach(team => {
            text += `[b]${team.teamName}:[/b]\n`;
            team.matches.forEach(match => {
                text += `${match.text}\n`;
            });
            text += '\n';
        });

        return text;
    }

    // Вставляем текст в поле memo
    function insertIntoMemo(text) {
        const memoField = document.getElementById('memo');
        if (memoField) {
            const currentValue = memoField.value;
            const newValue = currentValue ? currentValue + '\n\n' + text : text;
            memoField.value = newValue;
            
            // Триггерим события для автосохранения
            memoField.dispatchEvent(new Event('change'));
            memoField.dispatchEvent(new Event('keyup'));
            
            // Обновляем предпросмотр если функция доступна
            if (typeof preview === 'function') {
                preview();
            }
        }
    }

    // Инициализация
    let button;
    createButton();
    button = document.querySelector('a.butn:first-child');

})();
