const express = require('express');

const router = express.Router();

const User = require('../models/User');

const commaSeparatedToArray = (str) => {
    return str.split(",").map(piece => piece.trim()).filter(piece => piece.length !== 0);
}

const formatEntry = (entry) => {
    return {
        ...entry,
        genres: commaSeparatedToArray(entry.genres),
        tags: commaSeparatedToArray(entry.tags),
        dateAdded: Date.now()
    }
}

//finds current user, returns user's list
router.get("/", (req, res) => {
    try {
        User.findOne({ '_id' : req.user._id }).then(user => {
            res.send(user.list);
        });
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

//formats new entry, finds current user, pushes entry to its list, returns user's newly modified list
router.post("/", (req, res) => {
    try {
        //keeping other form data the same,
        //parse genres/tags into arrays and record dateAdded
        const newEntry = formatEntry(req.body);
        User.findOne({ '_id' : req.user._id }).then(user => {
            user.list.push(newEntry);
            user.save().then(() => {
                res.send(user.list);
            });
        });
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

//finds entry based on id from current user's list, updates it
router.put("/:id", (req, res) => {
    try {
        const modifiedEntry = formatEntry(req.body);
        User.findOneAndUpdate(
            { '_id' : req.user._id, "list._id" : req.params.id },
            {
                "$set": {
                    "list.$": modifiedEntry
                }
            }, 
            {new: true},
            (err, user) => {
                if(err) {
                    console.log(err);
                    res.redirect("/");
                }
                res.send(user.list);
            }
        );
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

router.delete("/:id", (req, res) => {
    try {
        User.findOneAndUpdate(
            { '_id' : req.user._id },
            {
                "$pull": {
                    list : { _id : req.params.id }
                }
            }, 
            {new: true},
            (err, user) => {
                if(err) {
                    console.log(err);
                    res.redirect("/");
                }
                res.send(user.list);
            }
        );
    } catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

module.exports = { router: router, commaSeparatedToArray, formatEntry };