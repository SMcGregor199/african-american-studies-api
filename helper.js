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
      concepts: loadJSON('concepts.json'),
      movements: loadJSON('movements.json'),
      organizations: loadJSON('organizations.json')
    };
};

function getFiguresByIds(ids, data) {
    const matcher = Array.isArray(ids)
    ? id => ids.includes(id)
    : id => ids.has(id);
    return data.figures.filter(f => matcher(f.id));
}  
function getTitlesByFigureId(figureId, data) {
    return data.titles.filter(t => t.figures.includes(figureId));
}
function getTitlesByConceptId(conceptId, data) {
    return data.titles.filter(t => t.concepts.includes(conceptId));
}
function getConceptsByIds(ids, data) {
    const matcher = Array.isArray(ids)
      ? id => ids.includes(id)
      : id => ids.has(id);
    return data.concepts.filter(c => matcher(c.id));
}
function getTitlesByTitleIds(ids,data){
    const matcher = Array.isArray(ids)
      ? id => ids.includes(id)
      : id => ids.has(id);
    return data.titles.filter(c => matcher(c.id));
}

        

export {
    getAllData,
    getFiguresByIds,
    getTitlesByFigureId,
    getTitlesByConceptId,
    getConceptsByIds,
    getTitlesByTitleIds
}