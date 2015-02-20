$(document).ready(function(){

	var React 			 = require('react');
	/* Router Dependencies */
	var Router 			 = require('react-router');
	var Route  			 = Router.Route;
	var RouteHandler = Router.RouteHandler;
	var DefaultRoute = Router.DefaultRoute;
	/* Components */
	var Search 			 = require('./components/search/Search.react.jsx');
	var Profile 		 = require('./components/profile/Profile.react.jsx');
	var TopBar			 = require('./components/app/TopBar.react.jsx');
	var SideNavBar	 = require('./components/app/sideNavBar.react.jsx');
	// var History      = require('./components/history/History.react.jsx');
	var Notifications = require('./components/notifications/Notifications.react.jsx');



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

	/*<Route name="items-borrowed" path="user/user_id/items-borrowed" handler={Borrowed}/>*/
	/*<Route name="items-lent" path="user/user_id/items-lent" handler={Lent}/>*/
	/*<Route name="history" path="/history" handler={History}/>*/

	var routes = (
	  <Route name="app" path="/" handler={APP}>
	  	<DefaultRoute name="search" handler={Search}/> /* This is the active route at path "/" */
	  	<Route name="profile" path="/profile" handler={Profile}/>
	  	<Route name="notifications" path="/notifications" handler={Notifications}/>
	  </Route>
	);

	Router.run(routes, function (Handler) {
  	React.render(<Handler/>, document.getElementById('main'));
	});

});
