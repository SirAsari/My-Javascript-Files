const mysql = require('mysql2')
const dbConfig = require('../config/database')
const pool = mysql.createPool(dbConfig)

const {
    responseNotFound,
    responseSuccess
} = require('../traits/ApiResponse')

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

const getBook = (req, res) => {
    const id = req.params.id;

    const query = `SELECT * FROM books WHERE id = ${id}`;

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(query, {id}, (err, results) => {
            if (err) throw err

            if (results.length > 0) {
                responseSuccess(res, results, 'Book successfully fetched')
            } else {
                responseNotFound(res, 'Book not found')
                return
            }
        })
// test
        connection.release()
    })
}

const updateBook = (req, res) => {
    const id = req.params.id;
    const { title, author, genre, year } = req.body;

    const query = 'UPDATE books SET title = ?, author = ?, genre = ?, year = ? WHERE id = ?';

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, [title, author, genre, year, id], (err, result) => {
            if (err) throw err;

            if (result.affectedRows > 0) {
                responseSuccess(res, null, 'Book successfully updated');
            } else {
                responseNotFound(res, 'Book not found');
            }

            connection.release();
        });
    });
};

module.exports = {
    getBooks,
    getBook,
    updateBook,
}