(function () {
	angular.module('notely.notes', [
		'ui.router'
	])
	.config(notesConfig);

	notesConfig['$inject'] = ['$stateProvider'];
	function notesConfig($stateProvider) {
		$stateProvider

			.state('notes', {
				url: '/notes',
				template: '<h1>Notely</h1><p>{{ message }}</p>',
				controller: NotesController
			});
	}
	
	NotesController['$inject'] = ['$scope'];
	function NotesController($scope){
		$scope.message = "I <3 Angular.";
	}
})();