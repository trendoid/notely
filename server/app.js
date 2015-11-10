var express = require('express');
var app = express();

app.get('/notes', function(req, res){
	res.send('I <3 Express!');
});


app.listen(3000, function(){
	console.log('Listening on http://localhost:3000');
});