import express from 'express';
import dotenv from 'dotenv';
import { getAllData, getFiguresByIds, getTitlesByFigureId,
getTitlesByConceptId, getConceptsByIds, getTitlesByTitleIds } from './helper.js';
import {router} from './api/index.js';

dotenv.config();

const app = express();
const data = getAllData(); 
const PORT = process.env.PORT || 9000;
const SERVER_TYPE = process.env.SERVER_TYPE || 'local';

app.set('view engine', 'ejs');

app.use('/api', router);

app.get('/figures/:id',function(req,res){
    const figureId = req.params.id;
    
    const figure = data.figures.find(f => f.id === figureId);

    if(!figure){
        return res.status(404).send("figure not found");
    }

    const titles = getTitlesByFigureId(figureId,data);
    
    const conceptIds = new Set(titles.flatMap(t => t.concepts));

    const concepts = getConceptsByIds(conceptIds,data);
    
    if(req.query.format === 'json'){
        return res.json({figure,titles,concepts});
    } else {
        res.render("figure", { figure,titles,concepts });
    }
});

app.get('/concepts/:id', (req, res) => {
    const conceptId = req.params.id;
    
    const concept = data.concepts.find(c => c.id === conceptId);
    
    if (!concept) {
        return res.status(404).send("Concept not found");
    }

    const titles = getTitlesByConceptId(conceptId,data);
  
    const figureIds = new Set(titles.flatMap(t => t.figures));
  
    const figures = getFiguresByIds(figureIds,data);
   

    if(req.query.format === 'json'){
        return res.json({concept,titles,figures});
    } else {
        res.render('concept', { concept, titles, figures });
    }

});
app.get('/titles/:id', (req, res) => {
    const titleId = req.params.id;
    
    const title = data.titles.find(t => t.id === titleId);
    
    if (!title) {
      return res.status(404).send("Title not found");
    }
    
    const figureIds = title.figures;
    const figures = getFiguresByIds(figureIds,data);
  
    const conceptIds = title.concepts;
    const concepts = getConceptsByIds(conceptIds,data);
    
    
    if(req.query.format === 'json'){
        return res.json({title,figures,concepts});
    } else {
        res.render("title", { title, figures, concepts });
    }
  });
app.get("/movements/:id", (req, res) => {
const movement = data.movements.find(m => m.id === req.params.id);

if (!movement) return res.status(404).send("Movement not found");

const figureIds = movement.figures;
const titleIds = movement.titles;
const conceptIds = movement.concepts;

const figures = getFiguresByIds(figureIds,data);
const titles = getTitlesByTitleIds(titleIds, data);
const concepts = getConceptsByIds(conceptIds,data);

res.render("movement", { movement, figures, titles, concepts });
});
app.get('/organizations/:id', function (req, res) {
    const organization = data.organizations.find(o => o.id === req.params.id);

    if (!organization) return res.status(404).send("Organization not found");
    
    const figureIds = organization.figures;
    const titleIds = organization.titles;
    const conceptIds = organization.concepts;

    const figures = getFiguresByIds(figureIds,data);
    const titles = getTitlesByTitleIds(titleIds, data);
    const concepts = getConceptsByIds(conceptIds,data);

    
    res.render('organization', { organization, figures, titles, concepts });
});


app.get('/',function(req,res){
    const data = getAllData();
    res.render("home", {  data }); 
});





app.use((req, res) => {
    res.status(404).send('Page not found');
});


app.listen(PORT, function () {
    console.log(`Starting the ${SERVER_TYPE} server`);
    console.log(`Server is running at http://localhost:${PORT}`);
});







