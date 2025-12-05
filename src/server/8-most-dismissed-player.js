import { readCsv } from '../utils/csvToJson.js';
import { writeFile } from '../utils/writeFile.js';
import { CONSTANTS } from '../utils/constants.js';

function mostDismissedPlayer() {
  const balls = readCsv(CONSTANTS.FILE_NAME.DELIVERIES);
  const count = {};

  for (const ball of balls) {
    if (!ball.player_dismissed) continue;
    if (ball.dismissal_kind === "run out") continue;

    const key = `${ball.bowler}-${ball.player_dismissed}`;

    if (!count[key]) count[key] = 0;
    count[key]++;
  }

  let topPair = "";
  let max = 0;

  for (const pair in count) {
    if (count[pair] > max) {
      max = count[pair];
      topPair = pair;
    }
  }

  const [bowler, batsman] = topPair.split("-");

  writeFile(CONSTANTS.OUTPUT.MOST_DISMISSED_PLAYER, {
    bowler,
    batsman,
    times: max
  });
}

mostDismissedPlayer();
