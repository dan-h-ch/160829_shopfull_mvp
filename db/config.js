var path = require('path');
var DATABASE_URL = process.env.DATABASE_URL || {database: 'shopfull'}

var knex = require('knex') ({
  client: 'postgresql',
  connection: DATABASE_URL
});

// var knex = require('knex') ({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shopfull',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shopfull.sqlite')
//   }
// });
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 255);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('lists').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('lists', function (list) {
      list.increments('id').primary();
      list.string('listname', 255);
      list.integer('create_userid');
      list.foreign('create_userid').references('users.id')
      list.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('items').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('items', function (item) {
      item.increments('id').primary();
      item.string('itemname', 255);
      item.integer('listid');
      item.foreign('listid').references('lists.id');
      item.integer('quantity');
      item.decimal('cost');
      item.integer('item_create_userid');
      item.foreign('item_create_userid').references('users.id')
      item.integer('item_last_edit_userid');
      item.foreign('item_last_edit_userid').references('users.id')
      item.boolean('deleted').defaultTo('false');
      item.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

// var Item = db.Model.extend({
//   tableName: 'items'
// });

// new Item({
//   'itemname': 'NewItem' + Math.floor(Math.random()*10),
//   'listid': 0,
//   'userid': 0,
//   'quantity': 1 * Math.floor(Math.random()*10),
//   'cost': 0.99 * Math.floor(Math.random()*10)
// }).save()



// var Item = db.Model.extend({
//   tableName: 'lists'
// });

// new Item({
//   'listname': 'newlist' + Math.floor(Math.random()*10),
//   'userid': 0,
// }).save()





module.exports = db;
