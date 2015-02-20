var React = require('react');
var Reflux = require('reflux');
var reviewPageStore = require('../../stores/reviewPageStore.js');
var actions = require('../../actions/actions.js');
var Review = require('./review.react.jsx');

var ReviewPage = React.createClass({

  componentWillMount: function() {
    alert('switching to reviewPage view');
  },

  //listens to reviewPageStore
  mixins: [Reflux.connect(reviewPageStore)],

  render: function(){
    console.log(this.state.reviews);
    //creates component for each review and loads them into the array reviewGroup
     var reviewGroup = this.state.reviews.map(function(singleReview) {
      return (<div><Review reviewInfo={singleReview} /></div>);
     });
     console.log(reviewGroup);
    return (
      <div>
        <p>Reviews</p>
        <div>{reviewGroup}</div>
      </div>
    )
  }
});

module.exports = ReviewPage;
