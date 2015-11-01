(function() {
	'use strict';

	function MessagesController(postsResolve, Pagination, Auth, httpAsPromise) {
		var self = this; 

		self.posts = postsResolve;
		self.pagination = Pagination;  
        self.pagination.numOfPages = Math.ceil(self.posts.length / self.pagination.getResultsPerPage()); 

        self.isLoggedIn = Auth.isLoggedIn();
        self.isLoggedInAsAdmin = Auth.isLoggedInAsAdmin(); 

        self.statusChangedForPosts = [];
		var length = self.posts.length;

		for (var i = 0; i < length; i++) {
		    self.statusChangedForPosts.push(false);
		}

        self.changePublishStatus = function(postId, index) {
        	_.assign(self.posts[index], { isPublished: true });
        	httpAsPromise.put('/api/posts/publishPost/' + postId, self.posts[index]).then(function(data) { 
	            self.statusChangedForPosts[index] = true;
	        });
        };
	}

	MessagesController.$inject = ['postsResolve', 'Pagination', 'Auth', 'httpAsPromise'];

	angular.module('postApp.controllers.messages', [])
		.controller('MessagesController', MessagesController);
})();