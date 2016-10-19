var express = require("express")
var app = express();
var path = require("path")
var db = require('../db/config');
var bodyParser = require('body-parser');
var routes = require('./config/routes')

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

routes(app, express)

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










