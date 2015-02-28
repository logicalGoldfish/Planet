$(document).ready(function(){

	var React 			 = require('react');
	var Reflux       = require('reflux');
	
	/* Router Dependencies */
	var Router 			 = require('react-router');
	var Route  			 = Router.Route;
	var RouteHandler = Router.RouteHandler;
	var DefaultRoute = Router.DefaultRoute;

	var mainStore = require('./stores/mainStore.js');
	var actions = require('./actions/actions.js');
	
	/* Components */
	var Search 			 				= require('./components/search/Search.react.jsx');
	var Profile 		 				= require('./components/profile/Profile.react.jsx');
	var TopBar			 				= require('./components/app/TopBar.react.jsx');
	var SideNavBar	 				= require('./components/app/sideNavBar.react.jsx');
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

	/* Defines Top Level App Component */
	var APP = React.createClass({

		// NavBar is initially hidden
		getInitialState: function() {
			return {
				showSideNavBar: false 
			};
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

		logOut: function(){
			FB.logout(function(response) {
			document.location.href = "/login";
			    // Person is now logged out
			});
		},

		render: function(){
			return (
					<div>
						<input type="button" onClick={this.logOut} href="/login" value="Log out"/>
						<TopBar toggleSideNavBar={this.toggleSideNavBar}/>
						{this.state.showSideNavBar ? this.renderSideNavBar() : null}
						<RouteHandler/>
					</div>
				);
		}
	});

	var Main = React.createClass({
		mixins: [Reflux.connect(mainStore)],

		componentWillMount: function(){

		},
		render: function(){
			// var state = <Login />;
			// FB.getLoginStatus(function(response) {
			//   if (response.status === 'connected') {
			//   	console.log("butt");
			//     //var state = <APP />;
			//   }
			// });
			if(!this.state.loggedIn){		
				if(true){ //if user is logged in	
			  	actions.loginToggle(true);
				} 
			}
			return (
				<div>{this.state.loggedIn ? <APP /> : <Login />}</div>
				)
		}
	});

	/*<Route name="items-borrowed" path="user/user_id/items-borrowed" handler={Borrowed}/>*/
	/*<Route name="items-lent" path="user/user_id/items-lent" handler={Lent}/>*/
	/*<Route name="history" path="/history" handler={History}/>*/

	var routes = (
	    <Route name="app" path="/" handler={Main}>
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
	  </Route>
	);

	Router.run(routes, function (Handler) {
  	React.render(<Handler/>, document.getElementById('main'));
	});

});
