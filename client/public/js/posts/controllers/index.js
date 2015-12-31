(function() {
    'use strict';

    function PostsController($scope, $rootScope, $location, postsResolve, Pagination, Auth, socketio, httpAsPromise, assignIconsOnMapFactory, HelpersFactory) {
        var self = this;

        self.currentUser = Auth.currentUser();
        self.isLoggedIn = Auth.isLoggedIn();
        self.isLoggedInAsAdmin = Auth.isLoggedInAsAdmin();

        self.pagination = Pagination;
        self.posts = postsResolve;
        self.postsForMap = _.clone(self.posts);
        self.pagination.numOfPages = Math.ceil(self.posts.length / self.pagination.getResultsPerPage());
        self.postsSortedByDate = _.sortBy(self.posts, "date");

        assignIconsOnMapFactory.assignIconsOnMap(self.postsForMap);

        self.helpers = new HelpersFactory.HelpersFactory($rootScope);

        self.noResultsFound = false;

        self.dateSlider = {};

        if (self.posts.length) {
            self.latestDateISOFormat = new Date(self.postsSortedByDate[self.postsSortedByDate.length - 1].date);
            // convert ISO date to timestamp in order to ve compatible with the slider
            self.dateSlider.latestDateTimestamp = Date.parse(self.latestDateISOFormat);

            self.earliestDateISOFormat = new Date(self.postsSortedByDate[0].date);

            self.dateSlider.earliestDateTimestamp = Date.parse(self.earliestDateISOFormat);

            self.dateSlider.max = self.dateSlider.latestDateTimestamp + 1000;
            self.dateSlider.min = self.dateSlider.earliestDateTimestamp;
            self.dateSlider.floor = self.dateSlider.min;
            self.dateSlider.ceil = self.dateSlider.max;
        }

        self.onSliderChange = function() {
            var dateFrom = new Date(self.dateSlider.min).toISOString();
            var dateTo = new Date(self.dateSlider.max).toISOString();

            if (self.isLoggedIn && $location.$$url === '/posts') {
                httpAsPromise.fetch('/api/posts/auth/queryByDate/' + dateFrom + '/' + dateTo).then(function(data) {
                    self.postsForMap = data.data;
                    assignIconsOnMapFactory.assignIconsOnMap(self.postsForMap);
                });
            }

            if ($location.$$url === '/posts/allposts' || self.isLoggedInAsAdmin) {
                httpAsPromise.fetch('/api/posts/queryByDate/' + dateFrom + '/' + dateTo).then(function(data) {
                    self.postsForMap = data.data;
                    assignIconsOnMapFactory.assignIconsOnMap(self.postsForMap);
                });
            }
        };

        self.clearFiltersUI = function() {
            self.helpers.clearFilters(function() {
                self.makeAdvancedSearch(self.helpers.searchTitle, self.helpers.searchText, self.helpers.searchTypeOfAttack);
            });
        };

        self.makeAdvancedSearch = function(title, text, type_of_attack) {
            var query = "";

            var queryParams = {
                title: title ? title : '',
                text: text ? text : '',
                type_of_attack: type_of_attack ? type_of_attack : '',
            };

            for (var i in queryParams) {
                if (queryParams.hasOwnProperty(i) && queryParams[i] !== '') {
                    query += i + '=' + queryParams[i] + '&';
                }
            }

            httpAsPromise.fetch('/api/posts/advancedSearch/?' + query).then(function(data) {
                if (!Object.keys(data.data).length) {
                    self.posts = [{}];
                    self.noResultsFound = true;
                    return self.posts;
                }
                self.posts = data.data;
                self.noResultsFound = false;

                return self.posts;
            });

            $scope.$watch(angular.bind(self, function() {
                return self.posts;
            }), function(newVal) {
                self.pagination.numOfPages = Math.ceil(newVal.length / self.pagination.getResultsPerPage());
            })
        };

        function populatePostChangeOnAdd(collection, item) {
            var oldItem = _.find(collection, {
                _id: item._id
            });
            var index = collection.indexOf(oldItem);

            // replace oldItem if exists
            // otherwise just add it to the collection
            if (oldItem) {
                collection.splice(index, 1, item);
            } else {
                collection.push(item);
            }
        }

        function populatePostChangeOnDelete(collection, item) {
            _.remove(collection, {
                _id: item._id
            });
        }

        socketio.on('posts:save', function(item) {
            populatePostChangeOnAdd(self.posts, item);
            // populatePostChangeOnAdd(self.postsForMap, item);
        });

        socketio.on('posts:remove', function(item) {
            populatePostChangeOnDelete(self.posts, item);
            // populatePostChangeOnDelete(self.postsForMap, item);
        });
    }

    PostsController.$inject = ['$scope', '$rootScope', '$location', 'postsResolve', 'Pagination', 'Auth', 'socketio', 'httpAsPromise', 'assignIconsOnMapFactory', 'HelpersFactory'];

    angular.module('postApp.controllers.index', [])
        .controller('PostsController', PostsController)
})();
