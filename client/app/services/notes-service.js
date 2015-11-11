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
			for(var i=0; i<self.notes.length; i++) {
        		if (self.notes[i]._id === noteId) {
					return self.notes[i];
				}
    		}
			return {};
		};
		
		self.save = function (note) {
			return $http.post('http://localhost:3000/notes', {
				note: note
				})
				.then(
					// Success
					function (response) {
						self.notes.unshift(response.data.note);
					},
					// Failure
					function (response) {
						// TODO: handle failure
					});
		};
	}

})();
