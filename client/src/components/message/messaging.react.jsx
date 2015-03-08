var React = require('react');
var Reflux = require('reflux');
var messagingStore = require('./../../stores/messagingStore.js');
var Message = require('./message.react.jsx');
var MessageBox = require('./messageBox.react.jsx');
var actions = require('./../../actions/actions.js');

var Messaging = React.createClass({
  //listens to messagingStore
  mixins: [Reflux.connect(messagingStore)],

  // handleSubmit: function() {
  //   actions.messageFormSubmitted();
  // },

  render: function(){
    //creates component for each message and loads them into the array messageGroup
    var that = this;
    var messageGroup = this.state.messages.map(function(singleMessage) {
      return (<Message message={singleMessage.message} to={singleMessage.to_id} fromName={singleMessage.from.username} fbpicture={singleMessage.from.fbpicture}/>);
    });
    return (
      <div>
      <div className="ui minimal comments">
      <h3 className="ui dividing teal header">Messaging: {this.state.lenderName}</h3>
        <div className="messageWindow">
          {messageGroup}
        </div>
        <MessageBox to={this.state.lenderId} from={this.state.userId} />
      </div>
      </div>
    )
  }
});

module.exports = Messaging;
