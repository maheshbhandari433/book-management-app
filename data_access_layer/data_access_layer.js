const fs = require('fs');

class DataStorage {
    constructor(filePath) {
        this.filePath = filePath;
        this.loadData();
    }

    loadData() {
        try {
            const fileContent = fs.readFileSync(this.filePath, 'utf8');
            this.data = JSON.parse(fileContent);
            this.nextId = this.data.reduce((maxId, book) => Math.max(maxId, book.bookID), 0) + 1;
        } catch (error) {
            console.error('Error loading data:', error);
            this.data = [];
            this.nextId = 1;
        }
    }

    saveData() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    getAll() {
        return this.data;
    }

    getOne(bookId) {
        return this.data.find(book => book.bookID === bookId);
    }

    insert(book) {
        book.bookID = this.nextId++;
        this.data.push(book);
        this.saveData();
        return book;
    }

    update(bookId, newData) {
        const index = this.data.findIndex(book => book.bookID === bookId);
        if (index !== -1) {
            this.data[index] = { ...this.data[index], ...newData };
            this.saveData();
            return this.data[index];
        }
        return null;
    }

    remove(bookId) {
        const index = this.data.findIndex(book => book.bookID === bookId);
        if (index !== -1) {
            this.data.splice(index, 1);
            this.saveData();
            return true;
        }
        return false;
    }
}

class DataAccessLayer {
    constructor(filePath) {
        this.dataStorage = new DataStorage(filePath);
    }

    getAllBooks() {
        return this.dataStorage.getAll();
    }

    getBookById(bookId) {
        return this.dataStorage.getOne(bookId);
    }

    addBook(book) {
        return this.dataStorage.insert(book);
    }

    updateBook(bookId, newData) {
        return this.dataStorage.update(bookId, newData);
    }

    deleteBook(bookId) {
        return this.dataStorage.remove(bookId);
    }
}

module.exports = { DataAccessLayer };
