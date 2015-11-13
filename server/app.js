/* global process */
require('dotenv').load();
var express = require('express');
var app = express();
var Note = require('./models/note');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(require('./middleware/headers'));
app.use(require('./middleware/add-user-to-request'));

app.use('/api/v1/notes', require('./routes/notes'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/sessions', require('./routes/sessions'));


app.listen(3000, function () {
	console.log(process.env.DB_URI);
	console.log('Listening on http://localhost:3000');
});