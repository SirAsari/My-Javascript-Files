const express = require('express');
const router = express.Router();
const {
    getAuthors,
    getAuthor,
    updateAuthor,
    deleteAuthor,
    createAuthor,
} = require('../controllers/AuthorController')

router.get('/', getAuthors)

router.get('/:id', getAuthor)

router.post('/', createAuthor);

router.put('/:id', updateAuthor)

router.delete('/:id', deleteAuthor);

module.exports = router

