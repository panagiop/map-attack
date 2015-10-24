(function() {
    'use strict';

    angular.module('postApp.states', [
        'ui.router',
        'ngResource',
        'auth.service',
        //'postApp.controllers',
        'postApp.controllers.index',
        'postApp.controllers.add',
        'postApp.controllers.edit',
        'postApp.controllers.view',
        'postApp.controllers.delete',
        'Pagination.service',
        'ApiResource.service',
        'postApp.filters',
        'postApp.directives',
        'ngMap',
        'typeOfAttackFactory',
        'socketio.service',
        'backButtonDirective',
        'assignIconsOnMapFactory',
        'rzModule',
        'postsFactory'
    ]);

    angular.module('postApp.states')
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/posts/allposts');

            $stateProvider
                .state('posts', {
                    url: '/posts',
                    templateUrl: 'partials/posts/posts.html',
                    controller: 'PostsController as vm',
                    bindToController: true,
                    resolve: {
                        postsResolve: function(ApiResource) {
                            var postsData = ApiResource.resource('posts').get();
                            return postsData.$promise.then(function(data) {
                                return data.posts;
                            });
                        }
                    },
                    onEnter: ['$state', 'Auth', function($state, Auth){
                        if(!Auth.isLoggedIn()){
                            $state.go('login');
                        }
                    }]
                })
                .state('allposts', {
                    url: '/posts/allposts',
                    templateUrl: 'partials/posts/allposts.html',
                    controller: 'PostsController as vm',
                    bindToController: true,
                    resolve: {
                        postsResolve: function(ApiResource) {
                            var postsData = ApiResource.resource('posts/allposts').get();
                            return postsData.$promise.then(function(data) {
                                return data.posts;
                            });
                        }
                    }
                })
                .state('addpost', {
                    url: '/posts/add',
                    templateUrl: 'partials/posts/add-post.html',
                    controller: 'AddPostController as vm',
                    bindToController: true,
                    onEnter: ['$state', 'Auth', function($state, Auth){
                        if(!Auth.isLoggedIn()){
                            $state.go('login');
                        }
                    }]
                }).state('editpost', {
                    url: '/posts/:id/edit',
                    templateUrl: 'partials/posts/edit-post.html',
                    controller: 'EditPostController as vm',
                    bindToController: true,
                    onEnter: ['$state', 'Auth', function($state, Auth){
                        if(!Auth.isLoggedIn()){
                            $state.go('login');
                        }
                    }]
                }).state('viewpost', {
                    url: '/posts/:id',
                    templateUrl: 'partials/posts/view-post.html',
                    controller: 'ViewPostController as vm',
                    bindToController: true,
                    onEnter: ['$state', 'Auth', function($state, Auth){
                        if(!Auth.isLoggedIn()){
                            $state.go('login');
                        }
                    }]
                }).state('deletepost', {
                    url: '/posts/:id/delete',
                    templateUrl: 'partials/posts/delete-post.html',
                    controller: 'DeletePostController as vm',
                    bindToController: true,
                    onEnter: ['$state', 'Auth', function($state, Auth){
                        if(!Auth.isLoggedIn()){
                            $state.go('login');
                        }
                    }]
                });
        })
})();
