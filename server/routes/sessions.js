var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

router.post('/', function (req, res) {
	User.findOne({
		username: req.body.user.username
	}).then(function (user) {
		if (user) {
			user.authenticate(req.body.user.password, function (isMatch) {
				if (isMatch) {
					res.json({
						message: 'Welcome back!',
						user: user,
						auth_token: jwt.sign(user._id, process.env.JWT_SECRET, {
							expiresIn: 60 * 60 * 24
						})
					});
				}
				else {
					// Passwords don't match
					res.json({
						message: 'We were unable to log you in with those credentials.'
					});
				}
			});
		}
		else {
			// Couldn't find a user by that username.
			res.json({
				message: 'We were unable to log you in with those credentials.'
			});
		}
	});
});

module.exports = router;