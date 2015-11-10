var express = require('express');
var app = express();

app.get('/notes', function(req, res){
	res.json(
		[
			{
				title: 'hardcoded title',
				body_html: 'this is the body'
			},
			{
				title: 'title 2',
				body_html: 'crap crap crap'
			}
		]
	);
});


app.listen(3000, function(){
	console.log('Listening on http://localhost:3000');
});