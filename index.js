var express = require('express');
var http = require('http');
var socketio = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketio(server);

var message = '.';


app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/public/projector.html");
});
app.get('/admin', function(req, res){
  res.sendFile(__dirname + "/public/admin.html");
});

io.on('connection', function(socket){
  console.log('connection');
  socket.emit('newmessage', message);
  socket.on('setmessage', function(data){
    message = data;
    socket.broadcast.emit('newmessage', message);
  });
});
server.listen(3000);
