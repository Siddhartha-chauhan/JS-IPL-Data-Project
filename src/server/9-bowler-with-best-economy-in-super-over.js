import { readCsv } from '../utils/csvToJson.js';
import { writeFile } from '../utils/writeFile.js';
import { CONSTANTS } from '../utils/constants.js';

function bestEconomySuperOver() {
  const balls = readCsv(CONSTANTS.FILE_NAME.DELIVERIES);
  const superBalls = balls.filter(b => b.is_super_over === "1");

  const stats = {};

  for (const ball of superBalls) {
    const bowler = ball.bowler;

    if (!stats[bowler]) stats[bowler] = { runs: 0, balls: 0 };

    stats[bowler].runs += Number(ball.total_runs);

    if (ball.wide_runs === "0" && ball.noball_runs === "0") {
      stats[bowler].balls++;
    }
  }

  let bestBowler = "";
  let bestEco = Infinity;

  for (const bowler in stats) {
    const item = stats[bowler];
    const eco = item.runs / (item.balls / 6);

    if (eco < bestEco) {
      bestEco = eco;
      bestBowler = bowler;
    }
  }

  writeFile(CONSTANTS.OUTPUT.BEST_ECONOMY_SUPER_OVER, {
    bowler: bestBowler,
    economy: bestEco.toFixed(2)
  });
}

bestEconomySuperOver();
