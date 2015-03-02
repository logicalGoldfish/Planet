var React 			= require('react');
var navStore 		= require('../../stores/navStore.js');
var actions 	  = require('../../actions/actions.js');
var Reflux 			= require('reflux');
var Router			= require('react-router');
var Link 				= Router.Link;

var SideNavBarElement = React.createClass({

	render: function(){
		return (
				<li onClick={this.props.toggleSideNavBar}>
					<Link to={this.props.to}>{this.props.text}</Link>
				</li>
			);
	}
});

var SideNavBar = React.createClass({
	mixins: [Reflux.connect(navStore)],

	handleNotifications: function() {
		console.log('handling notification')
		actions.getNotifications();
	}, 

	handleClick: function(e) {
		// if the click occured outside the SideNavBar
		if (!this.getDOMNode().contains(e.target)) {
			// Hide the NavBar
			this.props.toggleSideNavBar();
		}
	},

	componentWillMount: function() {
		document.addEventListener('click', this.handleClick, false);
	},

	componentWillUnmount: function() {
		document.removeEventListener('click', this.handleClick, false);
	},

	render: function() {
		return (
			<div className="sideNavBar panel panel-default" onClick={this.handleClick}>
				<ul className="nav nav-pills nav-stacked">
					<SideNavBarElement text="PROFILE" to="profile" toggleSideNavBar={this.props.toggleSideNavBar}/>
					<SideNavBarElement text="SEARCH" to="search" toggleSideNavBar={this.props.toggleSideNavBar}/>
					<SideNavBarElement text="MESSAGES" to="messages" toggleSideNavBar={this.props.toggleSideNavBar}/>
					<SideNavBarElement text="NOTIFICATIONS" to="notifications" toggleSideNavBar={this.props.toggleSideNavBar} />
					<SideNavBarElement text="REVIEWS" to="reviews-pending" toggleSideNavBar={this.props.toggleSideNavBar}/>
					<SideNavBarElement text="ITEMS" to="items" toggleSideNavBar={this.props.toggleSideNavBar}/>
					<SideNavBarElement text="POST AN ITEM" to="postItem" toggleSideNavBar={this.props.toggleSideNavBar}/>
					<SideNavBarElement text="LOG OUT" to="logout" toggleSideNavBar={this.props.toggleSideNavBar}/>
				</ul>
			</div>
		);
	}
});

module.exports = SideNavBar;