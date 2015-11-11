// IIFE
// Imidiately Invoked Function Expression

(function () {
  var app = angular.module('notely', [
    'ui.router',
    'notely.notes'
  ]);

  config.$inject = ['$urlRouterProvider'];
  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }

  app.config(config);
})();
