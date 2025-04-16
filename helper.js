import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const loadJSON = (filename) => {
    const filePath = path.join(`./data`,filename);
    const rawData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(rawData);
}

const getAllData = () => {
    return {
      figures: loadJSON('figures.json'),
      titles: loadJSON('titles.json'),
      concepts: loadJSON('concepts.json')
    };
};



export {
    getAllData
}