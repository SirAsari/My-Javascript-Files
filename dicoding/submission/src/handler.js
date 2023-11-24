const { nanoid } = require("nanoid");
const itemsDB = require("./items");

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    return h
      .response({
        status: "fail",
        message: "Failed to add book. Please provide a book name.",
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message: "Failed to add book. 'Read Page' cannot exceed 'Page Count'.",
      })
      .code(400);
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  itemsDB.push(newBook);

  const isSuccess = itemsDB.some((book) => book.id === id);

  if (isSuccess) {
    return h
      .response({
        status: "success",
        message: "Book added successfully.",
        data: {
          bookId: id,
        },
      })
      .code(201);
  } else {
    return h
      .response({
        status: "fail",
        message: "Failed to add the book.",
      })
      .code(500);
  }
};

const getAllBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query;
    let filteredBooks = itemsDB;
  
    if (name) {
      const nameRegex = new RegExp(name, "gi");
      filteredBooks = itemsDB.filter((book) => nameRegex.test(book.name));
    }
  
    if (reading !== undefined) {
      filteredBooks = filteredBooks.filter(
        (book) => Number(book.reading) === Number(reading)
      );
    }
  
    if (finished !== undefined) {
      filteredBooks = filteredBooks.filter(
        (book) => Number(book.finished) === Number(finished)
      );
    }
  
    if (filteredBooks.length === 0) {
      return h
        .response({
          status: "success",
          message: "Request successful, no matching books found.",
          data: {
            books: [],
          },
        })
        .code(200);
    }
  
    const response = h.response({
      status: "success",
      data: {
        books: filteredBooks.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
  
    return response.code(200);
  };
  

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = itemsDB.find((book) => book.id === bookId);

  if (book) {
    return h
      .response({
        status: "success",
        data: {
          book,
        },
      })
      .code(200);
  } else {
    return h
      .response({
        status: "fail",
        message: "Book not found.",
      })
      .code(404);
  }
};

const updateBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    return h
      .response({
        status: "fail",
        message: "Failed to update book. Please provide a book name.",
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message: "Failed to update book. 'Read Page' cannot exceed 'Page Count'.",
      })
      .code(400);
  }

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  const bookIndex = itemsDB.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    itemsDB[bookIndex] = {
      ...itemsDB[bookIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    return h
      .response({
        status: "success",
        message: "Book updated successfully.",
      })
      .code(200);
  } else {
    return h
      .response({
        status: "fail",
        message: "Failed to update book. Book ID not found.",
      })
      .code(404);
  }
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const bookIndex = itemsDB.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    itemsDB.splice(bookIndex, 1);

    return h
      .response({
        status: "success",
        message: "Book deleted successfully.",
      })
      .code(200);
  } else {
    return h
      .response({
        status: "fail",
        message: "Failed to delete book. Book ID not found.",
      })
      .code(404);
  }
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
