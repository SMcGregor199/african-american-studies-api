
import dotenv from 'dotenv';
import http from 'node:http';
import express from 'express';



import { fileURLToPath } from 'node:url';
import { URL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { getBooks, addBook } from './helper.js';
dotenv.config();

const SERVER_TYPE = process.env.SERVER_TYPE;
const PORT = process.env.PORT;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (SERVER_TYPE === 'http') {

    const server = http.createServer(function (request, response) {

        const url = new URL(request.url, `http://${request.headers.host}`);

        if (url.pathname === '/') {
            let filePath = path.join(process.cwd(), 'public', url.pathname === '/' ? 'index.html' : url.pathname);
            fs.readFile(filePath, 'utf-8', (err, data) => {

                if (err) {
                    response.writeHead(404, { 'Content-Type': 'text/plain' });
                    response.end('File not found');
                } else {
                    let modifiedData = data;
                    if (url.pathname === '/' && url.searchParams.has("pubYear")) {
                        const pubYear = url.searchParams.get("pubYear");
                        const books = getBooks();

                        const filteredBooks = books.filter(
                            function (book) {
                                return book.pubYear === pubYear;
                            }
                        );
                        const scriptTag = `<script>window.bookData = ${JSON.stringify(filteredBooks)};</script>`;
                        modifiedData = data.replace('</body>', `${scriptTag}</body>`);
                    }
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(modifiedData);
                }
            });

        }
    });

    server.listen(PORT, function () {
        console.log(`Starting the ${SERVER_TYPE} server`);
        console.log(`Server is running at http://localhost:${PORT}`);
    });

} else if (SERVER_TYPE === 'express') {


    app.use(function (request, response) {
        console.log(request.query);
        let filePath = path.join(__dirname, 'express-public', 'index.html');

        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                response.status(404).send('File not found');
            } else {
                let modifiedData = data;


                if (request.query.pubYear) {

                    const pubYear = request.query.pubYear;

                    const books = getBooks();

                    const filteredBooks = books.filter(
                        function (book) {
                            return book.pubYear === pubYear;
                        }
                    );
                    const scriptTag = `<script>window.bookData = ${JSON.stringify(filteredBooks)};</script>`;
                    modifiedData = data.replace('</body>', `${scriptTag}</body>`);

                }
                response.setHeader('Content-Type', 'text/html');
                response.send(modifiedData);
            }

        });
    });


    app.listen(PORT, function () {
        console.log(`Starting the ${SERVER_TYPE} server`);
        console.log(`Server is running at http://localhost:${PORT}`);
    });

}





