var React = require('react');
var Reflux = require('reflux');
var singleItemStore = require('./../../stores/singleItemStore.js');
var actions = require('./../../actions/actions.js');
var Messaging = require('../message/messaging.react.jsx');

var singleItem = React.createClass({
  //listens to singleItemStore
  mixins: [Reflux.connect(singleItemStore)],

  handleItemRequest: function() {
    actions.itemRequestSubmitted();
  },

  handleMessageLender: function() {
    console.log('sending to following lender', this.state.item.lender);
    actions.lenderMessaged(this.state.item.lender, this.state.lender.username);
  },

  render: function(){
     console.log('THIS IS STATE', this.state)
    return (
      <div>
        <img src="#" href="#" alt="item"/>

        <p>Item: {this.state.item.name}</p>
        <p>Description: {this.state.item.description}</p>
        <p>Pollen Price: {this.state.item.price}</p>
        <span>Lender: {this.state.lender.username+ " "}</span>
        <span>{this.state.lender.firstname + " "}</span>
        <span>{this.state.lender.lastname + " "}</span>
        <span>Lender Community: {this.state.lender.city+ " " + this.state.lender.state}</span>
        <button name="messageLender" onClick={this.handleMessageLender}>Message Lender</button>
        <button name="requestItem" onClick={this.handleItemRequest}>Request Item</button>
        <Messaging />
      </div>
    )
  }
});

module.exports = singleItem;
