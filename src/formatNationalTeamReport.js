/**
 * Extracted from initPlayedNationalTeamMatches() in calc.user.js for testability.
 * Composes the full BB-code report from pre-formatted section data.
 *
 * @param {TeamSection[]} sections - Array of team sections (pre-formatted BB-code strings)
 * @returns {string} Full BB-code report
 *
 * @typedef {Object} TeamSection
 * @property {string} typeName - Team type name: "Национальная", "Молодёжная", "Юношеская"
 * @property {string|null} groupTableBBCode - Pre-formatted BB-code for group table
 * @property {string|null} matchLinkBBCode - Pre-formatted BB-code for match link
 * @property {string|null} eventSummaryBBCode - Pre-formatted BB-code for match events summary
 * @property {string|null} strengthBBCode - Pre-formatted BB-code for match strength tables
 */

var SECTION_ORDER = ['Национальная', 'Молодёжная', 'Юношеская'];

export function formatBBCodeReport(sections) {
  var parts = [];

  // Header block
  parts.push('[table width="100%" border=0][tr][td]НОВОСТИ СБОРНЫХ[/td][/tr][/table]');
  parts.push('[hr]');

  // Sort sections according to fixed order
  var sorted = sections.slice().sort(function(a, b) {
    return SECTION_ORDER.indexOf(a.typeName) - SECTION_ORDER.indexOf(b.typeName);
  });

  // Each section: subheader with [b] + match link + group table
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
    // Empty line between sections
    if (i < sorted.length - 1) {
      parts.push('');
    }
  }

  return parts.join('\n');
}
