var Router 	= require('react-router');
var APP    	= require('../components/app.jsx');
var Profile = require('../components/profile/profile.jsx');
var searchResults = require('../components/search/searchResults.jsx');
var Route  	= Router.Route;
/*var DefaultRoute = Router.DefaultRoute;*/
/*var Link = Router.Link;*/
/*var RouteHandler = Router.RouteHandler;*/

/**
* Routes
* Profile
* Items Borrowed
* Items Lent
* History
* Search
* Notifications 
**/

var routes = (
  <Route name="search" path="/" handler={APP}>
  	<Route name="profile" path="/user/user_id/profile" handler={Profile}/>
    <Route name="searchResults" path="/user/user_id/searchResults" handler={SearchResults}/>
  	{/*<Route name="items-borrowed" path="user/user_id/items-borrowed" handler={Borrowed}/>*/}
  	{/*<Route name="items-lent" path="user/user_id/items-lent" handler={Lent}/>*/}
  	{/*<Route name="history" path="user/user_id/history" handler={History}/>*/}
  	{/*<Route name="notifications" path="user/user_id/notifications" handler={notifications}/>*/}
  </Route>
);

module.exports = routes;
