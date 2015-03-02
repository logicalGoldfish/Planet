$(document).ready(function(){

	var React 			 = require('react');
	var Reflux       = require('reflux');
	
	/* Router Dependencies */
	var Router 			 = require('react-router');
	var Route  			 = Router.Route;
	var RouteHandler = Router.RouteHandler;
	var DefaultRoute = Router.DefaultRoute;

	var mainStore = require('./stores/mainStore.js');
	var user = require('./stores/user.js');
	var actions = require('./actions/actions.js');
	
	/* Components */
	var Search 			 				= require('./components/search/Search.react.jsx');
	var Profile 		 				= require('./components/profile/Profile.react.jsx');
	var TopBar			 				= require('./components/app/TopBar.react.jsx');
	var SideNavBar	 				= require('./components/app/sideNavBar.react.jsx');
	var Logout    	 				= require('./components/app/logout.react.jsx');
	var Notifications 			= require('./components/notifications/Notifications.react.jsx');
	var Messaging 					= require('./components/message/messagingUsers.react.jsx');
	var Message 						= require('./components/message/messaging.react.jsx');
	var ReviewPage 					= require('./components/review/reviewPage.react.jsx');
	var PostItem 						= require('./components/postPage.react.jsx');
	var Items 							= require('./components/items/items.jsx');
	// var Map									= require('./components/map/map.react.jsx');
	var SingleConversation 	= require('./components/message/SingleConversation.react.jsx');
	var SearchResults 			= require('./components/search/searchResults.react.jsx');
	var SingleItem 					= require('./components/search/singleItem.react.jsx');
	var Reviews 						= require('./components/review/reviews.react.jsx');
	var Login        			  = require('./components/login.react.jsx');
	var ResultsMap = require('./components/map/resultsMap.react.jsx');
	var SingleReview = require('./components/review/singleReview.react.jsx');

	/* Defines Top Level App Component */
	var APP = React.createClass({

		mixins: [Reflux.connect(user)],

		// NavBar is initially hidden
		getInitialState: function() {
			return {
				showSideNavBar: false 
			};
		},

		componentDidMount: function(){
			var socket = io.connect();
			console.log("SOCKET: ", socket);
			socket.on("userLoad", function(data){
				actions.mountUser(data);
				socket.disconnect(); 
			});

		},

		// toggles the state of the sideNavBar
		toggleSideNavBar: function(){
			this.setState({
				showSideNavBar: !this.state.showSideNavBar
			});
		},

		// renders <SideNavBar /> if showSideNavBar === true
		renderSideNavBar: function(){
			return <SideNavBar showSideNavBar={this.state.showSideNavBar} toggleSideNavBar={this.toggleSideNavBar}/>; 
		},

		render: function(){
			return (
					<div>
						<TopBar toggleSideNavBar={this.toggleSideNavBar}/>
						{this.state.showSideNavBar ? this.renderSideNavBar() : null}
						<RouteHandler/>
					</div>
				);
		}
	});

	// var Main = React.createClass({
	// 	mixins: [Reflux.connect(mainStore)],

	// 	componentWillMount: function(){

	// 	},

	// 	// componentDidMount: function(){
	// 	// 	var socket = io.connect();
	// 	// 	console.log("SOCKET: ", socket);
	// 	// 	socket.on("userLoad", function(data){
	// 	// 		console.log("ALMIGHTY DATA: ");
	// 	// 		console.log(data);
	// 	// 	});

	// 	// },

	// 	render: function(){
	// 		// var socket = io.connect();
	// 		// console.log("SOCKET: ", socket);
	// 		// socket.on("userLoad", function(data){
	// 		// 	console.log("ALMIGHTY DATA: ");
	// 		// 	console.log(data);
	// 		// });

	// 		// $.ajax({
	// 		//   type: "GET",
	// 		//   url: "/api/currentuser",
	// 		//   data: response,
	// 		//   dataType: 'json'
	// 		// });

	// 		// var state = <Login />;
	// 		// FB.getLoginStatus(function(response) {
	// 		//   if (response.status === 'connected') {
	// 		//   	console.log("butt");
	// 		//     //var state = <APP />;
	// 		//   }
	// 		// });
	// 		if(!this.state.loggedIn){		
	// 			if(true){ //if user is logged in	
	// 		  	actions.loginToggle(true);
	// 			} 
	// 		}
	// 		return (
	// 			<div>{this.state.loggedIn ? <APP /> : <Login />}</div>
	// 			)
	// 	}
	// });

	/*<Route name="items-borrowed" path="user/user_id/items-borrowed" handler={Borrowed}/>*/
	/*<Route name="items-lent" path="user/user_id/items-lent" handler={Lent}/>*/
	/*<Route name="history" path="/history" handler={History}/>*/

	var routes = (
	    <Route name="app" path="/" handler={APP}>
	  	<Route name="search" path="/" handler={Search} >
	  		<Route name="ResultsMap" path="/resultsMap" handler={ResultsMap}/>
	  	</Route>
	  	<Route name="SearchResults" path="/searchResults" handler={SearchResults}/>
	  	<Route name="profile" path="/profile" handler={Profile}/>
	  	<Route name="items" path="/items" handler={Items}/>
	  	<Route name="notifications" path="/notifications" handler={Notifications}/>
	  	<Route name="reviews-pending" path="/reviews-pending" handler={Reviews}/>
	  	<Route name="reviews" path="/reviews" handler={ReviewPage}/>
	  	<Route name="messages" path="/messages" handler={Messaging}/>
	  	<Route name="messageUser" path="/message" handler={SingleConversation}/>
	  	<Route name="postItem" path="/post" handler={PostItem}/>
	  	<Route name="SingleItem" path="/singleItem" handler={SingleItem}/>
	  	<Route name="Messaging" path="/messaging" handler={Message}/>
	  	<Route name="SingleReview" path="/singleReview" handler={SingleReview}/>
	  	<Route name="logout" path="/logout" handler={Logout}/>

	  </Route>
	);

	Router.run(routes, function (Handler) {
  	React.render(<Handler/>, document.getElementById('main'));
	});

});
