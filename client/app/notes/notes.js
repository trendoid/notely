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
	
	NotesController.$inject = ['$state', '$scope', 'NotesService'];
	function NotesController($state, $scope, NotesService){
		NotesService.fetch(function(){
			$scope.notes = NotesService.get();
		});
		$state.go('notes.form');
	}
})();