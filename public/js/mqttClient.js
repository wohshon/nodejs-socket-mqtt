var socket;
var mqttClient={
	
	init:function () {
	    //alert(123);
	    //post to connect
/*		$.post( "/connect", function( data ) {
		  //alert(Object.keys(data));
		  alert(data.msg);
		});*/
//		socket=io();
		socket = io.connect('http://192.168.223.130:3001');
		socket.on('connect', function(){
			console.log('connected to server :  socket id: '+socket.id);
		});
		socket.on('gotMessage',function(data){
			//alert(data.msg);
			$('#msg').html($('#msg').html()+'</p>'+data.msg);
			//update UI
		});			
	}
};