const mongoose = require('mongoose');

// Media Entry Schema
const EntrySchema = new mongoose.Schema({
    title: {
        type: String,               //name of entry
        required: true
    },
    rating: Number,             //user rating from 0.0 to 10.0
    status: {
        type: String,             //Plan to Watch, Watching, Completed, On Hold, or Dropped
        required: true
    },
    episodesCompleted: Number,  //number of episodes user has watched
    episodesTotal: Number,      //total episodes for this media
    favorite: Boolean,
    type: String,               //type of media, e.g. film
    genres: [String],           //list of genres
    tags: [String],             //tags, such as release year, director, actors/actresses, etc
    notes: String,
    dateAdded: Date             //date this entry was added
});

// User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,   //e.g. movieaddict420
        required: true
    },
    password: {
        type: String,   //salt+hashed password using bcryptjs
        required: true
    },
    list: [EntrySchema] //list of media entries
});

module.exports = mongoose.model('User', UserSchema);