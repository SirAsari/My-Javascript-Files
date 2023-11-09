const express = require('express');
const router = express.Router();
const {
    getBooks,
    getBook,
    updateBook,
} = require('../controllers/BookController')

router.get('/', getBooks)

router.get('/:id', getBook)

router.post('/',)

router.put('/:id', updateBook)

router.delete('/:id', (req, res) => {
    res.send('Delete book code')
    res.end()
})

module.exports = router

