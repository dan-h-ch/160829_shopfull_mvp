var db = require('../../db/config');

module.exports = function(app, express){

/////////////////////////////////
/////   ROUTES           ///////
///////////////////////////////

  /////////////////////////////////
  /////   ITEMS            ///////
  ///////////////////////////////

  app.get('/items/:userid', function(req, res) {
    sendAllItem(req, res, req.params.userid);
  });

  // do i want to actually delete the item?
  app.delete('/items', function(req, res) {
    // console.log('about to delete... ', req.body)
    // var searchId = req.body.id
    db.knex('items').select().where('id', req.body.id)
    .update({
      deleted: true,
      updated_at: new Date (),
      item_last_edit_userid : req.body.item_last_edit_userid
    })
    .then(function() {
      // assuming last user edit is the account logged in
      sendAllItem(req, res, req.body.item_last_edit_userid);
    });
  });

  app.post('/items', function(req, res) {
    // TODO: Error handling for no list selected
    console.log('about to add item... ', req.body);
    db.knex.insert(req.body).into('items')
    .then(function() {
      // thid doesn't work for updated across shares, need to pass in sessions userid
      // TODO: update with sessiosn userid when avialable
      sendAllItem(req, res, req.body.item_create_userid);
    });
  });

  app.put('/items', function(req, res) {
    console.log('about to update...', req.body);
    req.body.updated_at = new Date();
    db.knex('items').where('id', req.body.id).update(req.body)
    .then(function() {
      sendAllItem(req, res, req.body.id);
    });
  });

  /////////////////////////////////
  /////   LISTS            ///////
  ///////////////////////////////

  app.get('/lists/:userid', function(req, res) {
    // TODO: update with session userid when available
    sendAllLists(req, res, req.params.userid);
  });

  app.post('/lists', function(req, res) {
    // db.knex.insert(req.body).into('userList')
    console.log('about to add list... ', req.body.listname);
    db.knex.insert(req.body).into('lists')
    .returning('id')
    .then(function(data) {
      var userListInsert = {
        userid: req.body.create_userid,
        listid: data[0]
      };
      db.knex.insert(userListInsert).into('userlists');
      // assume create_userid of new list is active session list
      // TODO: update with session userid when available
      sendAllLists(req, res, req.body.create_userid);
    });
  });

  app.delete('/lists', function(req, res) {
    console.log('about to delete list... ', req.body.id);
    db.knex('lists').select().where('id', req.body.id)
    .update({
      deleted: true,
      updated_at: new Date ()
    })
    .then(function() {
      sendAllLists(req, res, req.body.userid);
    });
  });

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

  app.get('/username/:userid', function(req, res) {
    db.knex('users').where('id', req.params.userid).select('username')
    .then(function(data) {
      res.status(201).send(JSON.stringify(data[0]))
    })
  })

  app.put('/users', function(req, res) {
    console.log('putting for... ', req.body)
    db.knex('users').where('username', req.body.username)
    .then(function(data) {
      if (data.length === 0) {
        console.log('no username in db')
        db.knex('users').where('id', req.body.id)
        .update({
          username: req.body.username
        })
        .then(function(data) {
          res.status(201).send(JSON.stringify(req.body))
        })
      } else {
        console.log('username seems taken')
        var resp = {
          error: 'Username is already taken'
        }
        console.log(resp)
        res.status(409).send(JSON.stringify(resp))
      }
    })
  })

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
        res.status(409).send(JSON.stringify(data))
      }
    });
  });


/////////////////////////////////
/////   DB HELPERS       ///////
///////////////////////////////

  var sendAllItem = function (req, res, userid) {
    var validListids = db.knex('lists').where('create_userid', userid).select('id');

    db.knex('items').whereIn('listid', validListids)
    .then(function(itemData) {
      res.status(200).send(JSON.stringify(itemData));
    });
  };

  var sendAllLists = function (req, res, userid) {
    db.knex.select('listid', 'listname', 'userid')
    .from('userlists')
    .leftJoin('lists', 'userlists.listid', 'lists.id')
    .where({
      'userlists.userid': userid,
      'lists.deleted': false
    })
    .then(function(data) {
      res.status(200).send(JSON.stringify(data));
    });
  };

};