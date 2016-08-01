var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection',function(socket){
	

	socket.on('message',function(message){
		
		socket.broadcast.emit('message',message.text);
	})

	
})

http.listen(PORT,function(){
	console.log('server started');
})


//io emit sends to everyone boadcast is everyone except sender...