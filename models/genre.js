var mongoose = require('mongoose');

//Genre Schema <-- just for the app

var genreSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now

    }


});

// next, down here to create a var genre and export it so the Genre can be accessed from outside.
var Genre = module.exports = mongoose.model('Genre', genreSchema);

// function here to get genres:


//dunno limit is what 9
module.exports.getGenres = function(callback,limit){
    Genre.find(callback).limit(limit);

}

//to add genre,
module.exports.addGenres = function(genre, callback){
    Genre.create(genre, callback);

}
//update means to take sth and change it
//
module.exports.updateGenre = function(id, genre, options, callback){
    var query = {_id: id};
    var update = {
        name: genre.name
    }
    //;?
    Genre.findOneAndUpdate(query, update, options, callback);

}

//delete genre
module.exports.removeGenre = function(id, callback){
    var query = {_id: id};
    Genre.remove(query, callback);

}