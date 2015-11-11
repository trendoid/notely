var sanitizeHtml = require('sanitize-html');
var htmlToText = require('html-to-text');
var db = require('../config/db');

var NoteSchema = db.Schema({
	title: String,
	body_html: String,
	body_text: String,
	updated_at: { type: Date, default: Date.now }
});

NoteSchema.pre('save', function(next){
	this.body_html = sanitizeHtml(this.body_html);
	this.body_text = htmlToText.fromString(this.body_html);
	this.updated_at = Date.now();
	next();
});

module.exports = NoteSchema;
