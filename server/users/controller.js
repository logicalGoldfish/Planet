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
	if (req.body.loc!==undefined) {
		newUser.city = req.body.loc.city;
		newUser.state = req.body.loc.state;
		newUser.street = req.body.loc.address;
		newUser.country = req.body.loc.country;
	}
	newUser.fbpicture = req.body.picinfo;
	// fbid: DataTypes.STRING,
	// username: DataTypes.STRING,
	// firstname: DataTypes.STRING,
	// lastname: DataTypes.STRING,
	// fbprofile: DataTypes.STRING,
	// reputation: {type: DataTypes.INTEGER, defaultValue: 0},
	// reviews: {type: DataTypes.INTEGER, defaultValue: 0},
	// beebucks: {type: DataTypes.INTEGER, defaultValue: 20},
	// city: DataTypes.STRING,
	// state: DataTypes.STRING,
	// street: DataTypes.STRING,
	// country: DataTypes.STRING,
	// fbpicture: DataTypes.STRING
	//extract fb data to create users with
	//fb name (first, last)
	console.log(newUser);
	User.find({
		where: {
			fbid: newUser.fbid
		}
	}).then(function(user){
		console.log(user);
		if(!user){
			User.create(newUser).then(function(user){
				res.send(user);
			})
		}
		else{
			User.update(newUser).then(function(user){
				res.send(user);
			})
		}
	})
// 	User.create(req.body)
// 		.then(function(user){
// 		res.send(user);
// 	})
// // 	User.create(req.body)
// // 		.then(function(user){
// // 		res.send(user);
// // 	})
}

controller.getOne = function(req, res, next){
	var userId = req.params.userID;
	User.find({
		where: {
			id: userId
		}
	}).then(function(user){
			res.json(user);
		}).catch(function(error){
			console.log('error', error);
	})
}

controller.testUser = function(req, res, next){
	console.log("IT'S A TEST ", req.query.authResponse.userID);
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