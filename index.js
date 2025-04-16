import express from 'express';
import dotenv from 'dotenv';
import { getAllData } from './helper.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;
const SERVER_TYPE = process.env.SERVER_TYPE || 'local';

app.set('view engine', 'ejs');

app.get('/',function(req,res){
    const data = getAllData();
    res.render("home", {  data }); 
});



// app.get('/api/figures', (req, res) => {
//     try {
//         const theObject = getSampleData();
//         res.json([theObject]); // send it back as an array
//     } catch (err) {
//         res.status(500).json({ error: 'Unable to load figure data' });
//     }
//   });


app.use((req, res) => {
    res.status(404).send('Page not found');
});


app.listen(PORT, function () {
    console.log(`Starting the ${SERVER_TYPE} server`);
    console.log(`Server is running at http://localhost:${PORT}`);
});







