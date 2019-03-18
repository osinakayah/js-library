OdinLibrary = (function () {

    const BOOK_STATUS = Object.freeze({
        UNREAD: '1',
        READ: '2',
        READING: '3',
    });

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
            return 'j'
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
      writeToLocalStorage(bookList)
      const tableBody = bookList.reduce(function (htmlBookRows, currentBook, currentBookIndex) {
          return `
              ${htmlBookRows}<tr class="${getBookRowContext(currentBook._readStatus)}">
                  <td>${currentBookIndex + 1}</td>
                  <td>${currentBook._author}</td>
                  <td>${currentBook._title}</td>
                  <td>${currentBook._numberOfPages} Pages</td>
                  <td data-book-index="${currentBookIndex}" class="bookReadStatus">${getBookReadStatus(currentBook._readStatus)}</td>
                  <td>
                      <button data-book-index="${currentBookIndex}" class="btn btn-danger deleteBook">Delete</button>
                  </td>
              </tr>
          `
      }, '');
      $('#book-list-body').html(tableBody);
    };

    return {
        loadCachedBooks: () => {
            const bookList = readFromLocalStorage();
            if (bookList) {
                render(bookList);
                return bookList;
            }
            return []
        },
        BOOK_STATUS: BOOK_STATUS
    }



})()
