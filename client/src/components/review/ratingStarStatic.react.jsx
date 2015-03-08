var React = require('react');

var ratingStarStatic = React.createClass({

	render: function() {
		var rating 	= this.props.rating;
		var Stars 	= [];
		// [Warning] Not sure if I need to create an explicity react component in order to call this <Star/>
		// var Star 		=	<i></i>;
		for (var i = 1; i <= 5; i++) {
			if ( i <= rating ) {
				Stars.push((<a><i className="fa fa-star rating-highlight" index={i}></i></a>));
			} else {
				Stars.push((<a><i className="fa fa-star-o rating-normal" index={i}></i></a>));
			}
		}

		return (
			<div className="rating">
				{Stars}
			</div>
		);
	}

});

module.exports = ratingStarStatic;

