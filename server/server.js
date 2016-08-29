var express = require("express")
var app = express();
var path = require("path")

// WOW THIS IS UGLY!!!!
app.get('/', function(req, res) {
  console.log(req.url)
  res.sendFile(path.join(__dirname + "/.." + req.url))
});

app.get('/compiled/*', function(req, res) {
  console.log(req.url)
  res.sendFile(path.join(__dirname + "/.." + req.url))
});

app.get('/node_modules/*', function(req, res) {
  console.log(req.url)
  res.sendFile(path.join(__dirname + "/.." + req.url))
});

var port = process.env.PORT || 4568;

app.listen(port)