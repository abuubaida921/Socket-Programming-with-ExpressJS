var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile('/Users/abuubaida921/Desktop/development_files/Socket-Programming-with-ExpressJS/index.html');
});

var clients = 0;

//Whenever someone connects this gets executed
io.on('connection', function (socket) {
    clients++;
    socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
    socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
    socket.on('disconnect', function () {
       clients--;
       socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
    });

    //receive event from client side
    socket.on('clientEvent', function (data) {
        console.log(data);
    });

    console.log('A user connected');

    // Send a message after a timeout of 4seconds
    setTimeout(function () {
        socket.send('Your seeing this because server Sent this message 4seconds after connection!');
    }, 4000);

    // Send a message as custom event
    setTimeout(function () {
        // Sending an object when emmiting an event
        socket.emit('testerEvent', { description: 'A custom event named testerEvent!' });
    }, 6000);


    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});