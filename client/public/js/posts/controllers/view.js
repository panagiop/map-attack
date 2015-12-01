(function() {
    'use strict';

    function ViewPostController($scope, $stateParams, ApiResource, typeOfAttackValues) {
        var self = this;
        var infowindow, center;

        $scope.$on('mapInitialized', function(event, map) {
            $scope.objMap = map;
        });

        self.typeOfAttackValues = typeOfAttackValues;
        self.typeOfAttackValues = _.pluck(self.typeOfAttackValues, 'name').splice(0, 4);

        ApiResource.resource('posts').get({
            id: $stateParams.id
        }, function(data, headers) {
            self.posts = data.posts;
        }, function(errResponse) {
            if (errResponse.status === 404) {
                console.log("something went wrong fetching this post");
            }
        });

        self.showInfoWindowOnMouseClick = function(event, p) {
            infowindow = new google.maps.InfoWindow();
            center = new google.maps.LatLng(p.loc[0], p.loc[1]);

            infowindow.setContent(
                '<p>' + p.title + '<br>' + p.text + '</p>');

            infowindow.setPosition(center);
            infowindow.open($scope.objMap);
        };
    }

    ViewPostController.$inject = ['$scope', '$stateParams', 'ApiResource', 'typeOfAttackValues'];

    angular.module('postApp.controllers.view', [])
        .controller('ViewPostController', ViewPostController)
})();
