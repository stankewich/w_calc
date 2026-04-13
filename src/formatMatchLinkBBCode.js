/**
 * Extracted from initPlayedNationalTeamMatches() in calc.user.js for testability.
 * Formats MatchData into a BB-code match link with flags, country names, type suffix and score.
 *
 * @param {MatchData} matchData
 * @param {string} typeName - Type suffix, e.g. "(нац.)", "(мол.)", "(юн.)"
 * @returns {string} BB-code string
 *
 * @typedef {Object} MatchData
 * @property {string} matchUrl - Match URL (viewmatch.php?...)
 * @property {string} country1 - First country name
 * @property {string} country2 - Second country name
 * @property {string} flag1 - Flag_Smiley of first country (:flag_xx:)
 * @property {string} flag2 - Flag_Smiley of second country (:flag_xx:)
 * @property {string} score - Match score (e.g. "2:1")
 * @property {string} typeSuffix - Type suffix: "(нац.)", "(мол.)", "(юн.)"
 */
export function formatMatchLinkBBCode(matchData, typeName) {
  var linkText = matchData.flag1 + ' ' + matchData.country1 + ' ' + typeName +
    ' - ' + matchData.flag2 + ' ' + matchData.country2 + ' ' + typeName +
    '  ' + matchData.score;

  return '[table align=center border=0][tr][td]' +
    '[a href=' + matchData.matchUrl + ' target="_blank"]' +
    linkText +
    '[/a]' +
    '[/td][/tr][/table]';
}
