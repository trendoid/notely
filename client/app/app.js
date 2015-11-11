// IIFE
// Imidiately Invoked Function Expression

(function () {
  var app = angular.module('notely', [
    'ui.router',
    'notely.notes',
		'textAngular'
  ]);

  config.$inject = ['$urlRouterProvider'];
  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }

  app.config(config);
  
  app.constant('API_BASE', 'http://localhost:3000/')
})();
