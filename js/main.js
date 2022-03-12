const containerEl = document.querySelector(".cards-container");

const bookTitle = document.querySelector(".bookTitle");
const bookAuthor = document.querySelector(".bookAuthor");
const bookDesc = document.querySelector(".bookDesc");
const bookPages = document.querySelector(".bookPages");
const readStatus = document.getElementById("isRead-add");
const addBtn = document.getElementById("add-book");

let removeBtns = document.querySelectorAll(".removeBook");
let readSwitches = document.querySelectorAll(".isRead");

let myBooks = [];


function bookObject(title, author, description, pages, isRead) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.pages = pages;
    this.isRead = isRead;
}

bookObject.prototype.toggleRead = function() {
    if (!this.isRead) {
        this.isRead = true;
    } else {
        this.isRead = false;
    }
}

addBtn.addEventListener("click", function() {
    if (bookTitle.value.length === 0 || bookAuthor.value.length === 0 || bookDesc.value.length === 0 || bookPages.value.length === 0) {
        alert("Make sure all fields are entered correctly!");
    } else {
        const book = new bookObject(bookTitle.value, bookAuthor.value, bookDesc.value, bookPages.value, readStatus.checked);
        myBooks.push(book);

        
        containerEl.innerHTML += `

        <div class="card" id="card${myBooks.length - 1}">
        <div class="book-info">
            <h4>${myBooks[myBooks.length - 1].title}</h4>
            <h5>By: ${myBooks[myBooks.length - 1].author}</h5>
        </div>
        <p>${myBooks[myBooks.length - 1].description}</p>
        <span class="pages">${myBooks[myBooks.length - 1].pages} Pages</span>
        <hr class="divider">
        <div class="toggle">
            <span class="isRead">Did you read it?</span>
            <label class="switch">
                <input type="checkbox" class="isRead" name="${myBooks.length - 1}" ${checkedStatus()}>
                <span class="slider round"></span>
              </label>
        </div>
        <button type="button" class="removeBook" name="${myBooks.length - 1}">Remove</button>
    </div>

        `
        
        bookTitle.value = "";
        bookAuthor.value = "";
        bookDesc.value = "";
        bookPages.value = "";
        readStatus.checked = false;
    }
    readSwitches = document.querySelectorAll(".isRead");
    readLoop();
    removeBtns = document.querySelectorAll(".removeBook");
    removeLoop();
});

function removeLoop() {
    for (let i = 0; i < removeBtns.length; i++) {
        removeBtns[i].addEventListener("click", function() {
            myBooks.pop([removeBtns[i].name]);
            const card = document.getElementById(`card${removeBtns[i].name}`);
            card.remove();
        });
    };
}


function readLoop() {
    for (let i = 0; i < readSwitches.length; i++) {
        readSwitches[i].addEventListener("click", function() {
            myBooks[readSwitches[i].name].toggleRead();
        });
    };
}

function checkedStatus() {
    if (!myBooks[myBooks.length - 1].isRead) {
        return "";
    } else {
        return "checked";
    }
};