var mongoose = require('mongoose');

//Book Schema <-- just for the app

var bookSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    author:{
        type: String
    },
    publisher:{
        type: String
    },
    pages:{
        type: String
    },
    image_url:{
        type: String
    },
    buy_url:{
        type: String
    },

    create_date:{
        type: Date,
        default: Date.now

    }


});

// next, down here to create a var book and export it so the Book can be accessed from outside.
var Book = module.exports = mongoose.model('Book', bookSchema);

// function here to get books:


//dunno limit is what 9
module.exports.getBooks = function(callback,limit){
    Book.find(callback).limit(limit);

}

//to get book by id
module.exports.getBookById = function(id, callback){
    Book.findById(id, callback);

}

//posting, add book here
module.exports.addBook = function(book, callback){
    Book.create(book, callback);

}

//update book

module.exports.updateBook = function(id, book, options, callback){
    var query = {_id: id};
    var update = {
        title: book.title,
        genre: book.genre,
        description: book.description,
        author: book.author,
        publisher: book.publisher,
        pages: book.pages,
        image_url: book.image_url,
        buy_url: book.buy_url

    }
    //;?
    Book.findOneAndUpdate(query, update, options, callback);

}
//delete books
module.exports.removeBook = function(id, callback){
    var query = {_id: id};
    Book.remove(query, callback);

}