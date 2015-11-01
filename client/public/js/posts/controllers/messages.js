(function() {
	'use strict';

	function MessagesController(postsResolve, Pagination, Auth, httpAsPromise) {
		var self = this;

		self.post = {};

		self.posts = postsResolve;
		self.pagination = Pagination;  
        self.pagination.numOfPages = Math.ceil(self.posts.length / self.pagination.getResultsPerPage()); 

        self.isLoggedIn = Auth.isLoggedIn();
        self.isLoggedInAsAdmin = Auth.isLoggedInAsAdmin(); 

        self.statusChanged = false;

        self.changePublishStatus = function(postId) {
        	httpAsPromise.put('/api/posts/publishPost/' + postId, self.post).then(function(data) { 
	            self.statusChanged = true;
	        });
        }
	}

	MessagesController.$inject = ['postsResolve', 'Pagination', 'Auth', 'httpAsPromise'];

	angular.module('postApp.controllers.messages', [])
		.controller('MessagesController', MessagesController);
})();