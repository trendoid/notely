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
			var notesPromise = $http.post('http://localhost:3000/notes', {
				note: note
			});
			notesPromise.then(
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
				});
			return notesPromise;
		};

		self.update = function (note) {
			return $http.put('http://localhost:3000/notes', {
				note: note
			})
				.then(
					// Success
					function (response) {
						// find and replace with response
						var replaceIndex = self.notes.length + 1;
						for (var i = 0; i < self.notes.length; i++) {
							if (self.notes[i]._id === response.data.note._id) {
								replaceIndex = i;
							}
						}
						self.notes.splice(replaceIndex, 1, response.data.note);
					},
					// Failure
					function (response) {
						// TODO: handle failure
					});
		};
	}

})();
