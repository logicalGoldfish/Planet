var React       = require('react');
var Reflux      = require('reflux');
var reviewStore = require('../../stores/reviewStore.js');
var actions     = require('../../actions/actions.js');
var Router      = require('react-router');
var ReviewBox   = require('./reviewBox.react.jsx');
var Rating      = require('./rating.react.jsx');
var SuccessMessage = require('../app/successMessage.react.jsx');

var review = React.createClass({

  mixins: [Router.Navigation],
  
  selectRating: function(rating){
    this.setState({
      selectedRating: rating 
    });
  },


  getInitialState: function() {
    return {
      selectedRating: null 
    };
  },

  // <div className="pendingReviewDiv">
  //   <Rating data={this.props.review} selectRating={this.selectRating} selectedRating={this.state.selectedRating}/> {/* We pass the select rating function to the Rating Component */}
  //   {/* <img href={this.props.review.reviewee.imgurl}> */}
  //   <p>{firstName + " " + lastName}</p>
  //   <img src={this.props.review.reviewee.fbpicture} />
  //   <p>{this.props.review.item.title}</p>
    
  //   {/* We pass the selectedRating to the ReviewBox as a property so its avail on the submit event  */}
  //   <ReviewBox reviewId={this.props.review.id} selectedRating={this.state.selectedRating}/>
  // </div>
  // 
  
  // <div className="ui vertical segment">
  //   <img className="ui tiny circular image" src={fbpic}></img>
  //   <Rating data={this.props.review} selectRating={this.selectRating} selectedRating={this.state.selectedRating}/>
  //   <div>
      // <i className="user icon"></i>
      // <span>{firstName + lastName}</span>
  //   </div>
  //   <div>
  //     <i className="gift icon"></i>
  //     {this.props.review.item.title}
  //   </div>
  //   <ReviewBox reviewId={this.props.review.id} selectedRating={this.state.selectedRating}/>
  // </div>


  // [Note] We pass the review as this.props.data to the Rating component
  render: function() {

    var firstName = this.props.review.reviewee.firstname;
    var lastName  = this.props.review.reviewee.lastname;
    firstName[0]  = firstName[0].toUpperCase();
    lastName[0]   = lastName[0].toUpperCase();
    var fbpic = this.props.review.reviewee.fbpicture;
    // console.log('props from reviews', this.props);
    return (
      <div>
      <SuccessMessage message="Thanks for Reviewing!  " />
      <div className="ui vertical segment">
        <img className="ui small centered circular bordered image" src={fbpic} />
        <i className="user icon"></i>
        <span>{firstName + lastName}</span>
        <div>
          <i className="tag icon"></i>
          {this.props.review.item.title}
        </div>
        <Rating data={this.props.review} selectRating={this.selectRating} selectedRating={this.state.selectedRating}/>
        <ReviewBox reviewId={this.props.review.id} selectedRating={this.state.selectedRating}/>
      </div> 
      </div>
    )
  }
});

module.exports = review;