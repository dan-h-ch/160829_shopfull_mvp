var db = require('../../db/config');

module.exports = function(app, express){

/////////////////////////////////
/////   ROUTES           ///////
///////////////////////////////

  /////////////////////////////////
  /////   ITEMS            ///////
  ///////////////////////////////

  app.get('/items/:userid', function(req, res) {
    sendAllItem(req, res, req.params.userid)
  })

  // do i want to actually delete the item?
  app.delete('/items', function(req, res) {
    // console.log('about to delete... ', req.body)
    // var searchId = req.body.id
    db.knex('items').select().where("id", req.body.id)
    .update({
      deleted: true,
      updated_at: new Date (),
      item_last_edit_userid : req.body.item_last_edit_userid
    })
    .then(function() {
      sendAllItem(req, res)
    })
  })

  app.post('/items', function(req, res) {
    // TODO: Error handling for no list selected
    console.log('about to add item... ', req.body)
    db.knex.insert(req.body).into('items')
    .then(function() {
      // thid doesn't work for updated across shares, need to pass in sessions userid
      // TODO: update with sessiosn userid when avialable
      sendAllItem(req, res, req.body.item_create_userid)
    })
  })

  app.put('/items', function(req, res) {
    console.log('about to update...', req.body)
    req.body.updated_at = new Date()
    db.knex('items').where('id', req.body.id).update(req.body)
    .then(function() {
      sendAllItem(req, res)
    })
  })

  /////////////////////////////////
  /////   LISTS            ///////
  ///////////////////////////////

  app.get('/lists/:userid', function(req, res) {
    // TODO: update with session userid when available
    sendAllLists(req, res, req.params.userid)
  })

  app.post('/lists', function(req, res) {
    console.log('about to add list... ', req.body)
    db.knex.insert(req.body).into('lists')
    .then(function() {
      // assume create_userid of new list is active session list
      // TODO: update with session userid when available
      sendAllLists(req, res, req.body.create_userid)
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

/////////////////////////////////
/////   DB HELPERS       ///////
///////////////////////////////

  var sendAllItem = function (req, res, userid) {
    var validListids = db.knex('lists').where('create_userid', userid).select('id')

    db.knex('items').whereIn('listid', validListids)
    .then(function(itemData) {
      console.log(itemData)
      res.status(200).send(JSON.stringify(itemData))
    })

  }


  var sendAllLists = function (req, res, userid) {
    db.knex('lists').where('create_userid', userid)
    .then(function(data) {
      console.log(data)
      res.status(200).send(JSON.stringify(data))
    })
  }



}