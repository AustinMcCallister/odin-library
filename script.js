const myLibrary = [];

class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }
}

function addBookToLibrary(title, author, pages, readStatus) {
  const obj = new Book(title, author, pages, readStatus);
  myLibrary.push(obj);
}

function drawTable() {
  const bookList = document.querySelector('.booklist');
  myLibrary.forEach((book, index) => {
    const row = bookList.insertRow();
    Object.keys(book).forEach(element => {
      const cell = row.insertCell();
      if (typeof book[element] !== 'boolean') {
        cell.innerHTML = book[element];
      }
      else {
        if (book[element]) {
          cell.appendChild(drawCheckIcon(index));
          cell.classList.add('true-button');
        }
        else {
          cell.appendChild(drawXIcon(index));
          cell.classList.add('false-button');
        }
      }
    });
    const cell = row.insertCell();
    cell.appendChild(drawDeleteIcon(index));
    cell.classList.add('delete-button');
  });
}

function deleteTable() {
  const bookList = document.querySelector('.booklist');
  const rows = bookList.querySelectorAll('tr');
  rows.forEach(row => {
    if (!row.classList.contains('table-header')) {
      row.remove();
    }
  });
}

function drawCheckIcon(rowID) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svg.setAttribute('viewBox', '0 0 24 24');
  path.setAttribute('fill', '#A3BE8C');
  path.setAttribute('d', 'M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z');
  svg.appendChild(path);
  svg.addEventListener('click', () => {
    myLibrary[rowID].readStatus = false;
    deleteTable();
    drawTable();
  });
  return svg;
}

function drawXIcon(rowID) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svg.setAttribute('viewBox', '0 0 24 24');
  path.setAttribute('fill', '#BF616A');
  path.setAttribute('d', 'M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z');
  svg.appendChild(path);
  svg.addEventListener('click', () => {
    myLibrary[rowID].readStatus = true;
    deleteTable();
    drawTable();
  });
  return svg;
}

function drawDeleteIcon(rowID) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svg.setAttribute('viewBox', '0 0 24 24');
  path.setAttribute('fill', 'currentColor');
  path.setAttribute('d', 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z');
  svg.appendChild(path);
  svg.addEventListener('click', () => {
    myLibrary.splice(rowID, 1);
    deleteTable();
    drawTable();
  });
  return svg;
}

const addButton = document.querySelector('.addbutton');
addButton.addEventListener('click', () => {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');
  const readStatus = document.getElementById('readStatus');
  if (title.value.length > 0 && author.value.length > 0 && /^[0-9]+$/.test(pages.value)) {
    addBookToLibrary(title.value, author.value, pages.value, readStatus.checked);
    deleteTable();
    drawTable();
    title.value = '';
    author.value = '';
    pages.value = '';
    readStatus.checked = false;
  }
});

addBookToLibrary('よつばと！（１）', 'あずまきよひこ', 224, true);
addBookToLibrary('ふらいんぐうぃっち（１）', '石塚千尋', 163, false);

drawTable();