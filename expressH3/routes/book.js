const express = require('express');
const router = express.Router();
const {
    getBooks
} = require('../controllers/BookController')

router.get('/', getBooks)

router.post('/',)

router.put('/:id', (req, res) => {
    res.send('Put book code')
    res.end()
})

router.delete('/:id', (req, res) => {
    res.send('Delete book code')
    res.end()
})

module.exports = router

