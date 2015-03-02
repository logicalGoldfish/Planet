var db = require('../db/db.js');
var User = global.db.User;
var Item = global.db.Item;
var Messages = global.db.Message;
var controller = {};
var Sequelize = require('sequelize');

/* Creates a message between two users.
 */
controller.create = function(req, res, next){
  //req.body will have the message
  var from = req.params.fromId;
  var to = req.params.toId;

  req.body.from_id = from;
  req.body.to_id = to;
  console.log('\nmessage:',req.body.message);
  Messages.create(req.body).then(function(message){
    res.send(message);
  }).catch(function(err) {
    console.log('\nmessage create error:', err)
    res.status(500).json({ error: 'message create failed' });
  });
}

/* Retrieves all messages that a user wrote
 * or received.
 */
controller.getMessages = function(req, res, next){
  Messages.findAll({
    where: Sequelize.or(
      {to_id: req.params.userId},
      {from_id: req.params.userId}
    ),
    include: [ 
      { model: User, as: 'to' },
      { model: User, as: 'from' }
    ]
  }).then(function(messages){
    console.log(messages);
    res.send(messages);
  }).catch(function(err) {
    console.log('\nmessage getMessages error:', err)
    res.status(500).json({ error: 'message getMessages failed' });
  })
};


module.exports = controller;
