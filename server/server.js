var express = require("express")
var app = express();
var path = require("path")
var db = require('../db/config');

var Item = db.Model.extend({
  tableName: 'items'
});

/////////////////////////////////
/////   SETTINGS         ///////
///////////////////////////////

var port = process.env.PORT || 4568;

app.listen(port)

/////////////////////////////////
/////   ROUTES           ///////
///////////////////////////////

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

app.get('/items', function(req, res) {
  console.log("got request")
  db.knex('items').select()
  .then(function(data) {
    console.log("sending reply")
    console.log(data)
    res.send(data)
  })
})