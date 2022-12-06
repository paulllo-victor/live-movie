var sys = require("sys");
var ws = require('ws');
var userCount = [];

var server = new ws.Server({
  debug: true,
  port: 8000
});

// server.addListener("connection", function(conn){
//   server.broadcast("userCount " + ++userCount);
//   conn.addListener("message", function(message){
//     server.broadcast(message);
//   });
// });

server.on('connection', function(ws) {
    server.broadcast("userCount " + ++userCount);

    ws.on('message', function(message,binary) {
        server.broadcast((binary ? message : message.toString()));
        console.log('Received: ' + (binary ? message : message.toString()));
    });
 
    ws.on('close', function(ws) {
        server.broadcast("userCount " + --userCount);
    });
    // server.send('You successfully connected to the websocket.');
 });

// server.addListener("close", function(conn){
//   server.broadcast("userCount " + --userCount);
// });

// server.on('close', function(ws) {
//     server.broadcast("userCount " + --userCount);
// });

server.broadcast = function broadcast(msg){
    server.clients.forEach(function each(client){
        client.send(msg);
    });
};



// server.listen(8000, "localhost");
// function log(msg) {
//   sys.puts(+new Date + ' - ' + msg.toString());
// };