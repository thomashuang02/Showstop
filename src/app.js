/* ----------------------------- initial imports ---------------------------- */
const express = require('express');
const path = require('path');
const morgan = require("morgan");
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const connection = require("./dbConnection");
const session = require('express-session');

/* ------------------------------- express app ------------------------------ */
const app = express();

/* ------------------------------- middleware ------------------------------- */
//app.use(morgan("dev"));
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
connection();

/* -------------------------- authentication routes ------------------------- */
const authenticationRouter = require('./routes/authenticationRoutes').router;
app.use("/api", authenticationRouter);

/* --------------------------- list action routes --------------------------- */
const listRouter = require('./routes/listRoutes').router;
app.use("/api/list", listRouter);

/* ------------------------ default: send index.html ------------------------ */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
});

//start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`)
});

module.exports = app;