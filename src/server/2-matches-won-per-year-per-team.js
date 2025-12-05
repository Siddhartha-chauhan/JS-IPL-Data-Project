import { readCsv } from '../utils/csvToJson.js';
import { writeFile } from '../utils/writeFile.js';
import { CONSTANTS } from '../utils/constants.js';

function countMatchesWonPerTeamPerYear() {
  const matches = readCsv(CONSTANTS.FILE_NAME.MATCHES);
  const matchesWon = {};

  for (const match of matches) {
    const year = match.season;
    const winner = match.winner;
    if (!winner) continue;

    if (!matchesWon[year]) matchesWon[year] = {};
    matchesWon[year][winner] = (matchesWon[year][winner] || 0) + 1;
  }

  writeFile(CONSTANTS.OUTPUT.MATCHES_WON_PER_TEAM_PER_YEAR, matchesWon);
}

countMatchesWonPerTeamPerYear();
