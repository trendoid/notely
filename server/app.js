var express = require('express');
var app = express();
var Note = require('./models/note');

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

// List all notes
app.get('/notes', function (req, res) {
	Note.find().then(function(notes){
		res.json(notes);
	});
});


app.listen(3000, function () {
	console.log('Listening on http://localhost:3000');
});