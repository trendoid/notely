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
					notesLoaded: ['$state', '$q', '$timeout', 'NotesService', 'CurrentUser',
						function ($state, $q, $timeout, NotesService, CurrentUser) {
							let deferred = $q.defer();
							$timeout(function () {
								if (CurrentUser.isSignedIn()) {
									NotesService.fetch().then(
										function () {
											deferred.resolve();
										},
										function () {
											deferred.reject();
											$state.go('sign-in');
										}
										);
								}
								else {
									deferred.reject();
									$state.go('sign-in');
								}
							});
							return deferred.promise;
						}
					]
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

		$scope.notes = NotesService.get();

	}

	NotesFormController.$inject = ['$state', '$scope', 'NotesService', 'CurrentUser'];
	function NotesFormController($state, $scope, NotesService, CurrentUser) {

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


})();