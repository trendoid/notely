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
				templateUrl: '/notes/notes-form.html',
				controller: NotesController
			});
	}
	
	NotesController.$inject = ['$scope', '$state'];
	function NotesController($scope, $state){
		$state.go('notes.form');
	}
})();