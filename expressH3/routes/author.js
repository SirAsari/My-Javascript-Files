const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get Author code')
    res.end()
})

router.post('/', (req, res) => {
    res.send('Post Author code')
    res.end()
})

router.put('/', (req, res) => {
    res.send('Put Author Kode')
    res.end()
})

router.delete('/', (req, res) => {
    res.send('Delete Author Kode')
    res.end()
})

module.exports = router

