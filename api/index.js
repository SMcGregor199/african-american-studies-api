import express from 'express';
import { getAllData, getFiguresByIds, getTitlesByFigureId,
getTitlesByConceptId, getConceptsByIds } from '../helper.js';


const router = express.Router();
const data = getAllData(); 

router.get('/figures/:id', (req, res) => {
    const figureId = req.params.id;
    const figure = data.figures.find(f => f.id === figureId);
  
    if (!figure) return res.status(404).json({ error: 'Figure not found' });
  
    const titles = getTitlesByFigureId(figureId, data);
    const conceptIds = new Set(titles.flatMap(t => t.concepts));
    const concepts = getConceptsByIds(conceptIds, data);
  
    res.json({ figure, titles, concepts });
});
router.get('/figures', (req, res) => {
    res.json(data.figures);
});
router.get('/concepts/:id', (req, res) => {
    const conceptId = req.params.id;
    const concept = data.concepts.find(c => c.id === conceptId);
  
    if (!concept) return res.status(404).json({ error: 'Concept not found' });
  
    const titles = getTitlesByConceptId(conceptId, data);
    const figureIds = new Set(titles.flatMap(t => t.figureIds));
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
  
    const figures = getFiguresByIds(title.figureIds, data);
    const concepts = getConceptsByIds(title.concepts, data);
  
    res.json({ title, figures, concepts });
});
router.get('/titles', (req, res) => {
    res.json(data.titles);
});

export {
    router
}