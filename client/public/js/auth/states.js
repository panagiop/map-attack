(function() {
    'use strict';

    angular.module('auth.states', [
        'ui.router',
        'auth.service',
        'auth.controllers',
        'confirmPassword'
    ]);

    angular.module('auth.states')
        .config(function($stateProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'partials/auth/login.html',
                    controller: 'AuthController as vm',
                    bindToController: true
                }).state('register', {
                    url: '/register',
                    templateUrl: 'partials/auth/register.html',
                    controller: 'AuthController as vm',
                    bindToController: true
                })
        })
})();
