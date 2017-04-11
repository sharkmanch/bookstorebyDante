var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//initialize the body parser below.
app.use(bodyParser.json());
//here, after you created a genre.js in models, and exported it so you can access genre from outside, you take it to here
// genre<-- what you get,  require (' location' ?? i think so) and then at the bottom, you go get it (see app.get -sectAG)

Genre = require('./models/genre');
// so as book.
Book = require('./models/book');
//connect to mongoose now! ---> create new terminal and type: mongod.exe

mongoose.connect('mongodb://localhost/bookstore');

//then we need a database object so:
var db = mongoose.connection;

//set up the route for homepage - app.get is to handle request, to get request from url put in here. (post, put, delete)
// using get('/') which / stands for homepage, then it ll run a function, that uses req and res concept.

app.get('/', function(req, res){
    res.send('Please use /api/books or /api/genres');

});

//create another route for /api/genres or /api/books so when they get '/api/genres' being asked, the function res and req will run
//sectAG getting Genres from genre.js
app.get('/api/genres', function(req, res){
    Genre.getGenres(function(err, genres){
        if(err){
            throw err;
        }
        res.json(genres);
    });
});

// post  for addin genre
app.post('/api/genres', function(req, res){
    //body is body parser as it allows to access everything that comes in to the forum
    //resteasy is a chrome app for
    //insert url to resteasy, set header's content-type into application.json and edit on body, note: key needs to be quoted too
    var genre = req.body;
    Genre.addGenres(genre, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });
});
//update for genres
app.put('/api/genres/:_id', function(req, res){
//
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });
});
//delete genres
app.delete('/api/genres/:_id', function(req, res){
    var id = req.params._id;
   // we dont need -->  var genre = req.body; <-- because we are not adding anything, bodyparser is for resteasy's body so you can put stuff in.
    Genre.removeGenre(id, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });
});
//so as book.

app.get('/api/books', function(req, res){
    Book.getBooks(function(err, books){
        if(err){
            throw err;
        }
        res.json(books);
    });
});

//get a book by ID here:
//note: if you want to use _id,
app.get('/api/books/:_id', function(req, res){
    Book.getBookById(req.params._id, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

//posting, add books
app.post('/api/books', function(req, res){
//rmb rest easy is not safe.
    var book = req.body;
    Book.addBook(book, function(err, genre){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

//update book
app.put('/api/books/:_id', function(req, res){
//
    var id = req.params._id;
    var book = req.body;
    Book.updateBook(id, book, {}, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});
//delete book
app.delete('/api/books/:_id', function(req, res){
    var id = req.params._id;
    // we dont need -->  var book = req.body; <-- because we are not adding anything, bodyparser is for resteasy's body so you can put stuff in.
    Book.removeBook(id, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});
//before you can run the app, you need to tell the app where to listen.
app.listen(3000);

//console log aims to tell user that its working.
console.log('running on port please wait...');
