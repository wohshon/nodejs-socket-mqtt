var express = require('express');
var router = express.Router();
var mqtt =  require('mqtt');
var fs = require('fs');

//default, or overwrite in the individual methods
var key= fs.readFileSync('./key.pem');
var cert= fs.readFileSync('./server.pem');
var amqHost='broker-amq-mqtt-ssl-xpaas-amq.cloudapps.demo.com';
var amqPort=443;
var amqProtocol="mqtts://";
var amqUsername='admin';
var amqPassword='admin';
var passphasePassword='password';
var topic="my.topic";
var options={
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


/* GET home page. */
router.get('/', function(req, res, next) {


	res.sendfile("views/index.html");

});

router.post('/connect', function(req,res) {
	console.log('connect');
	res.json({msg: 'client id '});

});
module.exports = router;

