(function() {
    'use strict';

    angular.module('App', [
        'postApp.states',
        'auth.states',
        'header.directive',
        'filters-sidebar',
        'httpAsPromise'
    ]);
})();
