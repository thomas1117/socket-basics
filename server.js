var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');


app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection',function(socket){
	
	socket.on('joinRoom',function(req){
		
		clientInfo[socket.id] = req;

		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message',{
			name:"system",
			text:req.name + " has joined!",
			timestamp:moment.valueOf()
		})
	});

	socket.on('message',function(message){
		message.timestamp = moment.valueOf();
		io.to(clientInfo[socket.id].room).emit('message',message);
	})

	
})

http.listen(PORT,function(){
	console.log('server started');
})




//io emit sends to everyone boadcast is everyone except sender...