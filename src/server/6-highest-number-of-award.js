import { readCsv } from '../utils/csvToJson.js';
import { writeFile } from '../utils/writeFile.js';
import { CONSTANTS } from '../utils/constants.js';

function playerOfMatchPerSeason() {
  const matches = readCsv(CONSTANTS.FILE_NAME.MATCHES);
  const count = {};

  for (const match of matches) {
    const season = match.season;
    const player = match.player_of_match;
    if (!player) continue;

    if (!count[season]) count[season] = {};
    count[season][player] = (count[season][player] || 0) + 1;
  }

  const topPlayers = {};
  for (const season in count) {
    let top = '';
    let max = 0;
    for (const player in count[season]) {
      if (count[season][player] > max) {
        max = count[season][player];
        top = player;
      }
    }
    topPlayers[season] = top;
  }

  writeFile(CONSTANTS.OUTPUT.PLAYER_OF_MATCH_PER_SEASON, topPlayers);
}

playerOfMatchPerSeason();
