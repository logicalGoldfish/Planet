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
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

// app.set('port', process.env.PORT || 3000);

var port = process.env.PORT || 8080;

require('./config.js')(app, express);

// app.listen(app.get('port'), function(){
//   console.log('localhost listening on :' + app.get('port') + ' Ctrl-C to terminate');
// })

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  socket.on('userInfo', function(msg){
     io.emit("userLoad", msg);
   });
});

// Creates tables if they don't exist
User.sync().then(function() {
  Message.sync();
  Item.sync().then(function() {
    Notification.sync();
    Review.sync()
    // .then(function() {
    //   Review.create({
    //     rating: 5,
    //     review: 'blahblahblah',
    //     reviewer_id: 3,
    //     reviewee_id: 4,
    //     item_id: 2
    //   }).success(function(a){
    //     console.log('SUCCESS!!!',a);
    //   })
    // });
  });
})

// Create tables and test data. Uncomment for test data

// var newUser1 = User.build({
//   username: 'bubblebee',
//   firstname: 'Brixton',
//   lastname: 'Humperdink',
//   reputation: 100,
//   beebucks: 300,
//   city: 'Honey Pot',
//   state: 'California',
//   country: 'USA'
// });
// var newUser2 = User.build({
//   username: 'criminycricket',
//   firstname: 'Creighton',
//   lastname: 'Crambleberry',
//   reputation: 500,
//   beebucks: 5000,
//   city: 'Shrubbery',
//   state: 'California',
//   country: 'USA'
// });
// var newUser3 = User.build({
//   username: 'dandelion',
//   firstname: 'Dreamwave',
//   lastname: 'Dystopia',
//   reputation: 50,
//   beebucks: 10,
//   city: 'Flower Fields',
//   state: 'California',
//   country: 'USA'
// });
// var newMsg = Message.build({
//   message: 'hello world',
//   to_id: 1,
//   from_id: 2
// });
// var newItem1 = Item.build({
//   title: 'Stinger',
//   description: 'For when your stinger falls off defending the hive',
//   pollenprice: 400,
//   borrowed: false,
//   lender_id: 2
// });
// var newItem2 = Item.build({
//   title: 'Horse Head',
//   description: 'Use this to leave an impactful message, preferably in bed',
//   pollenprice: 800,
//   borrowed: false,
//   lender_id: 3
// });
// var newItem3 = Item.build({
//   title: 'Shoe',
//   description: 'It\'s used and stinky but warm',
//   pollenprice: 20,
//   borrowed: false,
//   lender_id: 1
// })
// var newNotification = Notification.build({
//   userreq_id: 1,
//   itemreq_id: 1
// });
// var newReview = Review.build({
//   rating: 3,
//   review: 'whatever this sucks',
//   reviewee_id: 1,
//   reviewer_id: 2
// });

// User.sync({force: true}).then(function() {
//   newUser1.save();
//   newUser2.save();
//   newUser3.save().then(function() {
//     Message.sync({force: true}).then(function() {
//       newMsg.save();
//       Item.sync({force: true}).then(function() {
//         newItem1.save();
//         newItem2.save();
//         newItem3.save();
//       })
//       .then(function() {
//         // Find all items that belong to a user
//         Item.findAll({
//           // include: [{ model: User, as: 'lender_id'}],
//           // where: {username: 'bubblebee'}
//           where: {lender_id: 3}
//         })
//         .success(function(items) {
//           for (var i=0; i<items.length; i++) {
//             console.log('\n\nITEM:', items[i]); 
//           }
//         });
//       });
//       Notification.sync({force: true});
//       Review.sync({force: true})
//         .then(function() {
//           Review.drop();
//           Notification.drop();
//           Message.drop();
//           Item.drop();
//           User.drop();
//         })
//       });
//     })
// });
