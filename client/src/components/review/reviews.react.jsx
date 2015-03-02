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
		console.log('review componts calls fetchPendingReviews before mount');
		actions.fetchPendingReviews();		
	},

	getInitialState: function() {
		return {};
	},

	// [Note] We need to be rendering the pendingReviews, not the reviews for the current user
	render: function() {
		var pendingReviews;
		console.log('review components state', this.state);
		if (this.state.pendingReviews) {
			// [Bug] When there are no pending reviews, this lookup fails and throws an error
			pendingReviews = this.state.pendingReviews.map(function(review, index){
				return <Review review={review} />
			});
		}
		return (
			<div>
				<h1>MY PENDING REVIEWS</h1>
				{pendingReviews}
			</div>
		);
	}

});

module.exports = Reviews;