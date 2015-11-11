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
				resolve: {
					notesLoaded: ['NotesService', function (NotesService) {
						return NotesService.fetch();
					}]
				},
				templateUrl: '/notes/notes.html',
				controller: NotesController
			})
			.state('notes.form', {
				url: '/:noteId',
				templateUrl: '/notes/notes-form.html',
				controller: NotesFormController
			});
	}

	NotesController.$inject = ['$state', '$scope', 'NotesService'];
	function NotesController($state, $scope, NotesService) {
		$scope.notes = NotesService.get();
	}

	NotesFormController.$inject = ['$state', '$scope', 'NotesService'];
	function NotesFormController($state, $scope, NotesService) {

		$scope.note = NotesService.findById($state.params.noteId);

		$scope.save = function () {
			NotesService.save($scope.note);
		};
	}

})();