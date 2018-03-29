var http = require("http");
const fs = require("fs");
var server = http.createServer(function(req, res) {
  res.writeHead(200);
  fs.readFile("./test/test.txt", 'utf-8', (err, success) => {
    res.end(success)
  });
});
server.listen(3000);
