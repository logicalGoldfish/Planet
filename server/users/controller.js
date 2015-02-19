var controller = {};
controller.create = function(req, res, next){
	console.log('inside users controller create');
	res.json({'hi':'hello'});
}

controller.signin = function(req, res, next){
	console.log('inside users controller sign in');
	res.json({'hi':'hello'});
}

controller.update = function(req, res, next){
	console.log('inside users controller update');
	res.json({'hi':'hello'});
}

controller.delete = function(req, res, next){
	console.log('inside users controller delete');
	res.json({'hi':'hello'});
}
module.exports = controller;