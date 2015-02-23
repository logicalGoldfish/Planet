var React = require('react');
var Reflux = require('reflux');
var messagingStore = require('./../../stores/messagingStore.js');
var Message = require('./message.react.jsx');
var MessageBox = require('./messageBox.react.jsx');
var actions = require('./../../actions/actions.js');

var Messaging = React.createClass({
  //listens to messagingStore
  mixins: [Reflux.connect(messagingStore)],

  handleSubmit: function() {
    actions.messageFormSubmitted();
  },

  render: function(){
    //creates component for each message and loads them into the array messageGroup
    var that = this;
    var messageGroup = this.state.messages.map(function(singleMessage) {
      return (<Message message={singleMessage.message} from={singleMessage.from} />);
    });
    return (
      <div>
        <p>Messaging userName</p>
        <div className="messageWindow">
          <ul>
            {messageGroup}
          </ul>
        </div>
        <MessageBox />
      </div>
    )
  }
});

module.exports = Messaging;
