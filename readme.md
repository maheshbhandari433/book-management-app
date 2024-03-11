# Book Management System

The Book Management System is a web application designed to manage a collection of books. It provides functionalities for inserting, updating, deleting, and viewing details of books.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Dependencies](#dependencies)
- [Live URL](#live-url)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Book Management System is built using JavaScript and Node.js. It uses Express.js as the backend framework and EJS templates for rendering views. The system provides a RESTful API for CRUD operations on books.

## Features

- **Add Book**: Allows users to insert new books into the system.
- **Update Book**: Enables users to update existing book details.
- **Delete Book**: Provides functionality to delete books from the system.
- **View Book Details**: Allows users to view detailed information about a specific book.

## Installation
To install and run the Book Management System locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install dependencies: `npm install`
4. Start the server: `npm start`
5. Access the application in your browser at `http://localhost:4000`

## Usage

Once the application is deployed, users can perform the following actions:

- Access the home page to view all books.
- Click on a book to view its details.
- Use the navigation buttons to add, update, or delete books.

# File Structure

The project follows this file structure:

- `Bhandari_Mahesh_books.json`: Sample book data in JSON format

- `DataAccess`: Folder containing data access layer logic
  - `data_access_layer.js`: Implementation of data storage and retrieval

- `client`: Client-side JavaScript files
  - `js`
    - `getAll.js`: Logic for fetching all books
    - `getOne.js`: Logic for fetching details of a single book
    - `insertUpdate.js`: Logic for inserting and updating books
    - `remove.js`: Logic for deleting books
  - `views`: EJS template files for rendering views
    - `getAll.ejs`: Template for displaying all books
    - `getOne.ejs`: Template for displaying details of a single book
    - `insertUpdate.ejs`: Template for inserting or updating a book
    - `remove.ejs`: Template for removing a book

- `homeSPA.html`: Single page application for the home page

- `indexREST.js`: Entry point for the server with RESTful API endpoints

- `package-lock.json`: Auto-generated file for npm dependencies

- `package.json`: Configuration file for npm packages

- `public`: Static assets (e.g., stylesheets, images)
  - `styles`
    - `styleSPA.css`: CSS styles for the application


## Dependencies

The Book Management System relies on the following main dependencies:

- **Express.js**: Web application framework for Node.js
- **EJS**: Embedded JavaScript templates for generating HTML markup
- **Fetch API**: Web API for making HTTP requests

## Live URL

The Book Management System is deployed at [#].

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
