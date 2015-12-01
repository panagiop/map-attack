(function() {
    'use strict';

    function directive() {
        return {
            require: 'ngModel',
            scope: {
                passwordModel: '='
            },
            link: function(scope, element, attrs, ngModel) {
                ngModel.$validators.compare = function(modelValue) {
                    return modelValue === scope.passwordModel;
                };

                scope.$watch("passwordModel", function() {
                    ngModel.$validate();
                });
            }
        }
    }

    angular.module('confirmPassword', [])
        .directive('confirmPassword', directive);
})();
