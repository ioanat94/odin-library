let myLibrary = [];
let newBookButton = document.getElementById('new-book-btn');
let form = document.getElementById('book-form');
let addButton = document.getElementById('add-button');
let author = document.getElementById('author');
let title = document.getElementById('title');
let pages = document.getElementById('pages');
let read = document.getElementById('read');
let bookList = document.getElementById('book-list');

if (localStorage.getItem('books') === null) {
    myLibrary = [];
} else {
    const booksFromStorage = JSON.parse(localStorage.getItem('books'));
    myLibrary = booksFromStorage;
    displayStorageBooks();
};

function displayStorageBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        displayBook(myLibrary[i]);
    };
};

newBookButton.addEventListener('click', function() {
    if (form.style.display == "block") {
        form.style.display = "none";
    } else {
        form.style.display = "block";
    }
});

addButton.addEventListener('click', function() {
    let authorName = author.value;
    let titleName = title.value;
    let pagesCount = pages.value;
    let readStatus;
    if (read.checked) {
        readStatus = true;
    } else {
        readStatus = false;
    }

    if (authorName != "" && titleName != "" && pagesCount != "") {
        let newBook = new Book(authorName, titleName, pagesCount, readStatus);
        addBookToLibrary(newBook);
        displayBook(newBook);
        localStorage.setItem('books', JSON.stringify(myLibrary));
    }
});

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBook(book) {
    let bookEntry = document.createElement('div');
    let author = document.createElement('p');
    let title = document.createElement('p');
    let pages = document.createElement('p');
    let readBtn = document.createElement('button');
    let removeBtn = document.createElement('button');

    author.textContent = `${book.author}`;
    title.textContent = `${book.title}`;
    pages.textContent = `${book.pages} pages`;

    if (book.read) {
        readBtn.textContent = 'Read';
    } else {
        readBtn.textContent = 'Not read';
    }

    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', function() {
        let books = Array.from(bookList.childNodes);
        myLibrary.splice(books.indexOf(bookEntry), 1);
        bookList.removeChild(bookEntry);
        localStorage.setItem('books', JSON.stringify(myLibrary));
    });

    readBtn.onclick = function() {
        if (book.read) {
            book.read = false;
            readBtn.textContent = 'Not read';
        } else {
            book.read = true;
            readBtn.textContent = 'Read';
        }
    };

    bookEntry.appendChild(author);
    bookEntry.appendChild(title);
    bookEntry.appendChild(pages);
    bookEntry.appendChild(readBtn);
    bookEntry.appendChild(removeBtn);
    bookList.appendChild(bookEntry);
};