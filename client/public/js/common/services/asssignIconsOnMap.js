(function() {
	'use strict';

	function assignIconsOnMapFactory() {
	    return {
	    	assignIconsOnMap: function(postsForMap) {
	    		postsForMap.forEach(function(item, index) {
			        if (item.type_of_attack === 'Verbal attack') {
			            _.assign(item, {
			                fillColor: 'assets/custom_map_icons/icon_orange_custom_16.png'
			            });
			        }
			        if (item.type_of_attack === 'Physical attack') {
			            _.assign(item, {
			                fillColor: 'assets/custom_map_icons/icon_black_custom_16.png'
			            });
			        }
			        if (item.type_of_attack === 'Police attack') {
			            _.assign(item, {
			                fillColor: 'assets/custom_map_icons/icon_cyan_custom_16.png'
			            });
			        }
			        if (item.type_of_attack === 'Theft') {
			            _.assign(item, {
			                fillColor: 'assets/custom_map_icons/icon_green_custom_16.png'
			            });
			        }
		    	})
			}
 		}
 	}

	angular.module('assignIconsOnMapFactory', [])
		.factory('assignIconsOnMapFactory', assignIconsOnMapFactory);
})();