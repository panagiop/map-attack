'use strict';

angular.module('postApp.filters', [])
    .filter('offset', function() {
        return function(input, start) {
            return input.slice(start);
        }
    })
    .filter('startFrom', function() {
        return function(input, start) {
            if (input === undefined) {
                return input;
            } else {
                start = parseInt(start);
                return input.slice(start);
            }
        };
    })
    .filter('range', function() {
        return function(input, total) {
            total = parseInt(total);
            for (var i = 0; i < total; i++) {
                input.push(i);
            }
            return input;
        };
    });
