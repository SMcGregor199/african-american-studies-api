import express from 'express';
import { getAllData, getFiguresByIds, getTitlesByFigureId,
getTitlesByConceptId, getConceptsByIds, getTitlesByTitleIds } from '../helper.js';


const router = express.Router();
const data = getAllData(); 

router.get('/figures/:id', (req, res) => {
    const figureId = req.params.id;
    const figure = data.figures.find(f => f.id === figureId);
  
    if (!figure) return res.status(404).json({ error: 'Figure not found' });
  
    const titles = getTitlesByFigureId(figureId, data);
    const conceptIds = new Set(titles.flatMap(t => t.concepts));
    const concepts = getConceptsByIds(conceptIds, data);

    const organizations = data.organizations.filter(org => org.figures.includes(figureId));
    const movements = data.movements.filter(mov => mov.figures.includes(figureId));
    const availableData = {
        titles,
        concepts,
        organizations,
        movements
    };
    const filter = req.query.filter;

    if(filter){
        const allowedFilters = Object.keys(availableData);

        if(!allowedFilters.includes(filter)){
            return res.status(400).json({ error: 'Invalid filter type. Must be one of: titles, concepts, organizations, movements' });
        }

        const filterData = {
            figure,
            [filter]: availableData[filter] 
        };
        return res.json(filterData);
    }
    
    res.json({ figure, titles, concepts, organizations, movements });
});
router.get('/figures', (req, res) => {
    let figures = data.figures;
    if(req.query.tag){
        figures = figures.filter(figure => figure.tags.includes(req.query.tag));
    }
    if(req.query.name){
        const search = req.query.name.toLowerCase();
        figures = figures.filter(figure => figure.name.toLowerCase().includes(search));
    }
    if(req.query.concept){
        const concept = data.concepts.find(c => c.id === req.query.concept);
        if (!concept) return res.status(404).json({ error: 'Concept not found' });
        
        figures = figures.filter(f => concept.figures.includes(f.id));
        
    }
    if(req.query.movement){
        const movement = data.movements.find(m => m.id === req.query.movement);
        if (!movement) return res.status(404).json({ error: 'Movement not found' });

        figures = figures.filter(f => movement.figures.includes(f.id));
    }
    if(req.query.organization){
        const org = data.organizations.find(o => o.id === req.query.organization);
        if (!org) return res.status(404).json({ error: 'Organization not found' });

        figures = figures.filter(f => org.figures.includes(f.id));
    }
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);

    if (!isNaN(limit) && !isNaN(offset)) {
        figures = figures.slice(offset, offset + limit);
    } else if (!isNaN(limit)) {
        figures = figures.slice(0, limit);
    } else if (!isNaN(offset)) {
        figures = figures.slice(offset);
    } .. 

    res.json(figures);
});
router.get('/concepts/:id', (req, res) => {
    const conceptId = req.params.id;
    const concept = data.concepts.find(c => c.id === conceptId);
  
    if (!concept) return res.status(404).json({ error: 'Concept not found' });
  
    const titles = getTitlesByConceptId(conceptId, data);
    const figureIds = new Set(titles.flatMap(t => t.figures));
    const figures = getFiguresByIds(figureIds, data);
  
    res.json({ concept, titles, figures });
});
router.get('/concepts', (req, res) => {
    res.json(data.concepts);
});
router.get('/titles/:id', (req, res) => {
    const titleId = req.params.id;
    const title = data.titles.find(t => t.id === titleId);
  
    if (!title) return res.status(404).json({ error: 'Title not found' });
  
    const figures = getFiguresByIds(title.figures, data);
    const concepts = getConceptsByIds(title.concepts, data);
  
    res.json({ title, figures, concepts });
});
router.get('/titles', (req, res) => {
    res.json(data.titles);
});
router.get('/movements/:id', (req, res) => {
    const movementId = req.params.id;
    const movement = data.movements.find(m => m.id === movementId);
  
    if (!movement) return res.status(404).json({ error: 'movement not found' });
  
    const figureIds = movement.figures;
    const titleIds = movement.titles;
    const conceptIds = movement.concepts;

    const figures = getFiguresByIds(figureIds,data);
    const titles = getTitlesByTitleIds(titleIds, data);
    const concepts = getConceptsByIds(conceptIds,data);
  
    res.json({ figures, titles, concepts });
});
router.get('/movements', (req, res) => {
    res.json(data.movements);
});
export {
    router
}