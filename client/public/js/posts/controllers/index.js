(function() {
    'use strict';

    function PostsController($scope, $location, postsResolve, Pagination, Auth, socketio, httpAsPromise, assignIconsOnMapFactory) {
        var self = this;
        var infowindow, center;
        //var map;

        $scope.$on('mapInitialized', function (event, map) {
            $scope.objMap = map;
        });

        self.currentUser = Auth.currentUser();
        self.isLoggedIn = Auth.isLoggedIn();
        self.isLoggedInAsAdmin = Auth.isLoggedInAsAdmin();

        self.pagination = Pagination;
        self.posts = postsResolve;
        self.postsForMap = _.clone(self.posts);
        self.pagination.numOfPages = Math.ceil(self.posts.length / self.pagination.getResultsPerPage());
        self.postsSortedByDate = _.sortBy(self.posts, "date");

        assignIconsOnMapFactory.assignIconsOnMap(self.postsForMap);

        self.searchTitleActive = false;
        self.searchTextActive = false;
        self.searchTypeOfAttackRegExp = false;

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

        // translate date (timestamp) to ISO and then in dd-mm-yy format
        self.translate = function(value) {
            var a = new Date(value).toISOString();
            return new Date(a).getDate() + '-' + parseInt(new Date(a).getMonth() + 1) + '-' + new Date(a).getFullYear();
        };

        self.onSliderChange = function() {
            var dateFrom = new Date(self.dateSlider.min).toISOString();
            var dateTo = new Date(self.dateSlider.max).toISOString();

            if (self.isLoggedIn && $location.$$url === '/posts') {
	            httpAsPromise.fetch('/api/posts/auth/queryByDate/' + dateFrom + '/' + dateTo).then(function(data) {
	                self.postsForMap = data.data;
	                assignIconsOnMapFactory.assignIconsOnMap(self.postsForMap);
	            });
	        }

	        if($location.$$url === '/posts/allposts' || self.isLoggedInAsAdmin) {
	        	httpAsPromise.fetch('/api/posts/queryByDate/' + dateFrom + '/' + dateTo).then(function(data) {
	                self.postsForMap = data.data;
	                assignIconsOnMapFactory.assignIconsOnMap(self.postsForMap);
	            });
	        }
        };

        self.showInfoWindowOnMouseClick = function (event, p) {
            infowindow = new google.maps.InfoWindow();
            center = new google.maps.LatLng(p.loc[0],p.loc[1]);

            infowindow.setContent(
                '<p>' + p.title + '<br>' + p.text + '</p>');

            infowindow.setPosition(center);
            infowindow.open($scope.objMap);
         };

        self.toggleAdvancedSearch = function() {
            self.searchTitleActive = !self.searchTitleActive;
            self.searchTextActive = !self.searchTextActive;
            self.searchTypeOfAttackRegExp = !self.searchTypeOfAttackRegExp;
        };

        self.makeAdvancedSearch = function(title, text, type_of_attack) {
            var query = "";

            var queryParams = {
                title: self.searchTitle ? self.searchTitle : '',
                text: self.searchText ? self.searchText : '',
                type_of_attack: self.searchTypeOfAttack ? self.searchTypeOfAttack : '',
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
            }), function (newVal) {
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

    PostsController.$inject = ['$scope', '$location', 'postsResolve', 'Pagination', 'Auth', 'socketio', 'httpAsPromise', 'assignIconsOnMapFactory'];

    angular.module('postApp.controllers.index', [])
        .controller('PostsController', PostsController)
})();
