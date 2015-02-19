var controller = {};
controller.create = function(req, res, next) {
	console.log('inside items controller create (LATER DB)');
  res.json(req.body);
};

controller.read = function(req, res, next){
	console.log('inside items controller sign in');
  // console.log('this is REQ', req.body)
  res.json([{"name":"hammer", "Lender_id": 1, "Borrower_id": 3},{"name":"spoon", "Lender_id": 1, "Borrower_id": 4},{"name":"hammer", "Lender_id": 2, "Borrower_id": 3}]);
};

controller.update = function(req, res, next){
	console.log('inside items controller update');
	res.json({'hi':'hello'});
};

controller.delete = function(req, res, next){
	console.log('inside items controller delete');
	res.json({'hi':'hello'});
};

module.exports = controller;
