angular.module('notely')
  .service('CurrentUser', ['$window', ($window) => {

    class CurrentUser {
      constructor() {
        this.currentUser = JSON.parse(
          $window.localStorage.getItem('currentUser')
          );
      }
      set(user) {
        this.currentUser = user;
        $window.localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      }
      get() {
        return this.currentUser || {};
      }
      clear() {
        this.currentUser = undefined;
        $window.localStorage.removeItem('currentUser');
      }
    }
    return new CurrentUser();
  }]);