// import library nya
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
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  // buat placeholder
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
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: id,
        },
      })
      .code(201);
  } else {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku.",
      })
      .code(500);
  }  
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  let filteredBooks = itemsDB;

  // kalo gaada parameter query, tampilin semua buku
  if (!name && !reading && !finished) {
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
  }

  if (name) {
    const nameRegex = new RegExp(name, "gi");
    filteredBooks = filteredBooks.filter((book) => nameRegex.test(book.name));
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

//jangan lupa beresin
const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = itemsDB.filter((book) => book.id === bookId)[0]; 
  if (book) {
    const response = h
      .response({
        status: "success",
        data: {
          book,
        },
      })
      .code(200);
    return response;
  } else {
    const response = h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404);
    return response;
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
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
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
        message: "Buku berhasil diperbarui",
      })
      .code(200);
  } else {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
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
        message: "Buku berhasil dihapus",
      })
      .code(200);
  } else {
    return h
      .response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
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
