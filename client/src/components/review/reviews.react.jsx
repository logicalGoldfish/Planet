var React 				= require('react');
var Reflux 				= require('reflux');
var actions 			= require('../../actions/actions.js');
var reviewsStore 	= require('../../stores/reviews.js');
var Review 				= require('./review.react.jsx');

var Reviews = React.createClass({	
	// [Tip] This mixin will automatically listen for triggers form the reviewStore
	// and will set the components state to this.state.reviews with the data from the store's trigger 
	mixins: [Reflux.connect(reviewsStore)],

	componentWillMount: function() {
		// console.log('review componts calls fetchPendingReviews before mount');
		actions.fetchPendingReviews();		
	},

	getInitialState: function() {
		return {};
	},

	// [Note] We need to be rendering the pendingReviews, not the reviews for the current user
	render: function() {
		var pendingReviews;
		console.log('review components state', this.state.pendingReviews);
		if (this.state.pendingReviews !== null) {
			// [Bug] When there are no pending reviews, this lookup fails and throws an error
			var pendingReviews = this.state.pendingReviews.map(function(review){
				return <Review review={review} />
			});
		}
		return (
			<div className="ui center aligned segment">
				{pendingReviews}
			</div>
		);
	}

});

module.exports = Reviews;