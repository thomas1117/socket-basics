var socket = io();

socket.on('connect',function(){
	console.log('connected to socket.io server')
});

socket.on('message',function(message){
	console.log('new message ',message);
	$('#message-list').append("<p>" + message + "</p>");
});


$(document).ready(function(){
	$('#message-form').on('submit',function(e){
		e.preventDefault();
		var message = $('#message-input').val();

		socket.emit('message',{text:message})
		$('#message-input').val('')
	})
})
