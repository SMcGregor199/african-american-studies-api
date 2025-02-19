import express from 'express';
const app = express();
app.set('view engine', 'ejs');

import dotenv from 'dotenv';
dotenv.config();

const SERVER_TYPE = process.env.SERVER_TYPE;
const PORT = process.env.PORT;

import { getBooks, addBook } from './helper.js';










app.use(function (request, response) {
    
    let compiledBookData = '';

    if (request.query.pubYear) {

        const pubYear = request.query.pubYear;

        const books = getBooks();

        const filteredBooks = books.filter(
            function (book) {
                return book.pubYear === pubYear;
            }
        );
        compiledBookData = JSON.stringify(filteredBooks);

    } else if (request.method == "POST") {
        let body = '';
        request.on('data', function (chunk) {
            body += chunk.toString();
        });
        request.on('end', function () {

            const { title, pubYear, authors, publisher, category } = JSON.parse(body);

            const newBook = addBook(title, pubYear, authors, publisher, category);
            compiledBookData = JSON.stringify(newBook);


        });


    }

    response.setHeader('Content-Type', 'text/html');
    console.log(compiledBookData);
    response.render("home", { serverName: SERVER_TYPE, bookData: compiledBookData });

});


app.listen(PORT, function () {
    console.log(`Starting the ${SERVER_TYPE} server`);
    console.log(`Server is running at http://localhost:${PORT}`);
});







