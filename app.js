var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
   res.sendFile('/Users/abuubaida921/Desktop/development_files/Socket-Programming-with-ExpressJS/index.html');
});

http.listen(3000, function(){
   console.log('listening on *:3000');
});