var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

// Create a user
router.post('/', function (req, res) {
	var user = new User({
		name: req.body.user.name,
		username: req.body.user.username,
		password_digest: bcrypt.hashSync(req.body.user.password)
	});

	user.save().then(function (userData) {
		res.json({
			message: 'THanks for signing up!',
			user: userData,
			auth_token: jwt.sign(userData._id, process.env.JWT_SECRET, {
				expiresIn: 60*60*24
			})
		});
	});
});

module.exports = router;