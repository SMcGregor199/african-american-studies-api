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
    res.render("figure", { figure,titles,concepts }); 
});
app.get('/concepts/:id', (req, res) => {
    const conceptId = req.params.id;
    const concept = data.concepts.find(c => c.id === conceptId);
    if (!concept) {
        return res.status(404).send("Concept not found");
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







