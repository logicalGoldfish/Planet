var React 						= require('react');
var Reflux 						= require('reflux');
var RatingStarStatic 	= require('../review/ratingStarStatic.react.jsx');


var UserStats = React.createClass({

	render: function() {
		var user = this.props.data.user;
		console.log('userStats for profile', user);
		var reviews = this.props.data.reviews;

		return (
			<div>
				<img className="ui small centered circular bordered image" src={user.fbpicture}></img>
				<RatingStarStatic className="profileRating" rating={user.rating} />
				<div>
					<i className="circular user icon"></i>
					<span>{user.username}</span>
				</div>
				<div>
					<i className="circular marker icon"></i>
					<span>{user.city}{", "}{user.state}</span>
				</div>
				<div>
					<i className="circular money icon"></i>
					<span>{user.beebucks}</span>
				</div>
			</div>
		);
	}

});

module.exports = UserStats;