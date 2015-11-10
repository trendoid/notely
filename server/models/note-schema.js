var db = require('../config/db');

var NoteSchema = db.Schema({
	title: String,
	body_Html: String,
	body_text: String,
	updated_at: { type: Date, default: Date.now }
});

module.exports = NoteSchema;
