/* global process */
require('dotenv').load();
var express = require('express');
var app = express();
var Note = require('./models/note');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

// Allow CORS and additional headers
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	next();
});

app.use('/notes', require('./routes/notes'));


app.listen(3000, function () {
	console.log(process.env.DB_URI);
	console.log('Listening on http://localhost:3000');
});