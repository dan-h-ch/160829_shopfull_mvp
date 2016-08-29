var express = require("express")
var app = express();
var path = require("path")

// WOW THIS IS UGLY!!!!
app.get('/*', function(req, res) {
  console.log(req.url)
  res.sendFile(path.join(__dirname + "/.." + req.url))
});

app.set("port", 8080)

app.listen(8080)