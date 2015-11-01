'use strict';

var Posts = require('../posts/posts.model');

function handleError(res, err) {
  return res.send(500, err);
}

// fetching post according to the selected attack filters
exports.posts = function(req, res) {
    Posts.find({ isPublished: true, type_of_attack: req.params.filtername }).exec(function(err, post) {
        if (err) { return handleError(res, err); }
        res.json({
            posts: post
        });
    });
}; 
 
exports.postsLoggedIn = function(req, res) {
	console.log(req.payload._userId);
	Posts.find({ __user: req.payload._userId, isPublished: true, type_of_attack: req.params.filtername }).exec(function(err, post) {
        if (err) { return handleError(res, err); }
        res.json({
            posts: post
        });
    });
}