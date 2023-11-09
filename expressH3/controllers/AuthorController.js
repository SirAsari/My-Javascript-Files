const mysql = require('mysql2')
const dbConfig = require('../config/database')
const pool = mysql.createPool(dbConfig)

const {
    responseNotFound,
    responseSuccess
} = require('../traits/ApiResponse')

const getAuthors = (req, res) => {
    const query = "SELECT * FROM Authors";

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err

            responseSuccess(res, results, 'Authors successfully fetched');
        })

        connection.release()
})}

const getAuthor = (req, res) => {
    const id = req.params.id;

    const query = `SELECT * FROM Authors WHERE id = ${id}`;

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(query, {id}, (err, results) => {
            if (err) throw err

            if (results.length > 0) {
                responseSuccess(res, results, 'Author successfully fetched')
            } else {
                responseNotFound(res, 'Author not found')
                return
            }
        })

        connection.release()
    })
}

const updateAuthor = (req, res) => {
    const id = req.params.id;
    const { name, year, publisher, city, editor } = req.body;

    const query = `UPDATE Authors SET name = ?, year = ?, publisher = ?, city = ?, editor = ? WHERE id = ?`;

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, [name, year, publisher, city, editor, id], (err, result) => {
            if (err) throw err;

            if (result.affectedRows > 0) {
                responseSuccess(res, null, 'Author successfully updated');
            } else {
                responseNotFound(res, 'Author not found');
            }

            connection.release();
        });
    });
};

const deleteAuthor = (req, res) => {
    const id = req.params.id;

    const query = 'DELETE FROM Authors WHERE id = ?';

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, [id], (err, result) => {
            if (err) throw err;

            if (result.affectedRows > 0) {
                responseSuccess(res, null, 'Author successfully deleted');
            } else {
                responseNotFound(res, 'Author not found');
            }

            connection.release();
        });
    });
};

const createAuthor = (req, res) => {
    const { name, year, publisher, city, editor } = req.body;

    // Validate the request data as needed

    const query = 'INSERT INTO Authors (name, year, publisher, city, editor) VALUES (?, ?, ?, ?, ?)';

    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, [name, year, publisher, city, editor], (err, result) => {
            if (err) throw err;

            const newAuthorId = result.insertId;

            // Fetch the newly created Author
            const fetchQuery = 'SELECT * FROM Authors WHERE id = ?';
            connection.query(fetchQuery, [newAuthorId], (err, newAuthor) => {
                if (err) throw err;

                responseSuccess(res, newAuthor, 'Author successfully created');
            });

            connection.release();
        });
    });
};



module.exports = {
    getAuthors,
    getAuthor,
    updateAuthor,
    deleteAuthor,
    createAuthor,
}