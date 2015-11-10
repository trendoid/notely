var db = require('../config/db');
var NoteSchema = require('./note-schema')

var Note = db.model('Note', NoteSchema);

module.exports = Note;