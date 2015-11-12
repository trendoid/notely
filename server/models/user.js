var db = require('../config/db');
var UserSchema = require('./user-schema')

var User = db.model('User', UserSchema);

module.exports = User;