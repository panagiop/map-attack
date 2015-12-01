(function() {
    'use strict';

    function DeletePostController($state, $stateParams, ApiResource) {
        var self = this;

        self.posts = ApiResource.resource('posts').get({
            id: $stateParams.id
        });

        self.deletePost = function() {
            if (confirm('Are you sure you want to delete this post?')) {
                self.posts.$delete({
                    id: $stateParams.id
                }, function() {
                    $state.go('posts');
                });
            } else {
                return;
            }
        };
    }

    DeletePostController.$inject = ['$state', '$stateParams', 'ApiResource'];

    angular.module('postApp.controllers.delete', [])
        .controller('DeletePostController', DeletePostController);
})();
