const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
global.__basedir = __dirname;
var corsOptions = {origin: "*"};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.json({ message: "Welcome to the Bookstore API."});
    
});
// app.get("/books",(req, res)=>{
//     router.get('/books', book_controller.getAllBook);
// })

require("./app/routes/user.routes")(app);
require("./app/routes/file.routes")(app);
require("./app/routes/book.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Server is running on port " + PORT);
});