var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');


app.use(express.static(__dirname + '/public'));

io.on('connection',function(socket){
	

	socket.on('message',function(message){
		message.timestamp = moment.valueOf();
		io.emit('message',message);
	})

	
})

http.listen(PORT,function(){
	console.log('server started');
})




//io emit sends to everyone boadcast is everyone except sender...