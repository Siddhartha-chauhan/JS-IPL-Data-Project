import fs from 'fs';
import path from 'path';

function writeFile(fileName, data) {
  const filePath = path.join('src/public/output', `${fileName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`File written: ${filePath}`);
}

export { writeFile };
