var db = require('mongoose');

db.connect('mongodb://mongo:mongo123@ds039880.mongolab.com:39880/notelydb')

module.exports = db;