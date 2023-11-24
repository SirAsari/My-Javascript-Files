const { nanoid } = require("nanoid");
const items = require("./items");
const addItemHandler = (request, h) => {
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
    const response = h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
    return response;
  }
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newItem = {
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
  items.push(newItem);
  const isSuccess = items.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: id,
        },
      })
      .code(201);
    return response;
  }
  const response = h
    .response({
      status: "fail",
      message: "Buku gagal ditambahkan",
    })
    .code(500);
  return response;
};
const getAllItemsHandler = (request, h) => {
  const { name, reading, finished } = request.query; // Terdapat query name
  if (name) {
    const filteredBooksName = items.filter((book) => {
      const nameRegex = new RegExp(name, "gi");
      return nameRegex.test(book.name);
    });
    const response = h
      .response({
        status: "success",
        data: {
          books: filteredBooksName.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      })
      .code(200);
    return response;
  } // Terdapat query reading
  if (reading) {
    const filteredBooksReading = items.filter(
      (book) => Number(book.reading) === Number(reading)
    );
    const response = h
      .response({
        status: "success",
        data: {
          book: filteredBooksReading.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      })
      .code(200);
    return response;
  } // Terdapat query finished
  if (finished) {
    const filteredBooksFinished = items.filter(
      (book) => Number(book.finished) === Number(finished)
    );
    const response = h
      .response({
        status: "success",
        data: {
          books: filteredBooksFinished.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      })
      .code(200);
    return response;
  } // Tidak terdapat query apapun
  const response = h
    .response({
      status: "success",
      data: {
        books: items.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    })
    .code(200);
  return response;
};
const getItemByIdHandler = (request, h) => {};
const editItemByIdHandler = (request, h) => {};
const deleteItemByIdHandler = (request, h) => {};
module.exports = {
  addItemHandler,
  getAllItemsHandler,
  getItemByIdHandler,
  editItemByIdHandler,
  deleteItemByIdHandler,
};
