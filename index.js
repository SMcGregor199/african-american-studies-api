
import dotenv from 'dotenv';
import http from 'node:http';
import express from 'express';
import { URL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { getBooks, addBook } from './helper.js';
dotenv.config();

const SERVER_TYPE = process.env.SERVER_TYPE;
const PORT = process.env.PORT;

const app = express();
const __dirname = new URL('', import.meta.url).pathname;

if (SERVER_TYPE === 'http') {

    const server = http.createServer(function (request, response) {

        const url = new URL(request.url, `http://${request.headers.host}`);
        console.log()
        if (url.pathname === '/') {
            let filePath = path.join(process.cwd(), 'public', url.pathname === '/' ? 'index.html' : url.pathname);


            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    response.writeHead(404, { 'Content-Type': 'text/plain' });
                    response.end('File not found');
                } else {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(data);
                }
            });
        }

    });




    server.listen(PORT, function () {
        console.log(`Starting the ${SERVER_TYPE} server`);
        console.log(`Server is running at http://localhost:${PORT}`);
    });

} else if (SERVER_TYPE === 'express') {

    app.use(express.static(path.join(__dirname, 'express-public')));

    // app.get('/', function (request, response) {
    //     response.sendFile('example.html', { root: __dirname });
    // });

    app.listen(PORT, function () {
        console.log(`Starting the ${SERVER_TYPE} server`);
        console.log(`Server is running at http://localhost:${PORT}`);
    });

}





