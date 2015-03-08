var React = require('react');
var Reflux = require('reflux');
var reviewStore = require('./../../stores/reviews.js');
var actions = require('./../../actions/actions.js');

var ReviewBox = React.createClass({
  //listens to messagingStore
  mixins: [Reflux.connect(reviewStore)],

  // TODO: How do we grab the index/rating from the rating component?
  handleSubmit: function(e) {
    e.preventDefault();

    // [Note] Checks to see if the user has selected a rating, won't submit form if they haven't
    if ( this.props.selectedRating ) {
      // [Refactor] Use Reacts native ref's method (avoid expensive DOM traversal)
      actions.reviewFormSubmitted(this.props.reviewId, $('#reviewBoxText').val(), this.props.selectedRating);
    } else {
      // [Refactor] Think of a better way of notifying the user
      alert('Please select a user rating');
    }
  },

  // <div>
  // <form className="reviewBox" onSubmit={this.handleSubmit}>
  //   <div className="form-group">
  //     <textarea className="form-control" id="reviewBoxText" rows="3" placeholder="Review Your Lender" name="review"></textarea>
  //   </div>
  //   <button type="submit" className="btn btn-warning" onClick={this.handleSubmit}>Submit</button>
  // </form>
  // </div>

  render: function(){
    //creates component for each message and loads them into the array messageGroup
    // var url = "/api/messages/samin"+ "/" + this.props.to + ""

    var backgroundColorBlue = {
       borderColor: "#FFD34E",
       backgroundColor: "rgba(254, 249, 233, 1)",
       width: "60%"
    }
    return (
      <div className="ui form">
        <div className="field">
          <textarea style={backgroundColorBlue} id="reviewBoxText" placeholder="Leave Review..."></textarea>
        </div> 
        <div className="ui left submit button" onClick={this.handleSubmit}>Submit</div>
      </div>   
    )
  }
});

module.exports = ReviewBox;
