const authJwt = require("../middleware/auth.jwt");
module.exports = (app)=>{
    const book_controller = require("../controller/book.controller");
    var router = require("express").Router();
    router.get('/books', book_controller.getAllBook);
    router.post('/addbook',book_controller.createBook);
    router.get('/bid',book_controller.getBookById);
    router.post('/:bid/:p1/:p2',authJwt,book_controller.deleteBook)
    app.use("/api", router);
    app.use("/api/auth", router);
};  