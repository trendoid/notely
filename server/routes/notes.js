var router = require('express').Router();
var Note = require('../models/note');


// List all notes
router.get('/', function (req, res) {
	Note.find({ user: req.user }).sort({ updated_at: -1 }).then(function (notes) {
		res.json(notes);
	});
});

// Create a note
router.post('/', function (req, res) {
	var note = new Note({
		title: req.body.note.title,
		body_html: req.body.note.body_html,
		user: req.user
	});
	note.save().then(function (noteData) {
		res.json({
			message: 'Successfully saved note.',
			note: noteData
		});
	});
});

// Update a note
router.put('/:id', function (req, res) {
	Note.findOne({ _id: req.params.id, user: req.user }).then(
		function (note) {
			note.title = req.body.note.title;
			note.body_html = req.body.note.body_html;
			note.save().then(function () {

				res.json({
					message: 'Successfully saved note.',
					note: note
				});
			});
		});
});

// Update a note
router.delete('/:id', function (req, res) {
	Note.findOne({ _id: req.params.id, user: req.user }).then(
		function (note) {
			note.remove().then(function () {
				res.json({
					message: 'Successfully deleted note: ' + note.title,
					note: note
				});
			});
		});
});

module.exports = router;