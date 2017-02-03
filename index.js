var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var message = '.';

server.listen(3000);

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

