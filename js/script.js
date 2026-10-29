const library = [];

function Book(title, author, page, read) {
    if(!new.target) {
        throw Error("You muse use the 'new' operator to call the constructor.");
    }
    this.id = crypto.randomUUID();
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

const bookContainer = document.querySelector(".book-container");

library.forEach(book => {
    const title = document.createElement("p");
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
});
