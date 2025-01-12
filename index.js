
import http from 'http';

const books = [

    { title: 'Four Hundred Souls: A Community History of African America, 1619-2019', pubYear: '2021', authors: ['Ibram X. Kendi', 'Keisha N. Blain'] }

];

const server = http.createServer(function (request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    console.log(url);

    if (url.pathname === `/` && url.searchParams.has('pubYear')) {
        const pubYear = url.searchParams.get('pubYear');
        const filteredBooks = books.filter(
            function (book) {
                return book.pubYear === pubYear;
            }
        );

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(filteredBooks));
        console.log('The request was successfull');
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Endpoint not found');
    }

});

const PORT = 9000;
server.listen(PORT, function () {
    console.log(`Server is running at https://localhost:${PORT}`);
});