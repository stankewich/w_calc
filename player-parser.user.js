// ==UserScript==
// @name         Player List Parser & Matcher
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Parse players from VirtualSoccer and Transfermarkt, compare and highlight differences
// @author       You
// @match        https://www.virtualsoccer.ru/realplayers.php*
// @match        *://www.transfermarkt.us/*/startseite/verein/*
// @match        *://www.transfermarkt.com/*/startseite/verein/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    const isVirtualSoccer = window.location.href.includes('virtualsoccer.ru');
    const isTransfermarkt = window.location.href.includes('transfermarkt');

    // ========== VirtualSoccer Functions ==========
    
    function parseVSPlayers() {
        const players = [];
        const rows = document.querySelectorAll('#sortable tbody tr[id^="tr_"]');

        rows.forEach((row) => {
            const playerId = row.querySelector('input[name="plr_id[]"]')?.value;
            const name = row.querySelector('input[name="plr_name[]"]')?.value || '';
            const surname = row.querySelector('input[name="plr_surname[]"]')?.value || '';
            const original = row.querySelector('input[name="orig_name[]"]')?.value || '';
            const link = row.querySelector('input[name="plr_linkvalue[]"]')?.value || '';
            const country = row.querySelector('input[name="plr_cntr[]"]')?.value || '';

            const positions = {
                gk: row.querySelector('input[name="plr_gk[]"]')?.value === '1',
                ld: row.querySelector('input[name="plr_ld[]"]')?.value === '1',
                cd: row.querySelector('input[name="plr_cd[]"]')?.value === '1',
                rd: row.querySelector('input[name="plr_rd[]"]')?.value === '1',
                lm: row.querySelector('input[name="plr_lm[]"]')?.value === '1',
                cm: row.querySelector('input[name="plr_cm[]"]')?.value === '1',
                rm: row.querySelector('input[name="plr_rm[]"]')?.value === '1',
                lf: row.querySelector('input[name="plr_lf[]"]')?.value === '1',
                cf: row.querySelector('input[name="plr_cf[]"]')?.value === '1',
                rf: row.querySelector('input[name="plr_rf[]"]')?.value === '1'
            };

            if (playerId && playerId !== '0') {
                players.push({
                    id: playerId,
                    name: name,
                    surname: surname,
                    original: original,
                    link: link,
                    country: country,
                    positions: positions,
                    row: row
                });
            }
        });

        return players;
    }



    // ========== Transfermarkt Functions ==========
    
    function parseTMPlayers() {
        const players = [];
        const seen = new Set();
        
        // Select only rows with player data (they have td.posrela)
        const rows = document.querySelectorAll('.items tbody tr');

        rows.forEach((row) => {
            // Find the main player link in the nested table structure
            const nameLink = row.querySelector('td.posrela table.inline-table td.hauptlink a');
            if (!nameLink) return;

            const fullName = nameLink.textContent.trim();
            const profileUrl = nameLink.getAttribute('href');
            
            // Prevent duplicates
            if (seen.has(fullName)) {
                console.log(`Skipping duplicate: ${fullName}`);
                return;
            }
            
            seen.add(fullName);
            players.push({
                fullName: fullName,
                profileUrl: profileUrl
            });
        });

        console.log(`Parsed ${players.length} unique TM players`);
        return players;
    }

    function saveTMPlayers() {
        const players = parseTMPlayers();
        GM_setValue('tmSavedPlayers', JSON.stringify(players));
        GM_setValue('tmSavedDate', new Date().toISOString());
        
        console.log(`Saved ${players.length} TM players`);
        alert(`Successfully saved ${players.length} Transfermarkt players!`);
        
        return players;
    }

    // ========== Comparison Functions ==========
    
    function normalizeString(str) {
        return str.toLowerCase().trim().replace(/\s+/g, ' ');
    }

    // Levenshtein distance for fuzzy matching
    function levenshteinDistance(str1, str2) {
        const len1 = str1.length;
        const len2 = str2.length;
        const matrix = [];

        for (let i = 0; i <= len1; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= len2; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }

        return matrix[len1][len2];
    }

    // Calculate similarity percentage
    function similarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const distance = levenshteinDistance(longer, shorter);
        return (longer.length - distance) / longer.length;
    }

    // Find best match with similarity threshold
    function findBestMatch(name, nameList, threshold = 0.85) {
        let bestMatch = null;
        let bestScore = 0;

        nameList.forEach((candidate, index) => {
            const score = similarity(name, candidate);
            if (score > bestScore && score >= threshold) {
                bestScore = score;
                bestMatch = { name: candidate, index: index, score: score };
            }
        });

        return bestMatch;
    }

    function compareAndHighlight() {
        const vsPlayers = parseVSPlayers();
        const tmPlayersData = GM_getValue('tmSavedPlayers', null);
        
        if (!tmPlayersData) {
            alert('No Transfermarkt data found! Please visit the Transfermarkt page first and save players.');
            return;
        }

        const tmPlayers = JSON.parse(tmPlayersData);
        const tmNames = tmPlayers.map(p => normalizeString(p.fullName));
        
        console.log('VS Players:', vsPlayers.length);
        console.log('TM Players:', tmPlayers.length);

        // Find VS players not in TM (highlight red or yellow for similar)
        let notInTM = 0;
        let similarMatches = 0;
        
        vsPlayers.forEach(vsPlayer => {
            if (!vsPlayer.original || vsPlayer.original.trim() === '') return;
            
            const vsName = normalizeString(vsPlayer.original);
            const origInput = vsPlayer.row.querySelector('input[name="orig_name[]"]');
            
            if (!origInput) return;
            
            // Reset styles
            vsPlayer.row.style.backgroundColor = '';
            vsPlayer.row.title = '';
            origInput.style.fontWeight = '';
            origInput.title = '';
            
            // Check exact match
            const exactMatch = tmNames.some(tmName => tmName === vsName);
            
            if (exactMatch) {
                // Perfect match - no styling
                return;
            }
            
            // Check for similar match (possible misspelling)
            const similarMatch = findBestMatch(vsName, tmNames, 0.75);
            
            if (similarMatch) {
                // Similar match found - bold with hint
                origInput.style.fontWeight = 'bold';
                origInput.style.color = '#FF8C00';
                origInput.title = `Similar to "${tmPlayers[similarMatch.index].fullName}" (${Math.round(similarMatch.score * 100)}% match)`;
                similarMatches++;
            } else {
                // No match found - bold red with hint
                origInput.style.fontWeight = 'bold';
                origInput.style.color = '#DC143C';
                origInput.title = 'Player not found in Transfermarkt';
                notInTM++;
            }
        });

        // Find TM players not in VS (add to empty rows)
        const vsOriginals = vsPlayers
            .map(p => normalizeString(p.original))
            .filter(o => o !== '');
        
        const missingInVS = tmPlayers.filter(tmPlayer => {
            const tmName = normalizeString(tmPlayer.fullName);
            
            // Check exact match
            if (vsOriginals.some(vsName => vsName === tmName)) {
                return false;
            }
            
            // Check similar match (don't add if similar player exists)
            const similarMatch = findBestMatch(tmName, vsOriginals, 0.85);
            if (similarMatch) {
                console.log(`Skipping "${tmPlayer.fullName}" - similar to existing player (${Math.round(similarMatch.score * 100)}%)`);
                return false;
            }
            
            return true;
        });

        console.log(`Not in TM: ${notInTM}`);
        console.log(`Similar matches: ${similarMatches}`);
        console.log(`Missing in VS: ${missingInVS.length}`);

        // Fill empty rows with missing players
        const filled = fillEmptyRows(missingInVS);

        let message = `Comparison complete!\n\n`;
        message += `🔴 Bold Red (${notInTM}): Not found in TM (hover for details)\n`;
        message += `🟡 Bold Orange (${similarMatches}): Similar to TM player (hover to see suggestion)\n`;
        message += `🟢 Bold Green (${filled}): Added from TM\n`;
        message += `\nTotal TM players: ${tmPlayers.length}`;
        
        alert(message);
    }

    function fillEmptyRows(missingPlayers) {
        const rows = document.querySelectorAll('#sortable tbody tr[id^="tr_"]');
        let filledCount = 0;

        rows.forEach((row) => {
            if (filledCount >= missingPlayers.length) return;

            const playerId = row.querySelector('input[name="plr_id[]"]')?.value;
            const original = row.querySelector('input[name="orig_name[]"]')?.value || '';

            // Check if row is empty (no player ID or ID is 0, and original is empty)
            if ((playerId === '0' || !playerId) && original.trim() === '') {
                const player = missingPlayers[filledCount];
                const origInput = row.querySelector('input[name="orig_name[]"]');
                
                if (origInput) {
                    origInput.value = player.fullName;
                    origInput.style.fontWeight = 'bold';
                    origInput.style.color = '#228B22';
                    origInput.title = 'Added from Transfermarkt';
                    
                    // Also fill the link if available
                    const linkInput = row.querySelector('input[name="plr_linkvalue[]"]');
                    if (linkInput && player.profileUrl) {
                        const fullUrl = player.profileUrl.startsWith('http') 
                            ? player.profileUrl 
                            : 'https://www.transfermarkt.us' + player.profileUrl;
                        linkInput.value = fullUrl;
                    }
                    
                    filledCount++;
                }
            }
        });

        console.log(`Filled ${filledCount} empty rows`);
        return filledCount;
    }

    // ========== UI Functions ==========
    
    function addVSButtons() {
        // Find the button table with "Сохранить изменения" and "Назад" buttons
        const buttonTable = document.querySelector('table.nil[align="center"]');
        if (!buttonTable) {
            console.log('Button table not found, trying alternative placement');
            const form = document.querySelector('form#forma');
            if (form) {
                addVSButtonsAlternative(form);
            }
            return;
        }

        const firstRow = buttonTable.querySelector('tbody tr');
        if (!firstRow) return;

        // Create Compare button only
        const compareTD = document.createElement('td');
        compareTD.className = 'txt';
        const compareBtn = document.createElement('a');
        compareBtn.className = 'butn-orange';
        compareBtn.id = 'tmCompareButton';
        compareBtn.href = 'javascript:void(0)';
        compareBtn.textContent = '🔍 Сравнить с ТМ';
        compareBtn.onclick = (e) => {
            e.preventDefault();
            compareAndHighlight();
        };
        compareTD.appendChild(compareBtn);

        // Insert button before the "Назад" button
        const backTD = firstRow.querySelector('td:last-child');
        firstRow.insertBefore(compareTD, backTD);
    }

    function addVSButtonsAlternative(form) {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'margin: 10px 0; padding: 10px; background: #f0f0f0; border-radius: 5px;';
        
        const compareBtn = document.createElement('button');
        compareBtn.textContent = '🔍 Compare with TM';
        compareBtn.style.cssText = 'padding: 8px 16px; background: #FF9800; color: white; border: none; border-radius: 4px; cursor: pointer;';
        compareBtn.onclick = (e) => {
            e.preventDefault();
            compareAndHighlight();
        };

        buttonContainer.appendChild(compareBtn);
        form.parentNode.insertBefore(buttonContainer, form);
    }

    function addTMButtons() {
        const table = document.querySelector('.responsive-table');
        if (!table) return;

        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'margin: 10px 0; padding: 10px; background: #f0f0f0; border-radius: 5px;';
        
        const saveBtn = document.createElement('button');
        saveBtn.textContent = '💾 Save TM Players';
        saveBtn.style.cssText = 'padding: 8px 16px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;';
        saveBtn.onclick = (e) => {
            e.preventDefault();
            saveTMPlayers();
        };

        buttonContainer.appendChild(saveBtn);
        table.parentNode.insertBefore(buttonContainer, table);
    }

    // ========== Initialize ==========
    
    function init() {
        if (isVirtualSoccer) {
            console.log('VirtualSoccer page detected');
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', addVSButtons);
            } else {
                addVSButtons();
            }
            GM_registerMenuCommand('Compare with TM', compareAndHighlight);
        } else if (isTransfermarkt) {
            console.log('Transfermarkt page detected');
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', addTMButtons);
            } else {
                addTMButtons();
            }
            GM_registerMenuCommand('Save TM Players', saveTMPlayers);
        }
    }

    init();

})();
