const {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    updateBookByIdHandler,
    deleteBookByIdHandler,
  } = require("./handler");
  
  const routes = [
    {
      method: "POST",
      path: "/books",
      handler: addBookHandler,
    },
    {
      method: "GET",
      path: "/books",
      handler: getAllBooksHandler,
    },
    {
      method: "GET",
      path: "/books/{bookId}",
      handler: getBookByIdHandler,
    },
    {
      method: "PUT",
      path: "/books/{bookId}",
      handler: updateBookByIdHandler,
    },
    {
      method: "DELETE",
      path: "/books/{bookId}",
      handler: deleteBookByIdHandler,
    },
    {
      method: "*",
      path: "/{any*}",
      handler: () => "Page not found",
    },
  ];
  
  module.exports = routes;
  