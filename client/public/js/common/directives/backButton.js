(function() {
    'use strict';

    function directive() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    scope.$apply(function() {
                        history.back();
                    });
                });
            }
        }
    }

    angular.module('backButtonDirective', [])
        .directive('backButtonDirective', directive);
})();
