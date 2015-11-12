angular.module('notely')
  .directive('signUp',['UsersService', (UsersService) => {
    class SignUpController {
      constructor() {
        this.user = {};
      }
      submit() {
        UsersService.create(this.user);
      }
    }

    return {
      scope: {},
      controller: SignUpController,
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: '/components/sign-up.html'
    };
  }]);
