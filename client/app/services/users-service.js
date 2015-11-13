angular.module('notely')
	.service('UsersService', ['$http', 'API_BASE', 'AuthToken', 'CurrentUser', ($http, API_BASE, AuthToken, CurrentUser) => {
		class UsersService {
			create(user) {
				let userPromise = $http.post(`${API_BASE}users`, {
					user: user
				});
				userPromise.then((success) => {
					AuthToken.set(success.data.auth_token);
					CurrentUser.set(success.data.user);
				},
					(failure) => {

					})
				return userPromise;
			}

			signIn(user) {
				let sessionPromise = $http.post(`${API_BASE}sessions`, {
					user: user
				});
				sessionPromise.then(
					(success) => {
						AuthToken.set(success.data.auth_token);
						CurrentUser.set(success.data.user);
					},
					(failure) => {

					})
				return sessionPromise;
			}
		}
		return new UsersService();
	}]);