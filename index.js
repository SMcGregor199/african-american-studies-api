
import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
const PORT = 9000;


const getBooks = function () {
    try {
        const data = fs.readFileSync('./books.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading books.json:", err);
        return [];
    }
}
const saveBooks = function (books) {
    try {
        fs.writeFileSync('./books.json', JSON.stringify(books, null, 2));
    } catch (err) {
        console.error('Error writing to books.json', err);
    }
}

const addBook = function (title, pubYear, authors, publisher, category) {
    const books = getBooks();
    const newBook = {
        id: uuidv4(),
        title,
        pubYear,
        authors,
        publisher,
        category
    };
    books.push(newBook);
    saveBooks(books);
    return newBook;
}

const server = http.createServer(function (request, response) {

    const url = new URL(request.url, `http://${request.headers.host}`);



    if (url.pathname === `/` && url.searchParams.has('pubYear')) {

        const pubYear = url.searchParams.get('pubYear');
        const books = getBooks();

        const filteredBooks = books.filter(
            function (book) {
                return book.pubYear === pubYear;
            }
        );

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(filteredBooks));
        console.log('The request was successfull');
    } else if (url.pathname === '/' && request.method === 'POST') {

        let body = '';
        request.on('data', function (chunk) {
            body += chunk.toString();
        });
        request.on('end', function () {
            const { title, pubYear, authors, publisher, category } = JSON.parse(body);
            const newBook = addBook(title, pubYear, authors, publisher, category);
            response.writeHead(201, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(newBook));
            console.log("New Book added:", newBook);
        });
    } else if (url.pathname === '/') {
        const indexPath = path.join('/public', 'index.html');
        console.log(indexPath);
        fs.readFile(`./${indexPath}`, 'utf-8', (err, data) => {
            if (err) {
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.end('File not found');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            }
        });

    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Endpoint not found');
    }

});


server.listen(PORT, function () {
    console.log(`Server is running at https://localhost:${PORT}`);
});