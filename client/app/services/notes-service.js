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
			return self.notes;
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
