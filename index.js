import express from 'express';
import dotenv from 'dotenv';
import { getAllData } from './helper.js';

dotenv.config();

const app = express();
const data = getAllData(); 
const PORT = process.env.PORT || 9000;
const SERVER_TYPE = process.env.SERVER_TYPE || 'local';

app.set('view engine', 'ejs');

app.get('/figures/:id',function(req,res){
    const figureId = req.params.id;
    const figure = data.figures.find(function(f){ 
        return f.id === figureId;
    });
    if(!figure){
        return res.status(404).send("figure not found");
    }
    const titles = data.titles.filter(function(t){
        return t.figureId === figureId;
    });
    const conceptIds = new Set(titles.flatMap(function(t){
       return t.concepts;
    }));
    const concepts = data.concepts.filter(function(c){
        return conceptIds.has(c.id);
    });
    
    
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
    const titles = data.titles.filter(t => t.concepts.includes(conceptId));
    const figureIds = new Set(titles.map(t => t.figureId));
    const figures = data.figures.filter(f => figureIds.has(f.id));

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
  
    const figureIds = title.figureId; 
    const figures = data.figures.filter(f => figureIds.includes(f.id));
  
    const conceptIds = title.concepts;
    const concepts = data.concepts.filter(c => conceptIds.includes(c.id));
  
    if(req.query.format === 'json'){
        return res.json({title,figures,concepts});
    } else {
        res.render("title", { title, figures, concepts });
    }
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







