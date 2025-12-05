import { readCsv } from '../utils/csvToJson.js';
import { writeFile } from '../utils/writeFile.js';
import { CONSTANTS } from '../utils/constants.js';

function tossAndMatchWinners() {
  const matches = readCsv(CONSTANTS.FILE_NAME.MATCHES);
  const winners = {};

  for (const match of matches) {
    if (match.toss_winner === match.winner && match.toss_winner) {
      const team = match.toss_winner;
      winners[team] = (winners[team] || 0) + 1;
    }
  }

  writeFile(CONSTANTS.OUTPUT.TOSS_AND_MATCH_WINNERS, winners);
}

tossAndMatchWinners();
