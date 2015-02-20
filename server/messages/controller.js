var db = require('../db/db.js');
var User = global.db.User;
var Item = global.db.Item;
var Message = global.db.Message;
var controller = {};

controller.create = function(req, res, next){
	console.log(req.body, 'req.body inside messages create controller');
	Message.create(req.body)
		.then(function(){
			console.log('inside the messages controller, ', message);
		})
}

controller.read = function(req, res, next){
	console.log('inside messages controller sign in');
	res.json({'hi':'hello'});
}


module.exports = controller;
