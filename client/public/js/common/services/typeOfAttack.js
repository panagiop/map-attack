(function() {
    'use strict';
    angular.module('typeOfAttackFactory', [])
        .value('typeOfAttackValues', [
        {
            name: 'Physical attack',
            fillColor: 'assets/custom_map_icons/icon_black_custom_32.png'
        }, {
            name: 'Verbal attack',
            fillColor: 'assets/custom_map_icons/icon_orange_custom_32.png'
        }, {
            name: 'Police attack',
            fillColor: 'assets/custom_map_icons/icon_cyan_custom_32.png'
        }, {
            name: 'Theft',
            fillColor: 'assets/custom_map_icons/icon_green_custom_32.png'
        }, {
            name: 'Show All',
            fillColor: ''
        }
    ]);
})();
