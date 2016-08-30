var express = require("express")
var app = express();
var path = require("path")
var db = require('../db/config');
var bodyParser = require('body-parser');

var Item = db.Model.extend({
  tableName: 'items'
});

// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));

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
  res.sendFile(path.join(__dirname + "/.." + req.url))
});

app.get('/compiled/*', function(req, res) {
  res.sendFile(path.join(__dirname + "/.." + req.url))
});

app.get('/node_modules/*', function(req, res) {
  res.sendFile(path.join(__dirname + "/.." + req.url))
});

app.get('/items', function(req, res) {
  sendAllItem(req, res)
})

app.delete('/items', function(req, res) {
  console.log('about to delete... ', req.body)
  var searchId = req.body.id
  db.knex('items').select().where("id", searchId)
  .del()
  .then(function() {
    sendAllItem(req, res)
  })
})

app.post('/items', function(req, res) {
  console.log('about to add... ', req.body)
  db.knex.insert(req.body).into('items')
  .then(function() {
    sendAllItem(req, res)
  })
})

/////////////////////////////////
/////   DB HELPER        ///////
///////////////////////////////

var sendAllItem = function (req, res) {
  db.knex('items').select()
  .then(function(data) {
    res.status(200).send(data)
  })
}










