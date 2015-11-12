var router = require('express').Router();
var User = require('../models/user');

// Create a user
router.post('/', function (req, res) {
	console.log(req.body);
	var user = new User({
		name: req.body.user.name,
		username: req.body.user.username//,
		//password: req.body.user.password
	});

	user.save().then(function (userData) {
		console.log(userData);
		res.json({
			message: 'THanks for signing up!',
			user: userData
		});
	});
});

module.exports = router;