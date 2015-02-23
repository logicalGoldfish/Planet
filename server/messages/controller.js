var db = require('../db/db.js');
var User = global.db.User;
var Item = global.db.Item;
var Messages = global.db.Message;
var controller = {};
var Sequelize = require('sequelize');

controller.create = function(req, res, next){
	//req.body will have the message
	//req.params.user will be borrower_id
	//We have to query the borrower for its id because we only have its username
	//however, the lender_id is already associated with the item so we have that already.
	var lender = parseInt(req.params.lender);
	var borrower = req.params.borrower;
	req.body.lender_id = lender;
	console.log('lender and borrower ', lender, borrower);
	User.find({
		where: {
			username: borrower
		}
	}).then(function(user){
		console.log('user-id after querying for borrower ', user.id);
		req.body.borrower_id = user.id;
		Messages.create(req.body)
			.then(function(message){
				res.send(message);
			})
		})
}

controller.getMessages = function(req, res, next){
	//Again, we have to query the borrower for its id because we only have its username
	//the lender id is included with the item

	var user = req.params.user;
	User.find({
		where: {
			username: user
		}
	}).then(function(user){
		console.log('this is the user.id        ***********', user.id);
		Messages.findAll({
			where: Sequelize.or(
				{lender_id: user.id},
				{borrower_id: user.id}
			)
		}).then(function(messages){
			console.log(messages);
			res.send(messages);
		})
	})
}

// controller.getMessagesAsLender = function(req, res, next){
// 	//We have to query the lender for its id because we only have its username
// 	//the borrower_id is included with the item
// 	var lender = req.params.lender;
// 	User.find({
// 		where: {
// 			username: lender
// 		}
// 	}).then(function(user){
// 		console.log('user returned after ', user);
// 		Messages.findAll({
// 			where:
// 			{
// 				borrower_id: req.params.borrower,
// 				lender_id: user.id
// 			}
// 		}).then(function(messages){
// 			res.send(messages);
// 		})
// 	})
// }


module.exports = controller;
