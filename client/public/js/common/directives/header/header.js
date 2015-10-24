(function() {
    'use strict';

    function Controller(Auth, $state, $window) {
        var self = this;

        self.currentUser = Auth.currentUser();
        self.isLoggedIn = Auth.isLoggedIn();

        self.logIn = function() { 
            $state.go('login');
        };

        self.logOut = function() {
            Auth.logOut(); 
            $state.go('login');
        };
    }

    function directive() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'js/common/directives/header/header.html',
            controller: ['Auth', '$state', '$window', Controller],
            controllerAs: 'vm',
            bindToController: true
        };
    }

    angular.module('header.directive', ['auth.service'])
		.directive('headerDirective', directive);
})();