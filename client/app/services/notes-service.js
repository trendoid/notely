(function () {
	angular.module('notely')
		.service('NotesService', NotesService);

	NotesService.$inject = ['$http'];
	function NotesService($http) {
		var self = this;
		self.notes = [];

		self.fetch = function () {
			return $http.get('http://localhost:3000/notes')
				.then(
					// Success
					function (response) {
						self.notes = response.data;
					},
					// Failure
					function (response) {
						// TODO: handle failure
					});
		};

		self.get = function () {
			// look thru self.notes and find by id
			return self.notes;
		};

		self.findById = function (noteId) {
			for (var i = 0; i < self.notes.length; i++) {
				if (self.notes[i]._id === noteId) {
					return angular.copy(self.notes[i]);
				}
			}
			return {};
		};

		self.create = function (note) {
			var noteCreatePromise = $http.post('http://localhost:3000/notes', {
				note: {
					title: note.title,
					body_html: note.body_html
				}
			});
			noteCreatePromise.then(
				// Success
				function (response, callback) {
					self.notes.unshift(response.data.note);
					if (callback) {
						callback(response);
					}
				},
				// Failure
				function (response) {
					// TODO: handle failure
				}
				);
			return noteCreatePromise;
		};

		self.update = function (note) {
			var noteUpdatePromise = $http.put('http://localhost:3000/notes/' + note._id, {
				note: {
					title: note.title,
					body_html: note.body_html
				}
			});
			noteUpdatePromise.then(
				// Success
				function (response) {
					self.replaceNote(response.data.note);
				},
				// Failure
				function (response) {
					// TODO: handle failure
				}
				);
			return noteUpdatePromise;
		};
		
		self.delete = function (note) {
			var noteDeletePromise = $http.delete('http://localhost:3000/notes/' + note._id);
			noteDeletePromise.then(
				// Success
				function (response, callback) {
					self.removeNote(response.data.id);
					if (callback) {
						callback(response);
					}
				},
				// Failure
				function (response) {
					// TODO: handle failure
				}
				);
			return noteDeletePromise;
		};

		self.replaceNote = function (note) {
			// find and replace
			for (var i = 0; i < self.notes.length; i++) {
				if (self.notes[i]._id === note._id) {
					self.notes[i] = note;
				}
			}
		};
		
		self.removeNote = function (id) {
			// find and replace
			for (var i = 0; i < self.notes.length; i++) {
				if (self.notes[i]._id === id) {
					self.notes.splice(i, 1);
				}
			}
		};
	}

})();
