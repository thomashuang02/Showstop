const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../models/User');

/* ----------------------------- authentication ----------------------------- */
const authenticate = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send(false);
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.send(true);
            });
        }
    })(req, res, next);
}

/* ---------------------- authentication route handlers --------------------- */
router.post("/login", (req, res, next) => {
    authenticate(req, res, next);
});
router.post("/register", (req, res, next) => {
    User.findOne({username: req.body.username}, async (err, user) => {
        if (err) throw err;
        if (user) {
            res.send(false);
        }
        else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
                list: []
            });
            await newUser.save();
            authenticate(req, res, next);
        }
    });
});
router.get("/user", (req, res) => {
    res.send(req.user);
});
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

module.exports = router;