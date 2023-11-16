const mysql = require('mysql2')
const dbConfig = require('../config/database')
const pool = mysql.createPool(dbConfig)

const search = (req, res) => {
    const keyword = req.query.keyword

    const query = `SELECT * FROM books WHERE nama LIKE '${keyword}'`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err

            if(results.length == 0) {
                return res.json({
                    message: 'Data tidak ditemukan'
                })
            }

            responseSuccess(res, results, 'Book successfully fetched')
        })

        connection.release()
    })
}

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

const sortBy = (req, res) => {
    const orderBy = req.query.order

    const query = `SELECT * FROM books ORDER BY nama ${orderBy}`

    pool.getConnection((err, connection) => {
        if (err) throw err
    
        connection.query(query, (err, result) => {
            if(err) throw err

            if(result.length == 0) {
                responseNotFound(res)
                return
            }

            responseSuccess(res, result, 'Books successfully fetched')
        })

        connection.release()
    })
} 

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

        connection.release()
    })
}

const updateBook = (req, res) => {
    const id = req.params.id;
    const { nama, author, year, page_count, publisher } = req.body;

    const query = `UPDATE books SET nama = ?, author = ?, year = ?, page_count = ?, publisher = ? WHERE id = ?`;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, [nama, author, year, page_count, publisher, id], (err, result) => {
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

const deleteBook = (req, res) => {
    const id = req.params.id;

    const query = 'DELETE FROM books WHERE id = ?';

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, [id], (err, result) => {
            if (err) throw err;

            if (result.affectedRows > 0) {
                responseSuccess(res, null, 'Book successfully deleted');
            } else {
                responseNotFound(res, 'Book not found');
            }

            connection.release();
        });
    });
};

const createBook = (req, res) => {
    const { nama, author, year, page_count, publisher } = req.body;

    // Validate the request data as needed

    const query = 'INSERT INTO books (nama, author, year, page_count, publisher) VALUES (?, ?, ?, ?, ?)';

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, [nama, author, year, page_count, publisher], (err, result) => {
            if (err) throw err;

            const newBookId = result.insertId;

            // Fetch the newly created book
            const fetchQuery = 'SELECT * FROM books WHERE id = ?';
            connection.query(fetchQuery, [newBookId], (err, newBook) => {
                if (err) throw err;

                responseSuccess(res, newBook, 'Book successfully created');
            });

            connection.release();
        });
    });
};



module.exports = {
    getBooks,
    getBook,
    updateBook,
    deleteBook,
    createBook,
    search,
    sortBy,
}