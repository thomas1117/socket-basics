var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');


app.use(express.static(__dirname + '/public'));

var clientInfo = {};

// Sends current users to provided socket

function sendCurrentUsers (socket) {
	var info = clientInfo[socket.id];
	var users = [];

	if(typeof info === 'undefined') {
		return;
	}

	
	Object.keys(clientInfo).forEach(function(obj){
		
		if(info.room === clientInfo[obj].room) {

			users.push(clientInfo[obj].name);	
		}
			
	});

	socket.emit('message',{
		name:'System',
		text:'Current Users ' + users.join(', '),
		timestamp:moment.valueOf()

	})

}
 
io.on('connection',function(socket){

	socket.on('disconnect',function(){
		var userData = clientInfo[socket.id];

		if(typeof userData !=='undefined') {
			socket.leave(userData.room);
			io.to(userData.room).emit('message',{
				name:'System',
				text:userData.name+ " has left",
				timestamp:moment.valueOf()
			});
			delete clientInfo[socket.id];
		}

	});
	
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

		if(message.text === '@currentUsers') {
			sendCurrentUsers(socket)
		}

		else {

			message.timestamp = moment.valueOf();
			io.to(clientInfo[socket.id].room).emit('message',message);

		}
	})

	
})

http.listen(PORT,function(){
	console.log('server started');
})




//io emit sends to everyone boadcast is everyone except sender...