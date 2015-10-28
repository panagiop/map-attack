(function() {
    'use strict';

    function Controller($location, Auth, typeOfAttackValues, httpAsPromise, assignIconsOnMapFactory) {
        var self = this;

        self.currentUser = Auth.currentUser();
        self.isLoggedIn = Auth.isLoggedIn(); 

        self.typeOfAttackValues = typeOfAttackValues;  

        var groupByTypeOfAttack = _.chain(self.posts).groupBy("type_of_attack").value();

        self.countPostsOfEachAttack = function(attack) {
            return attack === 'Show All' ? [self.posts] : [ groupByTypeOfAttack[attack] ];
        }; 

        self.addOrRemoveTypeOfAttackFilter = function(typeOfAttack) {
            // fetch posts (according to selected filter ... otherwise fetch them all) 
            // for a logged in user 
            if ($location.$$url === '/posts') {  
                if (typeOfAttack.name === 'Show All') {
                    httpAsPromise.fetch('/api/posts').then(function(data) { 
                        self.postsForMap = data.posts; 
                        assignIconsOnMapFactory.assignIconsOnMap(self.postsForMap);   
                    });
                } else {
                    httpAsPromise.fetch('/filter/auth/' + typeOfAttack.name).then(function(data) { 
                        self.postsForMap = data.posts;
                        assignIconsOnMapFactory.assignIconsOnMap(self.postsForMap);    
                    });
                }  
            } 

             // fetch posts (according to selected filter ... otherwise fetch them all) 
             // for a non-logged in user
            if ($location.$$url === '/posts/allposts' || self.currentUser === 'admin') {
                if (typeOfAttack.name === 'Show All') {
                    httpAsPromise.fetch('/api/posts/allposts').then(function(data) { 
                        self.postsForMap = data.posts; 
                        assignIconsOnMapFactory.assignIconsOnMap(self.postsForMap);   
                    });
                } else {
                    httpAsPromise.fetch('/filter/' + typeOfAttack.name).then(function(data) { 
                        self.postsForMap = data.posts;
                        assignIconsOnMapFactory.assignIconsOnMap(self.postsForMap);    
                    });
                }
            } 
        };
    }

    function directive() {
        return {
            restrict: 'E',
            templateUrl: 'js/common/directives/filters-sidebar/filters-sidebar.html',
            scope: {
                posts: '=',
                postsForMap: '='
            },
            controller: ['$location', 'Auth', 'typeOfAttackValues', 'httpAsPromise', 'assignIconsOnMapFactory', Controller],
            controllerAs: '_vm',
            bindToController: true
        };
    }

    angular.module('filters-sidebar', ['auth.service', 'typeOfAttackFactory', 'httpAsPromise', 'assignIconsOnMapFactory'])
        .directive('sidebarFiltersDirective', directive);
})(); 