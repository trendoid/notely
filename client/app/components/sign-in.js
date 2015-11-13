angular.module('notely')
	.directive('signIn', ['$state', 'UsersService', ($state, UsersService) => {
		class SignInController {
			constructor() {
				this.user = {};
			}
			login() {
				UsersService.signIn(this.user).then(function (response) {
					$state.go('notes.form', { nodeId: undefined });
				});
			}
			signUp() {
				$state.go('sign-up');
			}

		}

		return {
			scope: {},
			controller: SignInController,
			controllerAs: 'ctrl',
			bindToController: true,
			templateUrl: '/components/sign-in.html'
		};
	}]);
