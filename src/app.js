/* ----------------------------- initial imports ---------------------------- */
const express = require('express');
const path = require('path');
const morgan = require("morgan");
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const mongoose = require('mongoose');

const app = express();

/* ------------------------------- middleware ------------------------------- */
app.use(morgan("dev"))
const buildPath = path.join(__dirname, '../front-end/build');
app.use(express.static(buildPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000", //location of react app we're connecting to
    credentials: true,
}));
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
}));
app.use(cookieParser("secret"));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

/* ------------------------- connecting to database ------------------------- */
const schemae = require('./db');
const User = schemae.User;
const Entry = schemae.Entry;
mongoose.connect("mongodb+srv://thomashuang02:admin@users.vdifr.mongodb.net/users?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Mongoose is connected.");
});

/* ----------------------------- authentication ----------------------------- */
const authenticate = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send(false);
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.send(true);
                console.log(req.user);
            });
        }
    })(req, res, next);
}

/* ----------------------------- route handlers ----------------------------- */
app.post("/login", (req, res, next) => {
    authenticate(req, res, next);
});
app.post("/register", (req, res, next) => {
    User.findOne({username: req.body.username}, async (err, user) => {
        if (err) throw err;
        if (user) {
            res.send("User Already Exists");
        }
        else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
            });
            await newUser.save();
            authenticate(req, res, next);
        }
    });
});
app.get("/user", (req, res) => {
    res.send(req.user);
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './front-end/build/index.html'));
});
/* --------------------------- end route handlers --------------------------- */

//start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`)
});