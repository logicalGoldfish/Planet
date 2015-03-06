var React 						= require('react');
var Reflux 						= require('reflux');
var RatingStarStatic 	= require('../review/ratingStarStatic.react.jsx');


var UserStats = React.createClass({
	// [Note] pass props from profile component to user Stats component
	// this.props.data
	render: function() {
		var user = this.props.data.user;
		console.log('userStats for profile', user);
		var reviews = this.props.data.reviews;
		return (
			<div className="userStats">
				<h1 className="lenderProfileInfo"></h1>
				<p className="userStatsName">{user.username}</p>
				<div className="profileFBPicDiv"><img src={user.fbpicture} className="circle-image"></img></div>
				<RatingStarStatic className="profileRating" rating={user.rating} />
				<p>{user.city}{", "}{user.state}</p>
				{/*<p>{user.state}</p>*/}
				<i className="fa fa-money"></i><span>{user.beebucks}</span>
			</div>
		);
	}

});

module.exports = UserStats;