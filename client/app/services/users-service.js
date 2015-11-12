angular.module('notely')
	.service('UsersService', ['$http', 'API_BASE', ($http, API_BASE) => {
		class UsersService {
			create(user) {
				let userPromise = $http.post(`${API_BASE}users`, {
					user: user
				});
				userPromise.then((success) => {
					console.log(success.data.user);
				},
				(failure) => {
					console.log(failure.data);
				})
				return userPromise;
			}
		}
		return new UsersService();
	}]);