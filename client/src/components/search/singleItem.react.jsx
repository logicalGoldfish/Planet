var React = require('react');
var Reflux = require('reflux');
var singleItemStore = require('./../../stores/singleItemStore.js');
var SuccessMessage = require('../app/successMessage.react.jsx');
var actions = require('./../../actions/actions.js');
var Messaging = require('../message/messaging.react.jsx');
var userStore   = require('./../../stores/user.js');
var RatingStarStatic  = require('../review/ratingStarStatic.react.jsx');
var Router = require('react-router');

var singleItem = React.createClass({
  //listens to singleItemStore
  mixins: [Reflux.connect(singleItemStore), Router.Navigation],

  componentDidMount: function() {
  },

  handleItemRequest: function() {
    var userId = userStore.getProp('id');
    actions.itemRequestSubmitted(this.state.item.id, userId);
  },

  handleMessageLender: function() {
    actions.lenderMessaged(this.state.lender.id);
     this.transitionTo('Messaging');
  },

  // <div>
  //   <div className="singleItemComponent">
  //   <img className="singleItemPic" src={this.state.item.imageurl} alt="item"/>
  //   <p>Item: {this.state.item.title}</p>
  //   <p>Description: {this.state.item.description}</p>
  //   <p>BeeBucks: {this.state.item.beebucks}</p>
  //   <span>Lender: {this.state.lender.username+ " "}</span>
  //   <div><img src={this.state.lender.fbpicture} className="singleItemFBPicDiv"/></div>
  //   <div className="ui teal button" name="messageLender" onClick={this.handleMessageLender}><div className="column"><i Name="mail outline icon"></i></div>Message</div>
  //   <div className="ui yellow button" name="requestItem" onClick={this.handleItemRequest}>Request</div>
  //   </div>
  // </div>

  render: function(){
    return (
      <div>
      <SuccessMessage message="Item Requested!  "/>
      <div className="ui grid">
        <div className="sixteen wide column">
            <img className="ui medium image singleItem" src={this.state.item.imageurl} alt="item" />
              <div className="ui compact segment"><i className="fa fa-quote-left"></i><span>{"  " + this.state.item.description}</span></div>
              <i className="fa fa-money"/><span>{" " + this.state.item.beebucks}</span>
              <h3 className="ui header">Lender: {this.state.lender.username+ " "}</h3>
              <RatingStarStatic className="profileRating" rating={this.state.lender.rating} />
                <div><img src={this.state.lender.fbpicture} className="singleItemFBPicDiv"/></div>
                <div className="ui teal button" name="messageLender" onClick={this.handleMessageLender}>Message</div>
                <div className="ui yellow button" name="requestItem" onClick={this.handleItemRequest}>Request</div>
        </div>
      </div>
      </div>
    )
  }
});

module.exports = singleItem;
