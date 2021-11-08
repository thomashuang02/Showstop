const express = require('express');

const router = express.Router();

const User = require('../models/User');

const commaSeparatedToArray = (str) => {
    return str.split(",").map(piece => piece.trim()).filter(piece => piece.length !== 0);
}

const formatEntry = (requestBody) => {
    return {
        ...requestBody,
        genres: commaSeparatedToArray(requestBody.genres),
        tags: commaSeparatedToArray(requestBody.tags),
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
        res.send(err);
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
                res.send(newEntry);
            });
        });
    } catch (err) {
        res.send(err);
    }
});

//finds entry based on id from current user's list, updates it
router.put("/:id", (req, res) => {
    try {
        const modifiedEntry = formatEntry(req.body);
        User.findOne({ '_id' : req.user._id }).then(user => {
            user.list.id(req.params.id) = modifiedEntry;
            user.save().then(() => {
                res.send(modifiedEntry);
            });
        });
    } catch (err) {
        res.send(err);
    }
});

router.delete("/:id", (req, res) => {
    try {
        User.findOne({ '_id' : req.user._id }).then(user => {
            user.list.pull({ _id: req.params._id });
            user.save();
        });
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;