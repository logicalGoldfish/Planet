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
	//get the item title out and the borrower name
	var item = req.params.item; //should be item id
	var borrower = req.params.borrower;
	// username of item
	User.find({
		where: {
			username: borrower
		}
	}).then(function(user){
			req.body.itemreq_id = item;
			req.body.userreq_id = user.id;
			Notification.create(req.body)
				.then(function(notification){
					res.send(notification);
				})
      // change this so that req.body has UserId and ItemId as keys
		}).catch(function(err) {
			console.log('\nERROR WRITING NOTIFICATION:\n', err);
			handleError(err, res);
		})
	}


controller.getByUser = function(req, res, next){
  var user = req.params.user;
  var results = [];
  // THIS IS TESTING
  // use the id for req.params.user
  User.findAll({
    where: {
      id: user
    },
    include: [Notification]
  }).then(function(users) {
    console.log('\n\n\n****GOT ALL USERS****\n\n\n')
  }).catch(function(err) {
    console.error('\nDAMMIT.\n', err);
  });

/*
  User.find({
    where: {
      username: user
    }
  }).then(function(user){
    var userId = user.id;
    Item.findAll({
      where: {
        lender_id: user.id
      }
    }).catch(function(err) {
      console.log('\nItem findAll err:\n', err);
      handleError(err, res);
    }).then(function(items){
      var itemsId = [];
      for (var i = 0; i < items.length; i++) {
        itemsId.push(items[i].id);
      }
      console.log('\nITEMS ID:', itemsId);
      Notification.findAll({
        where: {itemreq_id: itemsId}
        // itemreq_id: itemsId
        // attributes: ['itemreq_id'],
        // joinTableAttributes: ['itemreq_id']
        // include: [{ model: Item, foreignKey: 'itemreq_id'}]
      }).catch(function(err) {
        console.log('\nNotifications findAll err:\n', err);
        handleError(err, res);
      }).then(function(notifications){
        // change this so that response has username info and item info
        // borrower's username, requested item's title
        var thisMustCompleteBeforeResponse = function() {
          for (var i = 0; i<notifications.length; i++) {
            (function(i) {
              var notification = notifications[i];
              User.find({ 
                where: {id: notification.userreq_id} 
              }).then(function(borrower) {
                notification.dataValues['userreq_username'] = borrower.username;
              }).then(function() {
                Item.find({ 
                  where: {id: notification.itemreq_id} 
                }).then(function(item) {
                  notification.dataValues['itemreq_title'] = item.title;
                  results.push(notification.dataValues);
                }).catch(function(err) {
                  console.log('\nnotifications getByUser error:', err);
                  handleError(err, res);
                })
                .then(function() {
                  if (notifications.length === results.length) {
                    console.log('\n\nSENDING RESPONSE!\n\n')
                    res.json(results);
                  }
                });
              });
            })(i);  
          }
        };

        thisMustCompleteBeforeResponse();
      });
    });
  });
*/
};


controller.acceptRequest = function(req, res, next){//This should delete all notifications related to the item
	//Would this have the id of the item? I think so.
	var borrowerId = req.params.borrower;
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
				res.send('item updated and is now borrowed         *********');
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