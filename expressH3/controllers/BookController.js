const mysql = require('mysql2')
const dbConfig = require('./config/database.js')
const pool = mysql.createPool(dbConfig)

const {
    responseNotFound,
    responseSuccess
} = require('../helper/helper')

const getBooks = (req, res) => {
    const query = "SELECT * FROM books";

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err

            responseSuccess(res, results, 'Books successfully fetched');
        })

        connection.release()
})}

module.exports = {
    getBooks
}