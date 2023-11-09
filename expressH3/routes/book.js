const express = require('express');
const router = express.Router();
const {
    getBooks,
    getBook,
    updateBook,
    deleteBook,
    createBook,
} = require('../controllers/BookController')

router.get('/', getBooks)

router.get('/:id', getBook)

router.post('/', createBook);

router.put('/:id', updateBook)

router.delete('/:id', deleteBook);

module.exports = router

