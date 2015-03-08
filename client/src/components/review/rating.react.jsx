var React 			= require('react');
var RatingStar 	= require('./ratingStar.react.jsx');
var _						= require('lodash');

var rating = React.createClass({
	hoverStar: function(index){
		this.setState(_.extend(this.state, {
			hoverIndex: index
		}));
	},

	leaveStar: function(){
		var selectedRating = this.props.selectedRating;
		// [Note] If the user has not selected a rating yet
		if (!selectedRating) {
			this.setState(_.extend(this.state, {
				hoverIndex: -1
			}));
		} else {
			this.setState(_.extend(this.state, {
				hoverIndex: selectedRating
			}));
		}
	},

	setRating: function(event) {
		// [Note] sets the rating property equal to the index of the current star
		this.props.data.rating = this.props.index;
	},

	// [Note] This method passes the rating the user has selected to the top level review component which passes the value to the review box for the submit event
	selectRating: function(rating){
		this.props.selectRating(rating);
	},

	getInitialState: function() {
		return {
			// subject to change, but i think we need the star rating component to keep track of the reviewId so we know how to update
			// needs to be propogated by the singleReview component
			reviewId: this.props.data.id, 
			max: 5,
			hoverIndex: -1 
		};
	},

	render: function() {
		// console.log('rating component renders with state/props', this.state, this.props);
		var stars = [];
		for (var i = 1; i <= this.state.max; i++) {
			// TODO: We need to pass in the rating
			var fill 	= i <= this.props.data.max;
			var hover = i <= this.state.hoverIndex;
			// [Note] Each star will get passed this.props.data which will come from the review component
			// [Note] It will also get a boolean value for filler and hoverIndex and some event handlers that are passed from this component and update this components state
			stars.push(<RatingStar fill={fill} index={i} data={this.props.data} 
				hoverFill={hover} hover={this.hoverStar} leave={this.leaveStar} selectRating={this.selectRating} />);
		}
		// console.log(stars);
		return (
			<div className="rating">
				{stars}
			</div>
		);
	}

});

module.exports = rating;