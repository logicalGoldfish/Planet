var React 	= require('react');
var Reflux 	= require('reflux');

var UserStats = React.createClass({
	// [Note] pass props from profile component to user Stats component
	// this.props.data
	render: function() {
		var user = this.props.data.user;
		console.log('userStats for profile', user);
		var reviews = this.props.data.reviews;
		return (
			<div className="userStats">
				<img src={user.fbpicture}></img>
				<p>{user.username}</p>
				<p>{user.city}{", "}{user.state}</p>
				{/*<p>{user.state}</p>*/}
				<p>BeeBucks: {user.beebucks}</p>
			</div>
		);
	}

});

module.exports = UserStats;