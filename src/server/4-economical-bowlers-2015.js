import { readCsv } from '../utils/csvToJson.js';
import { writeFile } from '../utils/writeFile.js';
import { CONSTANTS } from '../utils/constants.js';

function topEconomicalBowlers2015() {
  const matches = readCsv(CONSTANTS.FILE_NAME.MATCHES);
  const deliveries = readCsv(CONSTANTS.FILE_NAME.DELIVERIES);

  // Step 1: Get all match IDs for 2015
  const matchIds2015 = [];
  for (const match of matches) {
    if (match.season === '2015') {
      matchIds2015.push(match.id);
    }
  }

  // Step 2: Filter deliveries for those match IDs
  const overStats = {};

  for (const ball of deliveries) {
    if (matchIds2015.includes(ball.match_id)) {
      const bowler = ball.bowler;
      const runs = Number(ball.total_runs);

      if (!overStats[bowler]) {
        overStats[bowler] = { runs: 0, balls: 0 };
      }

      overStats[bowler].runs += runs;
      overStats[bowler].balls += 1;
    }
  }

  // Step 3: Calculate economy (runs per over)
  const economyList = [];

  for (const bowler in overStats) {
    const { runs, balls } = overStats[bowler];
    const economy = runs / (balls / 6); // overs = balls/6
    economyList.push({ bowler, economy });
  }

  // Step 4: Sort by economy (ascending)
  economyList.sort((a, b) => a.economy - b.economy);

  // Step 5: Take top 10
  const top10 = economyList.slice(0, 10);

  // Step 6: Save output
  writeFile(CONSTANTS.OUTPUT.TOP_ECONOMICAL_2015, top10);
}

topEconomicalBowlers2015();
