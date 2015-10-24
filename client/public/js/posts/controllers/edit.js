(function() {
	'use strict';

	function EditPostController($state, $stateParams, ApiResource, typeOfAttackValues) {
        var self = this; 
        self.typeOfAttackValues = typeOfAttackValues;
        self.typeOfAttackValues =  _.pluck(self.typeOfAttackValues, 'name').splice(0, 4);

        self.posts = ApiResource.resource('posts').get({
            id: $stateParams.id
        });  

        self.updatePost = function() {
            ApiResource.resource('posts').update(self.posts.posts, function() {
                $state.go('posts');
            });
        };
    }

    EditPostController.$inject = ['$state', '$stateParams', 'ApiResource', 'typeOfAttackValues'];

    angular.module('postApp.controllers.edit', [])
        .controller('EditPostController', EditPostController)
})();