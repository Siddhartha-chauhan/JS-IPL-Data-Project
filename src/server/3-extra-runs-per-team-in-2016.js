import { readCsv } from '../utils/csvToJson.js';
import { writeFile } from '../utils/writeFile.js';
import { CONSTANTS } from '../utils/constants.js';

function extraRuns2016() {
  const matches = readCsv(CONSTANTS.FILE_NAME.MATCHES);
  const deliveries = readCsv(CONSTANTS.FILE_NAME.DELIVERIES);

  const matchIds2016 = matches.filter(m => m.season === '2016').map(m => m.id);
  const extras = {};

  for (const ball of deliveries) {
    if (!matchIds2016.includes(ball.match_id)) continue;
    const team = ball.bowling_team;
    extras[team] = (extras[team] || 0) + parseInt(ball.extra_runs);
  }

  writeFile(CONSTANTS.OUTPUT.EXTRA_RUNS_2016, extras);
}

extraRuns2016();
