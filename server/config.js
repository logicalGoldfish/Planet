var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var users = require('./users/controller.js');
var items = require('./items/controller.js');
// var notifications = require('./notifications/controller.js');
var messages = require('./messages/controller.js');

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
	app.get('/api/users/:user', users.getOne); //WORKS


	//API routes for items (can amend as we decide what we need)
	app.post('/api/items/:user', items.create); //WORKS
	app.get('/api/items/:title', items.getAll); //WORKS
	app.get('/api/items/:user', items.getOneByUser); //WORKS


	//API routes for messages (can amend as we decide what we need)
	app.post('/api/messages/:borrower/:lender', messages.create); //WORKS
	app.get('/api/messages/:borrower/:lender', messages.getMessages);


	//API routes for notifications (can amend as we decide what we need)
	// app.get('/api/notifications/:user', notifications.getByUser);
};