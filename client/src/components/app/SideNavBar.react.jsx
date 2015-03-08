var React 			= require('react');
var navStore 		= require('../../stores/navStore.js');
var userStore = require('../../stores/user.js');
var actions 	  = require('../../actions/actions.js');
var Reflux 			= require('reflux');
var Router			= require('react-router');
var Link 				= Router.Link;

var SideNavBarElement = React.createClass({

	render: function(){
		return (
				<Link to={this.props.to} onClick={this.props.toggleSideNavBar} >
				<p className="sideNavBarLink">
					{this.props.text}
				</p>
				</Link>
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
			// this.props.toggleSideNavBar();
			$(this.getDOMNode()).removeClass('slideInLeft').addClass('slideOutLeft');
		}
	},

	componentWillMount: function() {
		document.addEventListener('click', this.handleClick, false);
		// $('#sideNav').addClass('animated slideInRight');
	},

	componentDidMount: function() {
		$(this.getDOMNode()).addClass('animated slideInLeft');
	},

	componentWillUnmount: function() {
		document.removeEventListener('click', this.handleClick, false);
		// $('#sideNav').addClass('animated slideOutLeft');
	},

	render: function() {
		var pic = userStore.getProp('fbpicture');
		var name = userStore.getProp('username');
		return (
			<div className="sideNavBar panel panel-default" id="sideNav"onClick={this.handleClick}>
			<div className="sideNavBarProfile"><img className="ui avatar image" src={pic} /><a href="#">{name}</a></div>
				<div className="nav nav-pills nav-stacked">
					<SideNavBarElement text="Profile" to="profile" toggleSideNavBar={this.props.toggleSideNavBar}/>
					<SideNavBarElement text="Search" to="search" toggleSideNavBar={this.props.toggleSideNavBar}/>
					<SideNavBarElement text="Messages" to="messages" toggleSideNavBar={this.props.toggleSideNavBar}/>
					<SideNavBarElement text="Notifications" to="notifications" toggleSideNavBar={this.props.toggleSideNavBar} />
					<SideNavBarElement text="Reviews" to="reviews-pending" toggleSideNavBar={this.props.toggleSideNavBar}/>
					<SideNavBarElement text="Items" to="items" toggleSideNavBar={this.props.toggleSideNavBar}/>
					<SideNavBarElement text="Post An Item" to="postItem" toggleSideNavBar={this.props.toggleSideNavBar}/>
					<SideNavBarElement text="Log Out" to="logout" toggleSideNavBar={this.props.toggleSideNavBar}/>
				</div>
			</div>
		);
	}
});

module.exports = SideNavBar;