var bodyParser 			 = require('body-parser');
var logger 					 = require('morgan');
var path 						 = require('path');
var users 					 = require('./users/controller.js');
var items 					 = require('./items/controller.js');
// var notifications = require('./notifications/controller.js');
var messages 				 = require('./messages/controller.js');
var notifications		 = require('./notifications/controller.js');
var reviews 				 = require('./reviews/controller.js');

/* Facebook Auth */
var passport 				 = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session					 = require('express-session');
var cookieParser		 = require('cookie-parser');
var methodOverride 	 = require('method-override');
var fb 							 = require('./.ApiKeysFB.js');


module.exports = function(app, express){

	/*========================================
	=            Mount Middleware            =
	========================================*/

	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(logger('dev'));
	app.use(cookieParser());
	app.use(methodOverride()); // [Note] might not need this middleware, using per passport demo
	app.use(session({ secret: 'neitherBorrowerNorLenderBe' }))
	
	/* Initialize Passport */
	app.use(passport.initialize());
	app.use(passport.session());


	app.use(express.static(path.join(__dirname, '../client')));



	/*=====================================================
	=            Passport/Facebook Integration            =
	=====================================================*/
	passport.use(new FacebookStrategy({
			clientID: fb.FACEBOOK_APP_ID,
			clientSecret: fb.FACEBOOK_APP_SECRET,
			callbackURL: "http://localhost:3000/auth/facebook/callback"
		},
		function(accessToken, refreshToken, profile, done) {
			process.nextTick(function(){
				// you would want
	      // to associate the Facebook account with a user record in your database,
	      // and return that user instead.
				
				// [Note] This might need to be adjusted for our app
				return done(null, profile);      	
			});
		}
	));

	passport.serializeUser(function(user, done) {
	  // [Note] Dunno what needs to go here
	  done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
		// [Note] Dunno what needs to go here
	  done(null, obj);
	});

	

	/*==============================
	=            Routes            =
	==============================*/
		
	/* Static Routes */
		// res.sendFile(path.join(__dirname, '../client/index.html'));
	//route for the homepage
	// app.get('/', function(req, res){
	// 	res.render('../client/index.html')
	// });

	// app.get('/login', function(req, res){
	// 	res.send('../client/login.html')
	// });

	app.get('/login', function(req, res) {
	  res.sendFile(path.join(__dirname, '../client/login.html'));
	});

	// app.post('/auth/facebook', function(req, res){
	// 	console.log("response: ", req.body);
	// 	console.log("other rseldlponse: ", res.status);
	// 	if(req.body.status==='connected'){
	// 		//see if in database
	// 			//if not push info to database
	// 		//retrieve info from database
	// 		//redirect to index
	// 		//res.render('..client/index.html');
	// 	}else{
	// 		console.log('no bueno');
	// 		res.send({redirect: '/login'});
	// 	}
	// });

	// app.get('/', ensureAuthenticated, function(req, res){
	// 	// [Warning] Don't we want this to point to the dist folder? (for deployment)
	// 	// TODO: somehow we need to be able to send back the user data and note that it is attached to the request object
	// 	console.log('--------------------------- root route');
	// 	// res.render('../client/index.html', {user: req.user});
	// 	res.sendFile(path.join(__dirname, '../client/dist/index.html'));
	// });

	// app.get('/login', function(req, res){
	// 	console.log('attempts to render login page---------------');
	// 	// TODO: we want this to render an html with react components for logging in
	// 	// res.render('../client/login/index.html');
	// 	res.sendFile(path.join(__dirname, '../client/login/index.html'));
	// });

	app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
		function(req, res){
			/* redirect to root route if they are logged in */
			res.redirect('/');
		});

	app.get('/auth/facebook',
	  passport.authenticate('facebook'),
	  function(req, res){
	    // The request will be redirected to Facebook for authentication, so this
	    // function will not be called.
	  });

	function ensureAuthenticated(req, res, next) {
		console.log('ensureAuthenticated Called -------------');
  	if(req.isAuthenticated()) {return next();}
  	res.redirect('/login');
  };

	// [Note] Not sure how we will handle logging out yet...don't want a seperate static file
	// app.get('/logout', function(req, res){
	//   req.logout();
	//   res.redirect('/');
	// });



	//API routes for users (can amend as we decide what we need)
	app.post('/api/users/signup', function(req, res){
		console.log("lksadflkasdjf;lkasdjf;lasdkjFART",req.session.loc);
		req.body.loc = req.session.loc;
		users.create(req, res);
	}); //
	app.get('/api/users/test', users.testUser);
	app.get('/api/users/:userID', users.getOne); //WORKS - returns all info on a single user, regardless of borrower/lender. --takes in a user_id. not username
	app.post('/api/users/loc', function(req, res){
		console.log("THA REQUEST: ", req.body);
		req.session.loc = req.body;
		console.log("THA SESSION: ",req.session.loc);
		res.json("win");
	});

	//API routes for reviews
	app.post('/api/reviews/:user', reviews.create);
	app.get('/api/reviews/user/:user', reviews.getReviews);
	app.post('/api/reviews/users/:lender_id/:borrower_id', reviews.createPending); // [Note] Creates two reviews without rating/content for lender/borrower
	app.get('/api/reviews/:user', reviews.getPendingReviews);

	//API routes for items (can amend as we decide what we need)
	app.post('/api/items/:userId', items.create); //WORKS
	app.get('/api/items/city/:userId/:title', items.searchItemByCity); //WORKS
	app.put('/api/items/return/:itemsId', items.returnItem); //WORKS --itemsId is the id of the item being returned
	app.get('/api/items/user/:userId', items.getOneByUser); 
		
	//API routes for messages (can amend as we decide what we need)
	app.post('/api/messages/:fromId/:toId', messages.create); //WORKS
	app.get('/api/messages/:userId', messages.getMessages); //WORKS

	//API routes for notifications (can amend as we decide what we need)
  //very serious mismatch between what i'm writing and what may be expected on front-end
	app.post('/api/notifications/:item/:borrower', notifications.create);
	app.get('/api/notifications/:user', notifications.getByUser);
	app.delete('/api/notifications/accept/:item/:borrower', notifications.acceptRequest); //--> delete all notifications for an item
	app.delete('/api/notifications/reject/:borrower/:item', notifications.rejectRequest);		 //-->delete a notification for an item for a specific borrower

	// app.get('/api/notifications/:user', notifications.getOneByUser);
	 //WORKS - create notifications when borrower requests item
  // app.get('/api/notifications/:user/:item', notifications.getByUser);

  /*-----  End of Routes  ------*/
};