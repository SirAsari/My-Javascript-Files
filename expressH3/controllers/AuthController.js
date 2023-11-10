const dbConfig = require("../config/database");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const pool = mysql.createPool(dbConfig);
const {
  responseFailValidate,
  responseAuthSuccess,
} = require("../traits/ApiResponse");

pool.on("error", (err) => {
  console.error(err);
});

// test

const accessTokenSecret = "12209150";

const register = (req, res) => {
  const data = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };

  pool.getConnection((err, connection) => {
    if (err) throw err;
  });

  if (data.email == null || data.username == null || data.password == null) {
    responseFailValidate(
      res,
      "Email, Username, dan Password tidak boleh kosong"
    );
  } else {
    const query = "INSERT INTO users SET ?";

    const query2 = `SELECT * 
    FROM users WHERE email='${data.email}' OR
    username='${data.username}'`;

    pool.getConnection(async (err, connection) => {
      if (err) throw err;

      var checkUnique = new Promise((resolve) => {
        connection.query(query2, (err, results) => {
          if (err) throw err;

          if (results.length > 0) {
            res.status(403).json({
              message: "Email/Username sudah digunakan",
            });
          } else {
            resolve();
          }
        });
      });

      await checkUnique.then(() => {
        connection.query(query, [data], (err, results) => {
          if (err) throw err;
          if (results.affectedRows >= 1) {
            const token = jwt.sign(
              {
                email: data.email,
                username: data.username,
              },
              accessTokenSecret
            );

            responseAuthSuccess(res, token, "Register succesfully", {
              email: data.email,
              username: data.username,
            });

            return;
          } else {
            res.status(500).json({
              message: "Failed creating user",
            });
          }
        });
      });

      connection.release();
    });
  }
};

module.exports = {
  register,
};
