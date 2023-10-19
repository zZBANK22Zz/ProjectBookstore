const Book = require("../models/book.model");
  
  //Create & Save a new Book
    const createBook = (req, res) => {
    //Validate request
    if(!req.body.author || !req.body.title){
        res.status(400).send({ message: "Book Title & Author can not be empty."});
    }
    //Create a Book 
    const bookObj = new Book({
        booksid : req.body.booksid,
        title : req.body.title,
        author : req.body.author,
        price : req.body.price,
        descrip : req.body.descrip,
        review : req.body.review,
        quantity: req.body.quantity,
        img: req.body.img
    });
  };
  // Retrive and return all book from DB
    const getAllBook = (req, res)=>{
    Book.getAllBook((err, data)=>{
    if(err){
        res.status(500).send({message: err.message || "Some error ocurred."});
    }else res.send(data);
});
    };

    //Find one Book from DB
    const getBookById = (req, res) => {
        Book.findById(req.params.bookId).then(book =>{
            if(!book){
                return res.status(404).send({
                    message: "Book not dound with id"+req.params.bookId
                });
            }
            res.send(book);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Book not found with id " + req.params.bookId
                });                
            }
            return res.status(500).json({
                message: "Error retrieving book with id " + req.params.bookId
            });
        });
    };

  const deleteBook = (req, res) => {
    Book.findByIdAndRemove(req.params.bookId)
    .then(book => {
        if(!book) {
            return res.status(404).json({
                message: "Book not found with id " + req.params.bookId
            });
        }
        res.status(202).json({message: "Book deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });                
        }
        return res.status(500).json({
            message: "Could not delete book with id " + req.params.bookId
        });
    });
};
    
  module.exports = {
    createBook,
    getAllBook,
    getBookById,
    deleteBook,
  };