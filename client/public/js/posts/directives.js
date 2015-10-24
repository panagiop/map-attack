(function() {
	'use strict';
	angular.module('postApp.directives', []).directive('validnonempty', function() {
		var INTEGER_REGEXP = /^\-?\d+$/;
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ctrl) {
				ctrl.$parsers.unshift(function(viewValue) {
					if (INTEGER_REGEXP.test(viewValue)) {
						ctrl.$setValidity('requiredInteger', true);
						return viewValue;
					} else {
						ctrl.$setValidity('requiredInteger', false);
						return undefined;
					}
				});
			}
		};
	});
})(); 
