const mongoose = require("mongoose");
require('dotenv').config()

module.exports = () => {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@users.vdifr.mongodb.net/users?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Mongoose is connected.");
    }).catch(err => {
        console.log("Unable to connect to database:", err);
    });
};