var name = getQueryVariable('name') || 'anonymous';
var room = getQueryVariable('room');
$('#room-name').html(room);

var socket = io();

socket.on('connect',function(){
	console.log('connected to socket.io server');

	socket.emit("joinRoom", {
		name:name,
		room:room
	});
	
});

socket.on('message',function(message){

	var momentTimestamp = moment.utc(message.timestamp);

	var messageList = $('#message-list')
	messageList.append("<p><strong>"+ momentTimestamp.local().format('h:mm a') + " "  + message.name + "</strong></p>");
	messageList.append("<p>" + message.text + "</p>");
});


$(document).ready(function(){
	$('#message-form').on('submit',function(e){
		e.preventDefault();
		var message = $('#message-input').val();

		socket.emit('message',{
			name:name,
			text:message
		})
		$('#message-input').val('');

	
		
	})
});



