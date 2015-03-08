var db = require('../db/db.js');
var User = global.db.User;
var Item = global.db.Item;
var Message = global.db.Message;

var controller = {};
controller.create = function(req, res, next){
	var newUser = {};
	newUser.fbid = req.body.id;
	newUser.username = req.body.name;
	newUser.firstname = req.body.first_name;
	newUser.lastname = req.body.last_name;
	newUser.fbprofile = req.body.link;
	newUser.fbpicture = req.body.picinfo;
	if (req.body.loc!==undefined) {
		newUser.city = req.body.loc.city;
		newUser.state = req.body.loc.state;
		newUser.zipcode = req.body.loc.zip;
		newUser.street = req.body.loc.address;
		newUser.country = req.body.loc.country;
	}

	User.find({
		where: {
			fbid: newUser.fbid
		}
	}).then(function(user){
		if(!user){
			User.create(newUser).then(function(user){
				res.send(user);
			})
		}
		else{
			if(req.body.loc!==undefined){
				user.updateAttributes({
					fbpicture: newUser.fbpicture,
					city: newUser.city,
					state: newUser.state,
					street: newUser.street,
					country: newUser.country,
					zipcode: newUser.zipcode
				}).then(function(user){
					res.send(user);
				})
			}else{			
				user.updateAttributes({
					fbpicture: newUser.fbpicture
				}).then(function(user){
					res.send(user);
				})
			}
		}
	})
}

controller.getOne = function(req, res, next){
	var userId = req.params.userId;
	User.find({
		where: {
			id: userId
		}
	}).then(function(user){
			res.json(user);
		}).catch(function(error){
			console.log('error', error);
			res.status(500).json({error: 'user.getOne error'});
	})
}

controller.init = function(req, res, next){
	var userId = req.params.userID;
	User.find({
		where: {
			fbid: userId
		}
	}).then(function(user){
			res.json(user);
		}).catch(function(error){
			console.log('error', error);
	})
}

controller.testUser = function(req, res, next){
	User.find({
		where: {
			fbid: req.query.authResponse.userID
		}
	}).then(function(user){
		if(user){		
			if(user.city){
				res.json("inside");
			}
		}
		res.json("outside");
	})
	//res.json("outside");
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