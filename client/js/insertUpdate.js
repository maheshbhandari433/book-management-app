// Get the container element where the insertUpdate.ejs content will be loaded
const insertUpdateContainer = document.getElementById('resultarea');
// Get the insert and update buttons
const insertBookButton = document.getElementById('insertBookButton');
const updateBookButton = document.getElementById('updateBookButton');

// Function to fetch and display content
async function fetchAndDisplayContent(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch content');
        }
        const content = await response.text();

        // Update the DOM with HTML content
        insertUpdateContainer.innerHTML = content;

        // Add form submission functionality
        const bookForm = document.getElementById('bookForm');
        bookForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const bookId = document.getElementById('bookId').value;
            const name = document.getElementById('name').value;
            const author = document.getElementById('author').value;
            const topic = document.getElementById('topic').value;
            const type = document.getElementById('type').value;
            const data = { name, author, topic, type };
            let submitUrl = '/api/books';
            let method = 'POST';
            if (bookId) {
                submitUrl += `/${bookId}`;
                method = 'PUT';
            }
            try {
                const submitResponse = await fetch(submitUrl, {
                    method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if (submitResponse.ok) {
                    alert('Book operation successful');
                    window.location.href = '/';
                } else {
                    alert('Error processing book operation');
                }
            } catch (error) {
                console.error('Error processing book operation:', error);
                alert('Error processing book operation. Please try again.');
            }
        });
    } catch (error) {
        console.error('Error fetching content:', error);
        alert('Error fetching content. No book found.');
    }
}

// Add event listener for the insert button
insertBookButton.addEventListener('click', async () => {
    await fetchAndDisplayContent('/insert');
});

// Add event listener for the update button
updateBookButton.addEventListener('click', async () => {
    try {
        // Fetch the list of books
        const booksResponse = await fetch('/api/books');
        const books = await booksResponse.json();
        if (books.length === 0) {
            alert('No books found.');
            return;
        }
       
        const bookDetailsContainer = document.getElementById('resultarea');
        bookDetailsContainer.innerHTML = '';

        // Display the list of books in a table
        displayBooksTableForUpdate(books);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
});

function displayBooksTableForUpdate(books) {
    // Create a table element
    const table = document.createElement('table');
    table.classList.add('book-table');

    // Create the table headers
    const headersRow = document.createElement('tr');
    const idHeader = document.createElement('th');
    idHeader.textContent = 'Book ID';
    headersRow.appendChild(idHeader);
    const nameHeader = document.createElement('th');
    nameHeader.textContent = 'Name';
    headersRow.appendChild(nameHeader);
    const authorHeader = document.createElement('th');
    authorHeader.textContent = 'Author';
    headersRow.appendChild(authorHeader);
    table.appendChild(headersRow);

    // Populate the table with book data
    books.forEach(book => {
        const row = document.createElement('tr');
        row.addEventListener('click', () => {
            // When a row is clicked, fetch and display the content for updating
            fetchAndDisplayContent(`/update/${book.bookID}`);
        });

        const idCell = document.createElement('td');
        idCell.textContent = book.bookID;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = book.name;
        row.appendChild(nameCell);

        const authorCell = document.createElement('td');
        authorCell.textContent = book.author;
        row.appendChild(authorCell);

        table.appendChild(row);
    });

    // Replace the update button with the books table
    const updateButtonContainer = document.getElementById('resultarea');
    updateButtonContainer.innerHTML = '';

    // Create an h2 element for the heading
    const heading = document.createElement('h2');
    heading.textContent = 'Click on a book to update';

    updateButtonContainer.appendChild(heading);
    updateButtonContainer.appendChild(table);

}