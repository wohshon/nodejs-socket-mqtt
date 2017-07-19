var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var jQuery=require('jquery');
//global.jQuery = require('jquery');
//global.jQuery = global.$ = require('jquery'); 
//var bootstrap=require('bootstrap');
var fs = require('fs');
var options = {
		  key: fs.readFileSync('./key.pem'),
		  server: fs.readFileSync('./server.pem')
		};


var mqttService  = require('mqtt');

//default, or overwrite in the individual methods
var key= fs.readFileSync('./key.pem');
var cert= fs.readFileSync('./server.pem');

//var amqHost='broker-amq-mqtt-ssl-xpaas-amq.cloudapps.demo.com';
//var amqHost='broker-amq-mqtt-ssl-xpaas-amq.cloudapps-ocp34-wohshon.ddns.net';
var amqHost='broker-amq-mqtt-ssl-amq.cloudapps-ocp35-wohshon.ddns.net';
var amqPort=443;
var amqProtocol="mqtts://";
var amqUsername='admin';
var amqPassword='admin';
var passphasePassword='password';
var topic="test.topic";
var mqttoptions={
  host: amqHost,
  port: amqPort,
  key:key,
  cert:cert,
  passphrase: passphasePassword,
  username: amqUsername,
  password: amqPassword,
  servername : amqHost,
  rejectUnauthorized: false
};

var url=amqProtocol+amqHost+":"+amqPort;





var index = require('./routes/index');

//var app = express();
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3001, function(){
	  console.log('Express server listening on port '+ 3001);
});
var clients=new Array();
var clientId='web';
io.on('connection', function(socket){
	console.log(' >> connected by client ');

   var  client=clients[clientId];
   console.log(client);
if (!client) {
    client=mqttService.connect(url,mqttoptions);

      client.on('connect', () => {
      console.log('connected to MQTT');
      client.subscribe(topic);
      console.log('subscribed to topic - '+topic);
      clients[clientId]=client;
      console.log('clients size '+clients.length);
    }); //on connect
} //!client

      client.on('message', (topic, message) => {
        console.log('message received by '+clientId+':'+message);
  

        if(this.topic === topic) {
          connected = (this.message.toString() === message);
        }
	     io.emit('gotMessage', {msg: ''+message});

      }); //on message



});//io.on

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//boostrap
//app.use('js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
//app.use('js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
//app.use('css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

//app.use('/js', express.static(__dirname + '/node_modules/mqtt/dist')); // redirect mqtt.min.js
//app.use('/js', express.static(__dirname + '/node_modules/mqtt-packet/')); // redirect mqtt.min.js
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io-client/dist')); // redirect socket
app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//start socket server instance




module.exports = app;
