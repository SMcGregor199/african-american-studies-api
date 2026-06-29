import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dataDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data');

const loadJSON = (filename) => {
    const filePath = path.join(dataDir, filename);
    const rawData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(rawData);
}

const getAllData = () => {
    return {
      figures: loadJSON('figures.json'),
      titles: loadJSON('titles.json'),
      concepts: loadJSON('concepts.json'),
      movements: loadJSON('movements.json'),
      organizations: loadJSON('organizations.json')
    };
};

export {
    getAllData
}
