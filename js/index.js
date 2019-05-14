const OdinLibrary = (function () {

    const createTableRow = (index, book) => {

        if (document.getElementById(`book-id-${index}`)) {
            //To prevent duplicates
            return;
        }
        const bookRow = document.createElement('tr');
        bookRow.setAttribute('id', `book-id-${index}`);
        bookRow.className = getBookRowContext(book._readStatus);


        const pageIndexData = document.createElement('td');
        pageIndexData.innerText = index;
        bookRow.appendChild(pageIndexData);


        const authorData = document.createElement('td');
        authorData.innerText = book._author;
        bookRow.appendChild(authorData);

        const titleData = document.createElement('td');
        titleData.innerText = book._title;
        bookRow.appendChild(titleData);

        const numberOfPagesData = document.createElement('td');
        numberOfPagesData.innerText = book._numberOfPages;
        bookRow.appendChild(numberOfPagesData);

        const bookReadStatus = document.createElement('td');
        bookReadStatus.innerText = getBookReadStatus(book._readStatus);
        bookReadStatus.className = 'bookReadStatus';
        bookRow.appendChild(bookReadStatus);

        const deleteBookData = document.createElement('td');
        const buttonElement = document.createElement('button');
        buttonElement.className = "btn btn-danger deleteBook";
        buttonElement.innerText = 'Delete';
        buttonElement.setAttribute('data-book-index', index);
        deleteBookData.appendChild(buttonElement);
        bookRow.appendChild(deleteBookData);

        document.getElementById('book-list-body').appendChild(bookRow);
    }


    const BOOK_STATUS = Object.freeze({
        UNREAD: '1',
        READ: '2',
        READING: '3',
    });

    const isBookStausValid = (readStatus) => {
        for (let enumReadStatusKey in BOOK_STATUS) {

            if (readStatus === BOOK_STATUS[enumReadStatusKey]) {
                return true;
            }
        }
        return false;
    };

    const LOCAL_STORAGE_BOOK_LIST_KEY = 'bookList';

    const writeToLocalStorage = function (bookList) {
        localStorage.setItem(LOCAL_STORAGE_BOOK_LIST_KEY, JSON.stringify(bookList));
    }

    const readFromLocalStorage = function () {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_BOOK_LIST_KEY))
    }

    const getBookReadStatus = function (bookReadStatus) {
      switch (bookReadStatus.toString()) {
        case BOOK_STATUS.READ :
            return 'Read'
        case BOOK_STATUS.READING :
            return 'Reading'
        case BOOK_STATUS.UNREAD:
            return 'Unread'
        default:
            return 'Unread';
      }
    }

    const getBookRowContext = function (bookReadStatus) {
        switch (bookReadStatus.toString()) {
            case BOOK_STATUS.READ:
                return 'table-success'
            case BOOK_STATUS.READING:
                return 'table-warning'
            case BOOK_STATUS.UNREAD:
                return 'table-danger'
        }
    }

    const render = (bookList) => {
      writeToLocalStorage(bookList);
      bookList.forEach((book, index) => {
          createTableRow(index, book);
      });

    };
    const loadCachedBooks = () => {
        const bookList = readFromLocalStorage();
        if (bookList) {
            return bookList;
        }
        return []
    };
    const addBookToLibrary = (author, title, numberOfPages, readStatus, localBookList) => {

        if (isBookStausValid(readStatus)) {
            const book = new OdinLibrary.Book(author, title, numberOfPages, readStatus);
            const newBookList = localBookList.concat(book);
            render(newBookList);
            return newBookList
        }
        alert('Invalid Paramter as book read status')
        return localBookList;
    };
    const Book = function (author, title, numberOfPages, readStatus) {
        this._author = author;
        this._title = title;
        this._numberOfPages = numberOfPages;
        this._readStatus = readStatus;

        this.toogleBookReadStatus = function () {
            this._readStatus = parseInt(this._readStatus) + 1;
            if (this._readStatus > 3) {
                this._readStatus = 1
            }
        }
    };
    const removeBookFromLibrary = (bookList, bookIndex) => {
        const localBookList = [...bookList];
        console.log(localBookList, bookIndex);
        localBookList.splice(bookIndex, 1);
        writeToLocalStorage(localBookList);

        document.getElementById(`book-id-${bookIndex}`).remove();
        return localBookList;
    };
    return {
        loadCachedBooks,
        render,
        BOOK_STATUS,
        addBookToLibrary,
        Book,
        removeBookFromLibrary,
    }



})();

$(document).ready(function () {
    let bookList = OdinLibrary.loadCachedBooks();
    OdinLibrary.render(bookList);

    $('body').on('click', '.deleteBook', function (e) {
        e.stopImmediatePropagation();
        const bookIndex = $(this).attr('data-book-index');
        bookList = OdinLibrary.removeBookFromLibrary(OdinLibrary.loadCachedBooks(), bookIndex)
    });
    $('body').on('click', '.bookReadStatus', function (e) {
        e.stopImmediatePropagation();
        const bookIndex = $(this).attr('data-book-index');
        const book = bookList[bookIndex];
        book.toogleBookReadStatus();
        bookList.splice(bookIndex, 1, book);
        // OdinLibrary.render(bookList);
    });
    $('#buttonSaveBook').click(function (e) {
        const authorName = $('#inputBookAuthor').val();
        const title = $('#inputBookTitle').val();
        const numberOfPages = $('#inputBookNumberOfPages').val();
        const readStatus = $('#inputBookReadStatus').val();
        // bookList = OdinLibrary.addBookToLibrary(authorName, title, numberOfPages, readStatus, bookList)

    });

});
