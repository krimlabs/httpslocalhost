var http = require('http');
var url = require('url');

//create a server object:
http.createServer(function (req, res) {
  var q = url.parse(req.url, true).query;
  console.log(q);
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080