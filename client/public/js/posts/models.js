(function() {
	'use strict';

	function PostsFactory() {
		var self = this;

		function sliderHelpers() {
			var translate = function(value) {
            	var a = new Date(value).toISOString(); 
            	return new Date(a).getDate() + '-' + parseInt(new Date(a).getMonth() + 1) + '-' + new Date(a).getFullYear();
        	};

        	var onSliderChange = function(dateSliderMin, dateSliderMax, httpAsPromise, assignIconsOnMapFactory) {
	            var dateFrom = new Date(dateSliderMin).toISOString(); 
	            var dateTo = new Date(dateSliderMax).toISOString(); 
	            httpAsPromise.fetch('/api/posts/queryByDate/' + dateFrom + '/' + dateTo).then(function(data) { 
 	                self.postsForMap = data.data;  
	                assignIconsOnMapFactory.assignIconsOnMap(self.postsForMap);  
	            });
        	};

        	return { 
        		translate: translate,
        		onSliderChange: onSliderChange
        	} 
		}

		return {
			sliderHelpers: sliderHelpers
		}
	}

	angular.module('postsFactory', [])
		.factory('postsFactory', PostsFactory);
})();