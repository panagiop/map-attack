(function() {
    'use strict';

    function AuthController($state, Auth) {
        var self = this;

        self.user = {};

        self.register = function() {
            Auth.register(self.user).then(function() {
                $state.go('posts');
            }, function(error) {
                self.error = 'username or email already exists';
            });
        };

        self.logIn = function() {
            Auth.logIn(self.user).then(function() {
                $state.go('posts');
            }, function(error) {
                if (Object.keys(self.user).length !== 2) {
                    self.error = 'username and password must be filled out';
                } else {
                    self.error = 'wrong username and password combination. try again';
                }
            });
        };
    }

    AuthController.$inject = ['$state', 'Auth'];

    angular.module('auth.controllers', [])
        .controller('AuthController', AuthController);
})();
