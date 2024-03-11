document.addEventListener('DOMContentLoaded', () => {
    // Load remove container when the button is clicked
    
    document.getElementById('deleteBookButton').addEventListener('click', async () => {
        
        try {
            const response = await fetch('/remove');
            if (!response.ok) {
                throw new Error('Failed to fetch remove content');
            }
            const removeContent = await response.text();
            document.getElementById('resultarea').innerHTML = removeContent;
           
            // Delete button functionality
            const deleteButton = document.getElementById('deleteButton');
            const deleteForm = document.getElementById('deleteForm');
    
    
            deleteButton.addEventListener('click', async () => {
                const booksToDelete = Array.from(deleteForm.elements.booksToDelete)
                        .filter(checkbox => checkbox.checked)
                        .map(checkbox => checkbox.value);

                if (booksToDelete.length === 0) {
                     showMessage('Please select at least one book to delete.');  
                    return;
                }

                try {
                    // Send DELETE requests for each selected book
                    for (const bookId of booksToDelete) {
                        const response = await fetch(`/api/books/${bookId}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        if (!response.ok) {
                            throw new Error('Failed to delete book');
                        }
                    }

                    // Show success message after all books are deleted
                      showMessage('Selected books deleted successfully!');
                        

                } catch (error) {
                    console.error('Error deleting books:', error);
                      showMessage('Error deleting selected books. Please try again.');  
                }
            });

        } catch (error) {
            console.error('Error loading remove content:', error);
            // Handle error (e.g., display an error message)
        }
    });

    function showMessage(message) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = message;
        window.setTimeout(() => {
            window.location.href = '/';
        }, 3000);
    }
   
});

