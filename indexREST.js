const express = require('express');
const cors = require('cors');
const path = require('path');

// Data and DataAccessLayer from previous code
const { DataAccessLayer } = require('./DataAccess/data_access_layer');

// Create an instance of DataAccessLayer with original data from file
 const dataAccessLayer = new DataAccessLayer('./Bhandari_Mahesh_books.json'); 

// Create express app
const app = express();

// Middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get('/api/hello', (req, res) => res.send('Hello World!'));

// Middleware to serve static files (including HTML, CSS, and JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// Define the home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'homeSPA.html')); 
});

// Middleware to serve CSS files with the correct MIME type
 app.use('/styles', express.static(path.join(__dirname, '/styles'), { 
    setHeaders: (res, filePath) => {
        if (path.extname(filePath) === '.css') {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));  

// Middleware to serve JavaScript files with the correct MIME type
app.use('/client/js', express.static(path.join(__dirname, 'client', 'js'), {
    setHeaders: (res, filePath) => {
        if (path.extname(filePath) === '.js') {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'client/views')); 

// Define the books route to serve getAll.ejs
app.get('/books', (req, res) => {
    const allBooks = dataAccessLayer.getAllBooks();
    res.render('getAll', { books: allBooks });
});

// GET book by ID (render getOne.ejs)
 app.get('/books/:bookID', (req, res) => {
    const bookId = parseInt(req.params.bookID);
    const book = dataAccessLayer.getBookById(bookId);
    if (book) {
        res.render('getOne', { book }); // Render the getOne.ejs template and pass the book data
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
}); 

// Define insert and update routes
app.get('/insert', (req, res) => {
    // Render insertUpdate.ejs with mode set to 'insert' and an empty book object
    res.render('insertUpdate', { mode: 'insert', book: null });
});

app.get('/update/:bookID', (req, res) => {
    const bookId = parseInt(req.params.bookID);
    const book = dataAccessLayer.getBookById(bookId);
    if (book) {
        // Render insertUpdate.ejs with mode set to 'update' and the retrieved book object
        res.render('insertUpdate', { mode: 'update', book: book });
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// Define remove route to serve remove.ejs
app.get('/remove', async (req, res) => {
    try {
        // Fetch all books from data source
        const books = await dataAccessLayer.getAllBooks(); 

        // Render the remove.ejs template and pass the list of books as data
        res.render('remove', { books: books });
    } catch (error) {
        // Handle error if fetching books fails
        console.error('Error fetching books:', error);
        res.status(500).send('Internal Server Error');
    }
});


// GET all books
app.get('/api/books', (req, res) => {
    const allBooks = dataAccessLayer.getAllBooks();
    res.json(allBooks);
});

// GET book by ID
app.get('/api/books/:bookID', (req, res) => {
    const bookId = parseInt(req.params.bookID);
    const book = dataAccessLayer.getBookById(bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// Insert book data
app.post('/api/books', (req, res) => {
    const newBook = req.body;
    const addedBook = dataAccessLayer.addBook(newBook);
    res.status(201).json(addedBook);
});

// Update book by ID
app.put('/api/books/:bookID', (req, res) => {
    const bookId = parseInt(req.params.bookID);
    const newData = req.body;
    const updatedBook = dataAccessLayer.updateBook(bookId, newData);
    if (updatedBook) {
        res.json(updatedBook);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// Delete book by ID
app.delete('/api/books/:bookID', (req, res) => {
    const bookId = parseInt(req.params.bookID);
    const deleted = dataAccessLayer.deleteBook(bookId);
    if (deleted) {
        res.json({ message: 'Book deleted successfully' });
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});


// Start the server
/* const PORT = 4000; */
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
