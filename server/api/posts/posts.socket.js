'use strict';

var posts = require('./posts.model');

exports.applysocket = function(socket) {
    posts.schema.post('save', function(doc) {
        socket.emit('posts:save', doc);
    });

    posts.schema.post('remove', function(doc) {
        socket.emit('posts:remove', doc);
    });
}