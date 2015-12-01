(function() {
    'use strict';

    function httpAsPromise($q, $http) {
        return {
            fetch: function(endpoint) {
                var deferred = $q.defer();
                $http.get(endpoint)
                    .success(function(data) {
                        deferred.resolve(data);
                    }).error(function() {
                        deferred.reject();
                    });
                return deferred.promise;
            },
            post: function(endpoint, obj) {
                var deferred = $q.defer();
                $http.post(endpoint, obj)
                    .success(function(data) {
                        deferred.resolve(data);
                    }).error(function() {
                        deferred.reject();
                    });
                return deferred.promise;
            },
            put: function(endpoint, obj) {
                var deferred = $q.defer();
                $http.put(endpoint, obj)
                    .success(function(data) {
                        deferred.resolve(data);
                    }).error(function() {
                        deferred.reject();
                    });
                return deferred.promise;
            }
        }
    }

    httpAsPromise.$inject = ['$q', '$http'];

    angular.module('httpAsPromise', [])
        .factory('httpAsPromise', httpAsPromise);
})();
