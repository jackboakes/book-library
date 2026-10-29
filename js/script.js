const library = [];

function Book(title, author, page, read) {
    if(!new.target) {
        throw Error("You muse use the 'new' operator to call the constructor.");
    }
    this._id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
}

function addBookToLibrary(title, author, page, read) {
    let book = new Book(title, author, page, read);
    library.push(book);
}

addBookToLibrary("Fear and Loathing in Las Vegas: A Savage Journey to the Heart of the American Dream", "Hunter S. Thompson", 204, true);
addBookToLibrary("Hell's Angels", "Hunter S. Thompson", 295, true);
addBookToLibrary("Ways of Seeing", "John Berger", 176, true);
addBookToLibrary("Kitchen Confidential", "Anthony Bourdain", 362, true);
addBookToLibrary("The Odyssey of Homer", "Homer, Richmond Lattimore", 390, true);
addBookToLibrary("Programmers at Work: Interviews With 19 Programmers Who Shaped the Computer Industry", "Susan Lammers", 391, true);

const bookContainer = document.querySelector(".book-container");

function addBookToContainer(book) {
    const title = document.createElement("p");
    title.classList.add("book-title");
    title.textContent = book.title;
    bookContainer.appendChild(title);

    const author = document.createElement("p");
    author.textContent = book.author;
    bookContainer.appendChild(author);

    const page = document.createElement("p");
    page.textContent = book.page;
    bookContainer.appendChild(page);

    const read = document.createElement("p");
    read.textContent = book.read;
    bookContainer.appendChild(read);
}

library.forEach(book => {
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

    const book = new Book(title[0].value, author[0].value, pages[0].value, readResult);
    addBookToLibrary(book);
    addBookToContainer(book);
});

const dialog = document.querySelector("dialog");
const closeModalButton = document.getElementById("close-modal");

closeModalButton.addEventListener("click", e => {
    dialog.close();
});
