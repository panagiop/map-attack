(function() {
    'use strict';

    function Controller(Auth, $state, $window, httpAsPromise) {
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

        self.pendingPostsLength = function() {
            httpAsPromise.fetch('/api/posts/messages/').then(function(data) {
                self.pendingPostsLength = data.posts.length;
            });
        };

        self.pendingPostsLength();
    }

    function directive() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'js/common/directives/header/header.html',
            controller: ['Auth', '$state', '$window', 'httpAsPromise', Controller],
            controllerAs: 'vm',
            bindToController: true
        };
    }

    angular.module('header.directive', ['auth.service'])
		.directive('headerDirective', directive);
})();