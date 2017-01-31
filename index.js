var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
      output: process.stdout
});

server.listen(3000);

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/public/projector.html");
});

io.on('connection', function(socket){
  setInterval(function(){
    socket.emit('newtext', {data:'REFUGEES ARE WELCOME HERE'});
  }, 10000);
  socket.emit('newtext', {data:'REFUGEES ARE WELCOME HERE'});
});

function getText(){
	rl.question('enter the message:\n', function(message){
		io.emit('newtext', {message: message});
		getText();
	})
}
getText();
