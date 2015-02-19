var controller = {};
controller.create = function(req, res, next){
	console.log('inside messages controller create');
	res.json({'hi':'hello'});
}

controller.read = function(req, res, next){
	console.log('inside messages controller sign in');
	res.json({'hi':'hello'});
}


module.exports = controller;
