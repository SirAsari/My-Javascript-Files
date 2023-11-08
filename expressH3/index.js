const express = require("express");
// const cors = require('cors');
const express = require("mysql2");
const bookRoute = require("./routes/book");
const authorRoute = require("./routes/author");
const dbConfig = require("./config/database");
const pool = mysql.createPool(dbConfig)

pool.on('error', (err) => {
    console.log(err);
})

const app = express();
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// Enable CORS for all routes
// app.use(cors());
// app.use(
//     cors({
//       origin: 'http://example.com', // Allow requests from this specific origin
//       methods: 'GET,POST', // Allow only these HTTP methods
//     })
//   );

// membuat parameter
app.get('/controllerparameter/:username/:jurusan/:rombel', (req, res) => {
    res.json(req.params)
})

app.get("/contohparams", (req,res) => {
    res.json(req.query);
})

app.get("/", (req, res) => {
  res.send("Hello World!");
  res.end();
});

app.use("/book", bookRoute);
app.use("/author", authorRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT} ...`);
});
