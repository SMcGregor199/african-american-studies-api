import { v4 as uuidv4 } from 'uuid';

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
const updateBook = function (bookProperty, bookId) {
    const books = getBooks();

    books.forEach(function (book) {
        if (book.id == bookId) {
            book[bookProperty] = 
        }
    });

}

export {
    getBooks,
    saveBooks,
    addBook,
    updateBook,
}