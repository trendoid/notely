(function() {
  var app = angular.module('notely', [
    'ui.router'
  ]);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes');

    $stateProvider

      .state('notes', {
        url: '/notes',
        template: '<h1>Notely</h1><p>{{ message }}</p>',
        controller: function($scope) {
          $scope.message = "Welcome to Notely!";
        }
      });
  }

  config['$inject'] = ['$stateProvider', '$urlRouterProvider'];
  app.config(config);
})();
