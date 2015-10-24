'use strict';

module.exports = function (socketio) {

  socketio.on('connection', function (socket) { 
	console.log('a user connected');

  	socket.on('disconnect', function(){
    	console.log('user disconnected');
	});  

    require('./api/posts/posts.socket').applysocket(socket); 
  });
};