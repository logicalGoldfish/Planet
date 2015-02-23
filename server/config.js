var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var users = require('./users/controller.js');
var items = require('./items/controller.js');
// var notifications = require('./notifications/controller.js');
var messages = require('./messages/controller.js');
var notifications= require('./notifications/controller.js');

module.exports = function(app, express){
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(logger('dev'));
	app.use(express.static(path.join(__dirname, '../client')));

	//route for the homepage
	app.get('/', function(req, res){
		res.render('../client/index.html')
	});

	//API routes for users (can amend as we decide what we need)
	app.post('/api/users/signup', users.create); //WORKS
	app.get('/api/users/:user', users.getOne); //WORKS - returns all info on a single user, regardless of borrower/lender


	//API routes for items (can amend as we decide what we need)
	app.post('/api/items/:user', items.create); //WORKS
	app.get('/api/items/:user', items.getOneByUser); //WORKS - let's talk more about this one. may not be the exact thing you need
	app.get('/api/items/:title', items.getAll); //WORKS


	//API routes for messages (can amend as we decide what we need)

	app.post('/api/messages/:borrower/:lender', messages.create); //WORKS
	app.get('/api/messages/:user', messages.getMessages); //WORKS


	//API routes for notifications (can amend as we decide what we need)
  //very serious mismatch between what i'm writing and what may be expected on front-end
	app.post('/api/notifications/:item/:borrower', notifications.create);
	// app.get('/api/notifications/:user', notifications.getOneByUser);
	 //WORKS - create notifications when borrower requests item
  // app.get('/api/notifications/:user/:item', notifications.getByUser);
};