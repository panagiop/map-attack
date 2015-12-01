(function() {
    'use strict';

    function AddPostController($state, ApiResource, Auth, $scope, typeOfAttackValues) {
        var self = this;
        var marker, map;

        self.listOfMarkers = [];
        self.typeOfAttackValues = typeOfAttackValues;
        self.typeOfAttackValues = _.pluck(self.typeOfAttackValues, 'name').splice(0, 4);

        $scope.$on('mapInitialized', function(evt, evtMap) {
            map = evtMap;

            self.placeMarker = function(e) {
                var marker = new google.maps.Marker({
                    position: e.latLng,
                    map: map
                });
                self.listOfMarkers.push(marker);
                map.panTo(e.latLng);
                if (self.listOfMarkers.length > 1) {
                    marker.setMap(null);
                }
            };

            function setAllMap(map) {
                for (var i = 0; i < self.listOfMarkers.length; i++) {
                    self.listOfMarkers[i].setMap(map);
                }
            }

            // Removes the markers from the map, but keeps them in the array.
            function clearMarkers() {
                setAllMap(null);
            }

            self.deleteMarker = function() {
                clearMarkers();
                self.listOfMarkers = [];
            };
        });

        //create new post instance. Properties will be set via ng-model on UI
        self.posts = new(ApiResource.resource('posts'))();

        // temp array contain the lat and lon of listOfMarkers
        var latLon = [];

        self.addPost = function() {
            for (var i in self.listOfMarkers[0].position) {
                if (self.listOfMarkers[0].position.hasOwnProperty(i)) {
                    latLon.push(self.listOfMarkers[0].position[i]);
                }
            }
            self.posts.loc = [latLon[0](), latLon[1]()];
            self.posts.$save(function() {
                $state.go('posts');
            });
            alert("Success...Your post is now pending for confirmation from administrator. After that it will be visible among the other posts");
        };
    }

    AddPostController.$inject = ['$state', 'ApiResource', 'Auth', '$scope', 'typeOfAttackValues'];

    angular.module('postApp.controllers.add', [])
        .controller('AddPostController', AddPostController)
})();
