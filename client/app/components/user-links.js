angular.module('notely')
  .directive('userLinks', () => {
    class UserLinksController {

      constructor(CurrentUser) {
        console.log(CurrentUser);
        this.CurrentUser = CurrentUser;
      }
      user() {
        return this.CurrentUser.get();
      }
      signedIn() {
        return !!(this.user()._id);
      }
    }
    UserLinksController.$inject = ['CurrentUser'];

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