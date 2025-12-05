import fs from 'fs';
import path from 'path';

function readCsv(file) {
  const filePath = path.join('src', 'data', `${file}.csv`);
  const csv = fs.readFileSync(filePath, 'utf-8');

  const lines = csv.trim().split('\n');
  if (!lines.length) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[j] ? values[j].trim() : '';
    }
    data.push(row);
  }

  return data;
}

export { readCsv };
