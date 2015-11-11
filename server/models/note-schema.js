var db = require('../config/db');

var NoteSchema = db.Schema({
	title: String,
	body_html: String,
	body_text: String,
	updated_at: { type: Date, default: Date.now }
});

NoteSchema.pre('save', function(next){
	this.updated_at = Date.now();
	next();
});

module.exports = NoteSchema;
