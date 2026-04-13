/**
 * Extracted from initPlayedNationalTeamMatches() in calc.user.js for testability.
 * Formats an array of goal MatchEvents into BB-code with detailed descriptions.
 *
 * Each goal is rendered as a centered table row:
 * [table width=70% align=center border=0][tr][td align=center]⚽ {min}' {description} ({score})[/td][/tr][/table]
 *
 * Uses descriptionBBCode (with player links) when available, falls back to playerName.
 * Empty array returns empty string.
 *
 * @param {MatchEvent[]} events
 * @returns {string} BB-code formatted string
 *
 * @typedef {Object} MatchEvent
 * @property {'goal'} type
 * @property {string} minute
 * @property {string} playerName
 * @property {string} [score]            - score after the goal
 * @property {string} [descriptionBBCode] - full description with BB-code player links
 */
export function formatEventsSummaryBBCode(events) {
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
