// routes.js
const {
  addItemHandler,
  getAllItemsHandler,
  getItemByIdHandler,
  editItemByIdHandler,
  deleteItemByIdHandler,
} = require("./handler");
const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addItemHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllItemsHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getItemByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editItemByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteItemByIdHandler,
  },
  {
    method: "*",
    path: "/{any*}",
    handler: () => "Halaman tidak ditemukan",
  },
];
module.exports = routes;
