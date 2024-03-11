document.addEventListener('DOMContentLoaded', () => {
    const getBookDetailsButton = document.getElementById('getBookByIdButton');
    getBookDetailsButton.addEventListener('click', getBookById);
});

async function getBookById() {
    try {
        const booksResponse = await fetch('/api/books');
        const books = await booksResponse.json();
        if (books.length === 0) {
            console.log('No books found.');
            return;
        }

        const resultareaContainer = document.getElementById('resultarea');
        resultareaContainer.innerHTML = '';

        // Display the table
        displayBooksTable(books);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

function displayBooksTable(books) {
    const resultareaContainer = document.getElementById('resultarea');

    // Create an <h2> tag
    const h2Tag = document.createElement('h2');
    h2Tag.textContent = 'Click on a book to view its details';

    // Create the table
    const table = document.createElement('table');
    table.classList.add('book-table');
    const tbody = document.createElement('tbody');

    // Create the header row
    const headerRow = document.createElement('tr');

    // Create header cells for each column
    const IdHeader = document.createElement('th');
    IdHeader.textContent = 'Book Id';
    headerRow.appendChild(IdHeader);

    const nameHeader = document.createElement('th');
    nameHeader.textContent = 'Name';
    headerRow.appendChild(nameHeader);

    const authorHeader = document.createElement('th');
    authorHeader.textContent = 'Author';
    headerRow.appendChild(authorHeader);

    // Append the header row to the table
    tbody.appendChild(headerRow);

    // Create rows for each book
    books.forEach(book => {
        const row = document.createElement('tr');

        row.addEventListener('click', () => {
            fetchAndDisplayBookDetails(book.bookID);
        });

        // Create cell for Id
        const iDCell = document.createElement('td');
        iDCell.textContent = book.bookID;
        row.appendChild(iDCell);

        // Create cell for name
        const nameCell = document.createElement('td');
        nameCell.textContent = book.name;
        row.appendChild(nameCell);

        // Create cell for author
        const authorCell = document.createElement('td');
        authorCell.textContent = book.author;
        row.appendChild(authorCell);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Append the h2 tag and table to the container
    resultareaContainer.appendChild(h2Tag);
    resultareaContainer.appendChild(table);
    resultareaContainer.classList.add('container');
}

async function fetchAndDisplayBookDetails(bookId) {
    try {
        const response = await fetch(`/books/${bookId}`);
        const bookDetails = await response.text();
        document.getElementById('resultarea').innerHTML = bookDetails;
    } catch (error) {
        console.error(`Error fetching book details for book ID ${bookId}:`, error);
    }
}
