/* global ObjectIdType */
var sanitizeHtml = require('sanitize-html');
var htmlToText = require('html-to-text');
var db = require('../config/db');

var NoteSchema = db.Schema({
	title: { type: String}, //, required: true },
	body_html: { type: String}, //, required: true },
	body_text: String,
	user: { type: db.Schema.Types.ObjectId, ref: 'User'},
	updated_at: { type: Date, default: Date.now }
});

NoteSchema.pre('save', function (next) {
	this.body_html = sanitizeHtml(this.body_html);
	this.body_text = htmlToText.fromString(this.body_html);
	this.updated_at = Date.now();
	next();
});

NoteSchema.methods.toJSON = function (){
	var object = this.toObject();
	delete object.__v;
	return object;
}

module.exports = NoteSchema;
