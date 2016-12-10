const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || '8080';

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

server.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});
