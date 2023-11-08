const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get book code')
    res.end()
})

router.post('/', (req, res) => {
    res.send('Post book code')
    res.end()
})

router.get('/:id', (req, res) => {

})

router.put('/:id', (req, res) => {
    res.send('Put book code')
    res.end()
})

router.delete('/:id', (req, res) => {
    res.send('Delete book code')
    res.end()
})

module.exports = router

