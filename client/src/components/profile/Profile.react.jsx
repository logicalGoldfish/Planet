var React         = require('react');
var Reflux        = require('reflux');
var profileStore  = require('../../stores/profileStore.js');
var actions       = require('../../actions/actions.js');
var Review        = require('../review/singleReview.react.jsx');
var UserStats     = require('./UserStats.jsx');
var Router        = require('react-router');
var Link          = Router.Link;

var Profile = React.createClass({

  // [Note] Whenever anything is triggered from profileStore, this.state will be set to state
  mixins: [Reflux.connect(profileStore, "data")],

  // [Bug] When you visit the profile before anything else, the state is this.state.data.reviews and doesn't have any pending review info
  componentWillMount: function() {
    if(!this.state.data.reviews) { // if there are no reviews on this components state property
      actions.fetchReviews(); // fetch the reviews from reviewStore
    }
  },

  render: function(){
    var allReviews;
    console.log('Profile Components State Before Rendering', this.state);
    if(this.state.data.reviews){
      //creates component for each review and loads them into the array reviewGroup
      allReviews = this.state.data.reviews.map(function(review) {
        // console.log('review', review);
        return (<Review review={review} />);
      });
    }
    return (
        <div className="ui center aligned segment">
          <UserStats data={this.state.data}/>
          <h2 className="ui horizontal header divider">
             Reviews
          </h2>
          {allReviews}
        </div>  
    )
  }
});

module.exports = Profile;