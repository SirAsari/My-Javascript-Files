const express = require('express')
const app = express()

const port = 5000

app.get('/Wikrama', (req,res) => {
    res.write('Wikrama')
    res.end()
})

app.get('/About', (reqmres) => {
    res.write('About')
    res.end()
})

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`)
})