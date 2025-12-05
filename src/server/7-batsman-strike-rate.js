import { readCsv } from '../utils/csvToJson.js';
import { writeFile } from '../utils/writeFile.js';
import { CONSTANTS } from '../utils/constants.js';

function strikeRatePerSeason() {
  const matches = readCsv(CONSTANTS.FILE_NAME.MATCHES);
  const balls = readCsv(CONSTANTS.FILE_NAME.DELIVERIES);

  // Match ID → Season
  const seasonByMatch = {};
  for (const m of matches) {
    seasonByMatch[m.id] = m.season;
  }

  // Store stats
  const data = {};

  for (const ball of balls) {
    const season = seasonByMatch[ball.match_id];
    if (!season) continue;

    const batsman = ball.batsman;

    if (!data[season]) data[season] = {};
    if (!data[season][batsman]) data[season][batsman] = { runs: 0, balls: 0 };

    // Add runs
    data[season][batsman].runs += Number(ball.batsman_runs);

    // Add ball (only legal)
    if (ball.wide_runs === "0" && ball.noball_runs === "0") {
      data[season][batsman].balls++;
    }
  }

  // Final strike rate
  const result = {};

  for (const season in data) {
    result[season] = {};

    for (const batsman in data[season]) {
      const item = data[season][batsman];
      const strikeRate = (item.runs / item.balls) * 100;
      result[season][batsman] = strikeRate.toFixed(2);
    }
  }

  writeFile(CONSTANTS.OUTPUT.STRIKE_RATE_PER_SEASON, result);
}

strikeRatePerSeason();
