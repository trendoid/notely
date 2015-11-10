(function () {
	angular.module('notely.notes', [
		'ui.router'
	])
		.config(notesConfig);

	notesConfig.$inject = ['$stateProvider'];
	function notesConfig($stateProvider) {
		$stateProvider

			.state('notes', {
				url: '/notes',
				templateUrl: '/notes/notes.html',
				controller: NotesController
			})
			.state('notes.form', {
				url: '/:noteId',
				templateUrl: '/notes/notes-form.html'
			});
	}

	NotesController.$inject = ['$state', '$scope', 'NotesService'];
	function NotesController($state, $scope, NotesService) {
		$scope.note = {};

		$scope.save = function () {		
			NotesService.save($scope.note);

		};

		NotesService.fetch().then(function () {
			$scope.notes = NotesService.get();
		});
		$state.go('notes.form');
	}
})();