const express = require('express');
const app = express();

const path = require('path');
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

const morgan = require("morgan")
app.use(morgan("dev"))

//bringing in db
require( './db' );
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Entry = mongoose.model('Entry');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('hullo');
});

app.listen(3000);