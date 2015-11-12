angular.module('notely')
  .service('AuthToken', ['$window', ($window) => {

    class AuthToken {
      constructor() {
        this.authToken = $window.localStorage.getItem('authToken');
      }
      set(token) {
        this.authToken = token;
        $window.localStorage.setItem('authToken', this.authToken);
      }
      get() {
        return this.authToken;
      }
      clear() {
        this.authToken = undefined;
        $window.localStorage.removeItem('authToken');
      }
    }
    return new AuthToken();
  }]);