class Book {
    constructor(title, author, page, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.page = page;
        this.read = read;
    }
}

class Library {
    #books = [];

    addBook(book) {
        this.#books.push(book);
    }

    deleteBook(book) {
        const index = this.#books.findIndex(element => element.id === book.id);
        if ((index !== -1)) {
            this.#books.splice(index, 1);
        }
    }

    get books() {
        return [...this.#books];
    }
}

let library = new Library();

let fearAndLoathing = new Book("Fear and Loathing in Las Vegas: A Savage Journey to the Heart of the American Dream", "Hunter S. Thompson", 204, true);
library.addBook(fearAndLoathing);

let hellsAngels = new Book("Hell's Angels", "Hunter S. Thompson", 295, true);
library.addBook(hellsAngels);

let waysOfSeeing = new Book("Ways of Seeing", "John Berger", 176, true);
library.addBook(waysOfSeeing);

let kitchenConfidential = new Book("Kitchen Confidential", "Anthony Bourdain", 362, true);
library.addBook(kitchenConfidential);

let odyssey = new Book("The Odyssey of Homer", "Homer, Richmond Lattimore", 390, true);
library.addBook(odyssey);

let programmersAtWork = new Book("Programmers at Work: Interviews With 19 Programmers Who Shaped the Computer Industry", "Susan Lammers", 391, true);
library.addBook(programmersAtWork);

let impossibleCreatures = new Book("Impossible Creatures Game Manual", "Relic Entertainment", 29, true);
library.addBook(impossibleCreatures);

const bookContainer = document.querySelector(".book-container");

function reloadBookContainer()
{
    while(bookContainer.lastChild) {
        bookContainer.removeChild(bookContainer.lastChild);
    }

    library.books.forEach(book => {
        addBookToContainer(book);
    });
}

function addBookToContainer(book) {
    const title = document.createElement("p");
    title.classList.add("book-title");
    title.textContent = book.title;
    title.dataset.id = book.id;
    bookContainer.appendChild(title);

    const author = document.createElement("p");
    author.textContent = book.author;
    author.dataset.id = book.id;
    bookContainer.appendChild(author);

    const page = document.createElement("p");
    page.textContent = book.page;
    page.dataset.id = book.id;
    bookContainer.appendChild(page);

    const read = document.createElement("p");
    read.classList.add("book-read");
    read.addEventListener("click", e => {
        book.read === true ? book.read = false : book.read = true;
        reloadBookContainer();
    });
    read.textContent = book.read === true ? "Read" : "Unread";
    read.dataset.id = book.id;
    bookContainer.appendChild(read);

    const deleteBook = document.createElement("p");
    deleteBook.dataset.id = book.id;
    deleteBook.textContent = "delete";
    deleteBook.classList.add("book-delete");
    deleteBook.addEventListener("click", e => {
        library.deleteBook(book);
        reloadBookContainer();
    });
    bookContainer.appendChild(deleteBook);
}

library.books.forEach(book => {
    addBookToContainer(book);
});

let addBookForm = document.getElementById("add-book-form");

addBookForm.addEventListener("submit", e => {
    e.preventDefault();
    
    const title = document.getElementsByName("title");
    const author = document.getElementsByName("author");
    const pages = document.getElementsByName("pages");
    const read = document.getElementsByName("read");
    
    let readResult = false;
    if(read[0].checked)
    {
        readResult = true;
    }
    else
    {
        readResult = false;
    }

    let book = new Book(title[0].value, author[0].value, pages[0].value, readResult);
    library.addBook(book);
    reloadBookContainer();
    addBookForm.reset();
    dialog.close();
});

const dialog = document.querySelector("dialog");
const closeModalButton = document.getElementById("close-modal");

closeModalButton.addEventListener("click", e => {
    dialog.close();
});
