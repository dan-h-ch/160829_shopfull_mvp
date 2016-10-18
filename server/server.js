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

app.listen(port, function() {
  console.log("listening on", port)
})

/////////////////////////////////
/////   ROUTES           ///////
///////////////////////////////

app.use(express.static('public'));

app.get('/node_modules/*', function(req, res) {
  res.sendFile(path.join(__dirname + "/.." + req.url))
});

app.get('/items', function(req, res) {
  sendAllItem(req, res)
})

// do i want to actually delete the item?
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
  console.log('about to add item... ', req.body)
  db.knex.insert(req.body).into('items')
  .then(function() {
    sendAllItem(req, res)
  })
})

app.post('/lists', function(req, res) {
  console.log('about to add list... ', req.body)
  db.knex.insert(req.body).into('lists')
  .then(function() {
    sendAllLists(req, res)
  })
})

app.put('/items', function(req, res) {
  console.log('about to update...', req.body)
  db.knex('items').where('id', req.body.id).update(req.body)
  .then(function() {
    sendAllItem(req, res)
  })
})

// For filter
// app.post('/filter', function(req, res) {
//   console.log('about to filter... ', req.body)
//   db.knex.insert(req.body).into('items')
//   .then(function() {
//     sendAllItem(req, res)
//   })
// })

app.get('/lists', function(req, res) {
  sendAllLists(req, res)
})


/////////////////////////////////
/////   DB HELPER        ///////
///////////////////////////////

var sendAllItem = function (req, res) {
  db.knex('items').select().orderBy('id', 'asce')
  .then(function(data) {
    res.status(200).send(JSON.stringify(data))
  })
}


var sendAllLists = function (req, res) {
  db.knex('lists').select()
  .then(function(data) {
    res.status(200).send(data)
  })
}









