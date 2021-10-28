const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
    username: String,   //e.g. movieaddict420
    avatar: String,     //reference to image that user can upload
    bio: {              //optional bio
        type: String,
        default: "",
    },
    hash: String,       //hashed password
    salt: String,       //salt used for hashing passowrd
    list: [EntrySchema] //list of media entries
});

// Media Entry Schema
const EntrySchema = new mongoose.Schema({
    title: String,               //name of entry
    type: String,               //type of media, e.g. film
    genres: [String],           //list of genres
    status: String,             //Plan to Watch, Watching, Completed, On Hold, or Dropped
    rating: Number,             //user rating from 0.0 to 10.0
    episodesCompleted: Number,  //number of episodes user has watched
    episodesTotal: Number,      //total episodes for this media
    notes: {                    //any notes the user has about it
        type: String,
        default: "",
    },
    tags: [String],             //tags, such as release year, director, actors/actresses, etc
    dateAdded: Date             //date this entry was added
});

mongoose.model('User', UserSchema);
mongoose.model('Entry', EntrySchema);

mongoose.connect('mongodb://localhost/aitfinalproject');