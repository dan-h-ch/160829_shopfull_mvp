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
      // assuming last user edit is the account logged in
      sendAllItem(req, res, req.body.item_last_edit_userid)
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
      sendAllItem(req, res, req.body.id)
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

  app.delete('/lists', function(req, res) {
    console.log('about to delete list... ', req.body)
    db.knex('lists').select().where('id', req.body.id)
    .update({
      deleted: true,
      updated_at: new Date ()
    })
    .then(function() {
      sendAllLists(req, res, req.body.userid)
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
  /////   USERS            ///////
  ///////////////////////////////

  app.post('/users', function(req, res) {
    console.log('looking for... ', req.body)
    db.knex('users').where('id', req.body.id)
    .then(function(data) {
      if (data.length === 0) {
        console.log('about to add user... ', req.body)
        db.knex.insert(req.body).into('users')
        .then(function() {
          console.log('user added...', req.body)
          res.status(201).send()
        })
      } else {
        console.log('user already exists...', req.body)
        res.status(409).send(JSON.stringify('user already exists'))
      }
    })
  })


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
    console.log('getting all lists with userid', userid)
    db.knex('lists').where({
      'deleted': false,
      'create_userid': userid,
    }).andWhere('create_userid', userid)
    .then(function(data) {
      console.log(data)
      res.status(200).send(JSON.stringify(data))
    })
  }



}