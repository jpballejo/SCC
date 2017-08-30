var express = require('express');
var app = express();
var http = require ('http').Server(app);
var io = require('socket.io')(http);
var ArduinoFirmata = require('firmata');
//app.use(express.static(__dirname + '/app')); .listen(8081)
app.get('/', function (req,res) { 
res.sendFile(__dirname + '/index.html');
});




http.listen(8081, function(){
  console.log('listening on *:8081');
});

var arduino = new ArduinoFirmata("/dev/ttyACM0");

arduino.on("ready", () => {
	// inicializas lo de arduino
    var pin = 7;
   	arduino.pinMode(pin, arduino.MODES.OUTPUT);


   	
    io.on('connection', function (socket) {
		console.log("Socket conectado");
		socket.on('e', function (){
			console.log("Encendido");
	        arduino.digitalWrite(pin, 1);
		});
		socket.on('a',function(){
			console.log("Apagado");
	        arduino.digitalWrite(pin, 0);
		});
	});



});

/*var port = process.argv[2]-0 || 3000;
app.listen(port);
console.log("Server start - port:"+port);
*/
