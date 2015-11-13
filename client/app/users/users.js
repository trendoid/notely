(function() {
  angular.module('notely')
  .config(usersConfig);

  usersConfig.$inject = ['$stateProvider'];
  function usersConfig ($stateProvider) {
    $stateProvider
      .state('sign-up', {
        url: '/sign-up',
        template: '<sign-up></sign-up>'
      })
      .state('sign-in', {
        url: '/sign-in',
        template: '<sign-in></sign-in>'
      });;
  };
})();