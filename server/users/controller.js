var db = require('../db/db.js');
var User = global.db.User;
var Item = global.db.Item;
var Message = global.db.Message;

var controller = {};
controller.create = function(req, res, next){
	console.log(req.body);
	var newUser = {};
	newUser.fbid = req.body.id;
	newUser.username = req.body.name;
	newUser.firstname = req.body.first_name;
	newUser.lastname = req.body.last_name;
	newUser.fbprofile = req.body.link;
	//extract fb data to create users with
	//fb name (first, last)
	Users.find({
		where: {
			fbid: newUser.id
		}
	}).then(function(user){
		if(!user){
			User.create(newUser).then(function(user){
				console.log(user);
			})
		}
		else{
			User.update(newUser).then(function(user){
				console.log(user);
			})
		}
	})
}

controller.getOne = function(req, res, next){
	var userId = req.params.user;
	console.log('userId  ', userId);
	User.find({
		where: {
			id: userId
		}
	}).then(function(user){
		res.json(user);
	}).catch(function(error){
		console.log('error inside the user controller getOne function ', error);
	})
}


// controller.signin = function(req, res, next){
// 	//sign in with fb
// 	//check users table for match and do routing
// }

// controller.update = function(req, res, next){
// }

// controller.delete = function(req, res, next){
// }
module.exports = controller;