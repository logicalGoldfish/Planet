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
	//get the item title out and the borrower name from path
	var item = req.params.item;
	// title of item
	var borrower = req.params.borrower;
	// username of item
	User.find({
		where: {
			username: borrower
		}
	}).then(function(user){
		var userId = user.id;
		Item.find({
			where: {
				title: item
			}
		}).then(function(item){
			req.body.itemreq_id = item.id;
			req.body.userreq_id = user.id;
			Notification.create(req.body)
				.then(function(notification){
					res.send(notification);
				})
		}).catch(function(err) {
			console.log('\nERROR WRITING NOTIFICATION:\n', err);
			handleError(err, res);
		})
	})
}

controller.getByUser = function(req, res, next){
	var user = req.params.user;
	var results = [];
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
							  })
						  })
						})(i);	
					}
				}

				thisMustCompleteBeforeResponse();

			})
		})
	})
}
 

module.exports = controller;
