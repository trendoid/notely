angular.module('notely')
	.service('UsersService', ['$http', 'API_BASE', 'AuthToken', 'CurrentUser', ($http, API_BASE, AuthToken, CurrentUser) => {
		class UsersService {
			create(user) {
				let userPromise = $http.post(`${API_BASE}users`, {
					user: user
				});
				userPromise.then((success) => {
					AuthToken.clear();
					CurrentUser.clear();
					AuthToken.set(success.data.auth_token);
					CurrentUser.set(success.data.user);
				},
					(failure) => {
						AuthToken.set(undefined);
						CurrentUser.set(undefined);
					})
				return userPromise;
			}
		}
		return new UsersService();
	}]);