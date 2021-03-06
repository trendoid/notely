angular.module('notely')
  .directive('userLinks', () => {
    class UserLinksController {

      constructor($state, AuthToken, CurrentUser) {
        this.$state = $state;
        this.CurrentUser = CurrentUser;
        this.AuthToken = AuthToken;
      }
      user() {
        return this.CurrentUser.get();
      }
      signedIn() {
        return !!(this.user()._id);
      }
      logout() {
        this.CurrentUser.clear();
        this.AuthToken.clear();
        this.$state.go('sign-in');
      }
    }
    UserLinksController.$inject = ['$state','AuthToken', 'CurrentUser'];

    return {
      scope: {},
      controller: UserLinksController,
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: '/components/user-links.html'
      // template: `
      //   <div class="user-links">
      //     <div ng-show="ctrl.signedIn()">
      //       Signed in as {{ ctrl.user.name }} | <a href="#">logout</a>
      //     </div>
      //   </div>
      // `
    };
  });