(function() {
    'use strict';

    function ApiResource($resource) {
        return {
            resource: function(endpoint) { 
                return $resource('/api/' + endpoint + '/:id', {
                    id: '@_id'
                }, {
                    'update': {
                        method: 'PUT'
                    }
                });
            }
        };
    }

    ApiResource.$inject = ['$resource'];

    angular.module('ApiResource.service', [])
        .factory('ApiResource', ApiResource); 
})(); 