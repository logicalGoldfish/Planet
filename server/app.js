var express = require('express');
var app = express();
var router = require('./config.js');
var logger = require('morgan');
var Sequelize = require('sequelize');
var db = require('./db/db.js');
var User = global.db.User;
var Item = global.db.Item;
var Message = global.db.Message;

console.log('USER:', User);

// db();
// User.findAll().then(function() {
//   console.log('THIS WORKS YAYAYAYAYAYAYA');

// });

app.set('port', process.env.PORT || 3000);

require('./config.js')(app, express);

app.listen(app.get('port'), function(){
  console.log('localhost listening on :' + app.get('port') + ' Ctrl-C to terminate');
})

// Create tables and test data
User.sync().then(function() {
  var newUser1 = User.build({
    username: 'bubblebee',
    firstname: 'Brixton',
    lastname: 'Humperdink',
    reputation: 100,
    beebucks: 300,
    city: 'Honey Pot',
    state: 'California',
    country: 'USA'
  });
  var newUser2 = User.build({
    username: 'criminycricket',
    firstname: 'Creighton',
    lastname: 'Crambleberry',
    reputation: 500,
    beebucks: 5000,
    city: 'Shrubbery',
    state: 'California',
    country: 'USA'
  });
  newUser1.save();
  newUser2.save().then(function() {
    User.findAll()
      .then(function(usrs) {
        for (var i = 0; i < usrs.length; i++) {
          console.log(usrs[i].username + ' exists');
        }
      })
      .then(function() {
        Message.sync().then(function() {
          var newMsg = Message.build({
            message: 'hello world',
            borrower_id: 1,
            lender_id: 2
          });
          newMsg.save();
        });
      })
      .then(function() {
        Item.sync().then(function() {
          var newItem = Item.build({
            title: 'Stinger',
            description: 'For when your stinger falls off defending the hive',
            pollenprice: 400,
            borrowed: true,
            borrower_id: 1,
            lender_id: 2
          });
          newItem.save();
        })
      })
  });
});

