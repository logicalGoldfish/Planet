var React 			= require('react');
var navStore 		= require('../../stores/navStore.js');
var actions 	  = require('../../actions/actions.js');
var Reflux 			= require('reflux');

var Router			= require('react-router');
var Link 				= Router.Link;

var SideNavBarElement = React.createClass({
	render: function(){
		return (
				<li><Link to={this.props.to}>{this.props.text}</Link></li>
			);
	}
});

var SideNavBar = React.createClass({
	mixins: [Reflux.connect(navStore)],

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
					<SideNavBarElement text="SEARCH" to="search"/>
					<SideNavBarElement text="PROFILE" to="profile"/>
					{/*<SideNavBarElement text="ITEMS LENT" to="items_lent"/>*/}
					{/*<SideNavBarElement text="ITEMS BORROWED" to="items_borrowed"/>*/}
					{/*<SideNavBarElement text="HISTORY" to="history"/>*/}
					<SideNavBarElement text="NOTIFICATIONS" to="notifications"/>
				</ul>
			</div>
		);
	}
});

module.exports = SideNavBar;