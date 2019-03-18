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
