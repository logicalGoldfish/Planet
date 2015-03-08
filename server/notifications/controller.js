var db = require('../db/db.js');
var User = global.db.User;
var Item = global.db.Item;
var Message = global.db.Message;
var Notification = global.db.Notification;
var controller = {};

var handleError = function(err, res) {
  res.status(500);
  res.send(err);
}

controller.create = function(req, res, next){
  var itemId = req.params.itemId;
  var borrowerId = req.params.borrowerId;

  Notification.create({
    itemreq_id: itemId,
    userreq_id: borrowerId
  }).then(function(notification){
    res.send(notification);
  }).catch(function(err) {
    console.log('\nERROR WRITING NOTIFICATION:\n', err);
    handleError(err, res);
  });
};

/* getByUser
 * This gets all items and the users that 
 * have requested the items owned by the 
 * user logged in.
 */
controller.getByUser = function(req, res, next){
  var userId = req.params.userId;

  Item.findAll({
    where: { lender_id: userId },
    include: [{ 
      model: User,
      required: true
    }]
  }).catch(function(err) {
    console.log('\nNotification getByUser error:', err);
    handleError(err, res);
  }).then(function(items) {
    res.json(items);
  })
};


controller.acceptRequest = function(req, res, next){//This should delete all notifications related to the item
  var borrowerId = req.params.borrower;
  //check the cost of an item first
  var cost = 0;
  var bank = 0;
  var lender;
  Item.find({
    where: {
      id: req.params.item
    }
  }).then(function(item){
    lender = item.lender_id;
    cost = item.beebucks;
    console.log('this is the cost        ', cost);
    User.find({
      where: {
        id: borrowerId
      }
    }).then(function(user){
      console.log('This is the user beebucks      ', user.beebucks);
      bank = user.beebucks;
      if(user.beebucks >= cost){
        Notification.destroy({
            where: {
              itemreq_id: req.params.item
            }
          }).then(function(){
            Item.update(
              {borrowed: true, borrower_id: req.params.borrower},
              {where: {id: req.params.item}}
            )
          }).then(function(){
            var borrowerBucks = bank - cost;
              User.update(
                {beebucks: borrowerBucks},
                {where: {id: req.params.borrower}}
              )
          }).then(function(){
            User.find({
              where: {
                id: lender
              }
            }).then(function(user){
              var bank = user.beebucks;
              var lenderBucks = bank + cost;
              User.update(
              {beebucks: lenderBucks},
              {where: {id: user.id}}
              )
            }).then(function(){
              res.send('This item has been updated and borrowed ');
            })
          })
      }
      else{
        res.send('This item cannot be bought');
      }
    })
  })

}

controller.rejectRequest = function(req, res, next){
  //reject the request from a single user
  Notification.destroy({
    where: {
      itemreq_id: req.params.item,
      userreq_id: req.params.borrower
    }
  }).then(function(){
    res.send('a particular users request for an item has been removed from the notificiations')
  })
  
}
 

module.exports = controller;
