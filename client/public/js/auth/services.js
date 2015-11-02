(function() {
    'use strict';
    angular.module('auth.service', ['httpAsPromise']);

    angular.module('auth.service')
        .factory('AuthInterceptor', [
            '$rootScope',
            '$q',
            '$window',
            function($rootScope, $q, $window) {
                return {
                    request: function(config) {
                        config.headers = config.headers || {};
                        if ($window.localStorage['user-login-token']) {
                            config.headers.Authorization = 'Bearer ' + $window.localStorage['user-login-token'];
                        }
                        return config;
                    },
                    response: function(response) {
                        // if (response.status === 401) { ... }
                        return response || $q.when(response);
                    }
                };
        }]);

    angular.module('auth.service')
        .factory('Auth', [
            '$http', 
            '$window', 
            '$q', 
            'httpAsPromise', 
            function($http, $window, $q, httpAsPromise) {
            var auth = {}; // Locally scoped object

            auth.saveToken = function(token) {
                $window.localStorage['user-login-token'] = token;
            };

            auth.getToken = function() {
                return $window.localStorage['user-login-token'];
            };

            auth.isLoggedIn = function() {
                var token = auth.getToken();
                if (token) {
                    var payload = JSON.parse($window.atob(token.split('.')[1]));
                    return payload.exp > Date.now() / 1000;
                } else {
                    return false;
                }
            };

            auth.currentUser = function() {
                if (auth.isLoggedIn()) {
                    var token = auth.getToken();
                    var payload = JSON.parse($window.atob(token.split('.')[1]));
                    return payload.username;
                }
            };

            auth.register = function(user) {
                return httpAsPromise.post('/auth/local/register', user).then(function(data) { 
                    return auth.saveToken(data.token);
                }); 
            };  

            auth.logIn = function(user) {
                return httpAsPromise.post('/auth/local/login/', user).then(function(data) { 
                    return auth.saveToken(data.token);
                }); 
            };

            auth.isLoggedInAsAdmin = function() {
                var username = auth.currentUser();
                if (username === 'admin') {
                    return true;
                }
                return false;
            };

            auth.logOut = function() {
                $window.localStorage.removeItem('user-login-token');
            };

            return auth;
        }]);

    angular.module('auth.service')
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        });
})();
