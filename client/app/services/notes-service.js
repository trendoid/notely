(function () {
	angular.module('notely')
		.service('NotesService', NotesService);

	NotesService.$inject = ['$http'];
	function NotesService($http) {
		var self = this;
		self.notes = [];

		self.fetch = function (callback) {
			$http.get('http://localhost:3000/notes')
				.then(
				// Success
				function (response) {
					self.notes = response.data;
					if(callback){
						callback(self.notes);
					}
				},
				// Failure
				function(response){
					// TODO: handle failure
					callback(response.statusText);
				});
		};
		
		self.get = function() {
			return self.notes;
		};
	}
	
})();
