(function() {
    'use strict';

    function HelpersFactory($rootScope) {
        var self = this;

        self.searchTitleActive = false;
        self.searchTextActive = false;
        self.searchTypeOfAttackRegExp = false;

        var infowindow, center;

        $rootScope.$on('mapInitialized', function(event, map) {
            $rootScope.objMap = map;
        });

        self.showInfoWindowOnMouseClick = function(event, p) {
            infowindow = new google.maps.InfoWindow();
            center = new google.maps.LatLng(p.loc[0], p.loc[1]);

            infowindow.setContent(
                '<p>' + p.title + '<br>' + p.text + '</p>');

            infowindow.setPosition(center);
            infowindow.open($rootScope.objMap);
        };

        // translate date (timestamp) to ISO and then in dd-mm-yy format
        self.translate = function(value) {
            var a = new Date(value).toISOString();
            return new Date(a).getDate() + '-' + parseInt(new Date(a).getMonth() + 1) + '-' + new Date(a).getFullYear();
        };

        self.clearFilters = function(callback) {
            self.searchTitle = '';
            self.searchText = '';
            self.searchTypeOfAttack = '';
            callback();
        };

        self.toggleAdvancedSearch = function() {
            self.searchTitleActive = !self.searchTitleActive;
            self.searchTextActive = !self.searchTextActive;
            self.searchTypeOfAttackRegExp = !self.searchTypeOfAttackRegExp;
        };
    }

    angular.module('HelpersFactory', [])
        .factory('HelpersFactory', ['$rootScope', function($rootScope) {
            return {
                HelpersFactory: HelpersFactory
            }
        }]);
})();
