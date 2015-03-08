var React = require('react');
var Reflux = require('reflux');
var actions = require("./../../actions/actions.js");
var notificationStore = require("./../../stores/notificationsStore.js");

var Notification = React.createClass({

	// what information will be displayed in the notification?
	// img url for img tag
	// borrower name
	// item description
	mixins: [Reflux.connect(notificationStore)],

	handleAccept: function() {
		actions.itemRequestAccepted(this.props.borrowerId, this.props.itemId);
		// this.refs.notif.getDOMNode().remove();
	}, 

	handleDecline: function() {
	 actions.itemRequestDeclined(this.props.borrowerId, this.props.itemId);
		// this.refs.notif.getDOMNode().remove();
	},

	// <div ref="notif">
	// 	<p>{this.props.borrowerName} wants to borrow your {this.props.itemName}</p>
	// 	<button itemId={this.props.itemId} name={this.props.name} onClick={this.handleAccept}>Accept</button>
	// 	<button itemId={this.props.itemId} name={this.props.name} onClick={this.handleDecline}>Decline</button>
	// </div>

	render: function() {
		return (
			<div className="ui compact segment" ref="notif">
			  <img className="ui avatar image" src={this.props.fbpicture} /><p>{this.props.borrowerName} wants to borrow your {this.props.itemName + "   "}  </p>
			  <div className="positive ui toggle button" itemId={this.props.itemId} name={this.props.name} onClick={this.handleAccept}>Accept</div>
				<div className="negative ui toggle button" itemId={this.props.itemId} name={this.props.name} onClick={this.handleDecline}>Decline</div>
			</div>
		);
	}

});

module.exports = Notification;