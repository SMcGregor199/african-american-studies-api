import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const getSampleData = function(){
    try{
        const data = fs.readFileSync('./sample.json', 'utf8');
        return JSON.parse(data);
    } catch(err){
        console.error("Error reading sample.json",err);
        return[];
    }
}



export {
    getSampleData
}