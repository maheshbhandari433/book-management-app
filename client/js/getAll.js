// Function to fetch all books and render them on the page
async function getAllBooks() {
    try {
        const response = await fetch('/books'); // Make a GET request to the /books endpoint
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }
        const booksHTML = await response.text(); // Get the HTML content of the rendered books page
        document.getElementById('resultarea').innerHTML = booksHTML; // Display the books HTML content on the page
    } catch (error) {
        console.error('Error fetching all books:', error);
    }
}

// Event listener for the "Get All Books" button click
document.getElementById('getAllBooksButton').addEventListener('click', getAllBooks);
