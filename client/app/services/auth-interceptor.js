angular.module('notely')
	.factory('AuthInterceptor', ['AuthToken', 'API_BASE',
		function (AuthToken, API_BASE) {
			return{
				request: function(config){
					var token = AuthToken.get();
					if(token && config.url.indexOf(API_BASE) > -1) {
						config.headers['Authorization'] = token;
					}
					return config;
				}	
			};
		}]);

angular.module('notely')
	.config(['$httpProvider', function ($httpProvider) {
		return $httpProvider.interceptors.push('AuthInterceptor');
	}]);