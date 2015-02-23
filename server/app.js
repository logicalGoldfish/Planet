var express = require('express');
var app = express();
var router = require('./config.js');
var logger = require('morgan');
var Sequelize = require('sequelize');
var db = require('./db/db.js');
var User = global.db.User;
var Item = global.db.Item;
var Message = global.db.Message;
var Notification = global.db.Notification;
var Review = global.db.Review;

console.log('USER:', User);

app.set('port', process.env.PORT || 3000);

require('./config.js')(app, express);

app.listen(app.get('port'), function(){
  console.log('localhost listening on :' + app.get('port') + ' Ctrl-C to terminate');
})

// Creates tables if they don't exist
User.sync().then(function() {
  Message.sync();
  Item.sync().then(function() {
    Notification.sync();
    Review.sync();
  });
})

// Create tables and test data. Uncomment for test data
/*
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
  var newUser3 = User.build({
    username: 'dandelion',
    firstname: 'Dreamwave',
    lastname: 'Dystopia',
    reputation: 50,
    beebucks: 10,
    city: 'Flower Fields',
    state: 'California',
    country: 'USA'
  });
  newUser1.save();
  newUser2.save();
  newUser3.save().then(function() {
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
            borrowed: false,
            lender_id: 2
          });
          newItem.save();
        })
      })
      .then(function() {
        Notification.sync().then(function() {
          var newNotification = Notification.build({
            userreq_id: 1,
            itemreq_id: 1
          });
          newNotification.save();
        })
      })
      .then(function() {
        Review.sync().then(function() {
          var newReview = Review.build({
            rating: 3,
            review: 'whatever this sucks',
            reviewee_id: 1,
            reviewer_id: 2
          });
          newReview.save();
        })
      })
  });
});
*/

