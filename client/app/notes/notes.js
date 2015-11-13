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

	NotesController.$inject = ['$state', '$scope', 'NotesService', 'CurrentUser'];
	function NotesController($state, $scope, NotesService, CurrentUser) {
		if (!!(CurrentUser.get()._id)) {
			$scope.notes = NotesService.get();
		}
		else {
			$state.go('sign-in');
		}
	}

	NotesFormController.$inject = ['$state', '$scope', 'NotesService', 'CurrentUser'];
	function NotesFormController($state, $scope, NotesService, CurrentUser) {
		if (!!(CurrentUser.get()._id)) {
			$scope.note = NotesService.findById($state.params.noteId);

			$scope.save = function () {
				// Decide whether to call creat or update
				if ($scope.note._id) {
					NotesService.update($scope.note).then(function (response) {
						$scope.note = angular.copy(response.data.note);
					});
				}
				else {
					NotesService.create($scope.note).then(function (response) {
						$state.go('notes.form', { noteId: response.data.note._id });
					});
				}
			};

			$scope.delete = function () {
				NotesService.delete($scope.note).then(function (response) {
					$state.go('notes.form', { noteId: undefined })
				});
			}
		}
		else {
			$state.go('sign-in');
		}
	}


})();