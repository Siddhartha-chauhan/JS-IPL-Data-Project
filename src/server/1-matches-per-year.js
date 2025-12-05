import { readCsv } from '../utils/csvToJson.js';
import { writeFile } from '../utils/writeFile.js';
import { CONSTANTS } from '../utils/constants.js';

function countMatchesPerYear() {
  const matches = readCsv(CONSTANTS.FILE_NAME.MATCHES);
  const matchesPerYear = {};

  for (const match of matches) {
    const year = match.season;
    if (matchesPerYear[year]) {
      matchesPerYear[year] += 1;
    } else {
      matchesPerYear[year] = 1;
    }
  }

  writeFile(CONSTANTS.OUTPUT.MATCHES_PER_YEAR, matchesPerYear);
}

countMatchesPerYear();
