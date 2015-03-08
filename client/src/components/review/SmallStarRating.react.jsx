var React = require('react');

var SmallStarRating = React.createClass({

	render: function() {
		var stars = [];

		var rating = this.props.rating;
		for (var i = 1; i <= rating; i++) {
			stars.push(<i className="ui tiny star icon"></i>)
		}
		return (
			<div>
				{stars}
			</div>
		);
	}

});

module.exports = SmallStarRating;