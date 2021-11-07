const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect("mongodb+srv://thomashuang02:admin@users.vdifr.mongodb.net/users?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Mongoose is connected.");
    }).catch(err => {
        console.log("Unable to connect to database:", err);
    });
};