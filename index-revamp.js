import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
const PORT = 9000;



const server = http.createServer(function (request, response) {

    const url = new URL(request.url, `http://${request.headers.host}`);



    // if (url.pathname === `/` && url.searchParams.has('pubYear')) {

    //     const pubYear = url.searchParams.get('pubYear');
    //     const books = getBooks();

    //     const filteredBooks = books.filter(
    //         function (book) {
    //             return book.pubYear === pubYear;
    //         }
    //     );

    //     response.writeHead(200, { 'Content-Type': 'application/json' });
    //     response.end(JSON.stringify(filteredBooks));
    //     console.log('The request was successfull');
    // } else if (url.pathname === '/' && request.method === 'POST') {

    //     let body = '';
    //     request.on('data', function (chunk) {
    //         body += chunk.toString();
    //     });
    //     request.on('end', function () {
    //         const { title, pubYear, authors, publisher, category } = JSON.parse(body);
    //         const newBook = addBook(title, pubYear, authors, publisher, category);
    //         response.writeHead(201, { 'Content-Type': 'application/json' });
    //         response.end(JSON.stringify(newBook));
    //         console.log("New Book added:", newBook);
    //     });
    // } else if (url.pathname === '/') {
    //     let filePath = path.join(process.cwd(), 'public', url.pathname === '/' ? 'index.html' : url.pathname);
    //     const ext = path.extname(filePath);
    //     console.log(filePath);
    //     let contentType = 'text/html';
    //     if (ext === '.js') {
    //         contentType = 'application/javascript';
    //     } else if (ext === '.css') {
    //         contentType = 'text/css';
    //     } else if (ext === '.json') {
    //         contentType = 'application/json';
    //     }

    //     fs.readFile(`${filePath}`, 'utf-8', (err, data) => {
    //         if (err) {
    //             response.writeHead(404, { 'Content-Type': 'text/plain' });
    //             response.end('File not found');
    //         } else {
    //             response.writeHead(200, { 'Content-Type': contentType });
    //             response.end(data);
    //         }
    //     });

} else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Endpoint not found');
}

});










server.listen(PORT, function () {
    console.log(`Server is running at https://localhost:${PORT}`);
});


