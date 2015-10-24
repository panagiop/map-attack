(function() {
	'use strict';

	function ViewPostController($stateParams, ApiResource, typeOfAttackValues) {
        var self = this; 
        self.typeOfAttackValues = typeOfAttackValues;
        self.typeOfAttackValues =  _.pluck(self.typeOfAttackValues, 'name').splice(0, 4);

        ApiResource.resource('posts').get({
            id: $stateParams.id
        }, function(data, headers) {
            self.posts = data.posts;
        }, function(errResponse) {
            if (errResponse.status === 404) {
                console.log("something went wrong fetching this post");
            }
        });
    }

    ViewPostController.$inject = ['$stateParams', 'ApiResource', 'typeOfAttackValues'];

    angular.module('postApp.controllers.view', [])
        .controller('ViewPostController', ViewPostController)
})();