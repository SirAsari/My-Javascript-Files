const express = require("express");
// const cors = require('cors');
const bookRoute = require("./routes/book");
const authorRoute = require("./routes/author");

const app = express();
const PORT = 3000;

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

app.get("/", (req, res) => {
  res.send("Hello World!");
  res.end();
});

app.use("/book", bookRoute);
app.use("/author", authorRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT} ...`);
});
