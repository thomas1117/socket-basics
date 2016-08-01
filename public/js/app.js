var socket = io();

socket.on('connect',function(){
	console.log('connected to socket.io server')
});

socket.on('message',function(message){

	var momentTimestamp = moment.utc(message.timestamp);
	
	$('#message-list').append("<p>" + message.text + "</p>" + "<strong>" + momentTimestamp.local().format('h:mm a') +"</strong>");
});


$(document).ready(function(){
	$('#message-form').on('submit',function(e){
		e.preventDefault();
		var message = $('#message-input').val();

		socket.emit('message',{text:message})
		$('#message-input').val('')
	})
});



