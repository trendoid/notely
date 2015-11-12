// IIFE
// Imidiately Invoked Function Expression

'use strict';

(function () {
  var app = angular.module('notely', ['ui.router', 'notely.notes', 'textAngular']);

  config.$inject = ['$urlRouterProvider'];
  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }

  app.config(config);

  app.constant('API_BASE', 'http://localhost:3000/api/v1/');
})();
'use strict';

(function () {
	angular.module('notely').service('NotesService', NotesService);

	NotesService.$inject = ['$http', 'API_BASE'];
	function NotesService($http, API_BASE) {
		var self = this;
		self.notes = [];

		self.fetch = function () {
			return $http.get(API_BASE + 'notes').then(
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
			for (var i = 0; i < self.notes.length; i++) {
				if (self.notes[i]._id === noteId) {
					return angular.copy(self.notes[i]);
				}
			}
			return {};
		};

		self.create = function (note) {
			var noteCreatePromise = $http.post(API_BASE + 'notes', {
				note: {
					title: note.title,
					body_html: note.body_html
				}
			});
			noteCreatePromise.then(
			// Success
			function (response, callback) {
				self.notes.unshift(response.data.note);
				if (callback) {
					callback(response);
				}
			},
			// Failure
			function (response) {
				// TODO: handle failure
			});
			return noteCreatePromise;
		};

		self.update = function (note) {
			var noteUpdatePromise = $http.put(API_BASE + 'notes/' + note._id, {
				note: {
					title: note.title,
					body_html: note.body_html
				}
			});
			noteUpdatePromise.then(
			// Success
			function (response) {
				self.replaceNote(response.data.note);
			},
			// Failure
			function (response) {
				// TODO: handle failure
			});
			return noteUpdatePromise;
		};

		self['delete'] = function (note) {
			var noteDeletePromise = $http['delete'](API_BASE + 'notes/' + note._id);
			noteDeletePromise.then(
			// Success
			function (response, callback) {
				self.removeNote(response.data.note);
				if (callback) {
					callback(response);
				}
			},
			// Failure
			function (response) {
				// TODO: handle failure
			});
			return noteDeletePromise;
		};

		self.replaceNote = function (note) {
			// find and replace
			for (var i = 0; i < self.notes.length; i++) {
				if (self.notes[i]._id === note._id) {
					self.notes[i] = note;
				}
			}
		};

		self.removeNote = function (note) {
			// find and replace
			for (var i = 0; i < self.notes.length; i++) {
				if (self.notes[i]._id === note._id) {
					self.notes.splice(i, 1);
					break;
				}
			}
		};
	}
})();
'use strict';

(function () {

	angular.module('notely.notes', ['ui.router']).config(notesConfig);

	notesConfig.$inject = ['$stateProvider'];
	function notesConfig($stateProvider) {
		$stateProvider.state('notes', {
			url: '/notes',
			resolve: {
				notesLoaded: ['NotesService', function (NotesService) {
					return NotesService.fetch();
				}]
			},
			templateUrl: '/notes/notes.html',
			controller: NotesController
		}).state('notes.form', {
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
			// Decide whether to call creat or update
			if ($scope.note._id) {
				NotesService.update($scope.note).then(function (response) {
					$scope.note = angular.copy(response.data.note);
				});
			} else {
				NotesService.create($scope.note).then(function (response) {
					$state.go('notes.form', { noteId: response.data.note._id });
				});
			}
		};

		$scope['delete'] = function () {
			NotesService['delete']($scope.note).then(function (response) {
				$state.go('notes.form', { noteId: undefined });
			});
		};
	}
})();
'use strict';

angular.module('notely').directive('signUp', function () {
  return {
    templateUrl: '/users/sign-up.html'
  };
});
'use strict';

(function () {
  angular.module('notely').config(usersConfig);

  usersConfig.$inject = ['$stateProvider'];
  function usersConfig($stateProvider) {
    $stateProvider.state('sign-up', {
      url: '/sign-up',
      template: '<sign-up></sign-up>'
    });
  };
})();
//# sourceMappingURL=bundle.js.map
