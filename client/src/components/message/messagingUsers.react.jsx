var React = require('react');
var Reflux = require('reflux');
var messagingUsersStore = require('./../../stores/messagingUsersStore.js');
var actions = require('./../../actions/actions.js');
var Router = require('react-router');
var Link = Router.Link;

var User = React.createClass({
  propTypes: {
    userInfo: React.PropTypes.object
  },

  handleClick: function() {
    actions.conversationCalled(this.props.partnerId, this.props.partnerName);
  },
  
  render: function(){
    return (
        <div>
        <Link to="messageUser" partnerName={this.props.partnerName} partnerId={this.props.partnerId} >
        <div className="ui teal button" onClick={this.handleClick}>{this.props.partnerName}</div>
        </Link>
        </div>
        //onClick, call handler with this.props.partner
        //on store, save state's current user as partner. 
        //trigger current user.
      )
  }
});

var MessagingUsers = React.createClass({

  //listens to messagingUsersStore
  mixins: [Reflux.connect(messagingUsersStore)],

  componentDidMount: function() {
    actions.fetchConversations();
  },

  render: function(){
    //creates component for each review and loads them into the array reviewGroup
    // var messagedUsers = this.state.conversations.map(function(conversation) {
    //  return (<User message={conversation.message} partnerName={conversation.to.username} partnerId={conversation.to.id}/>);
    // });

    var partners = this.state.partners.map(function(partner) {
      return (<User partnerId={partner.id} partnerName={partner.username}/>);
    });

    return (
      <div>
        <div className="ui center aligned segment">
          <h2 className="ui horizontal header divider">Messages</h2>
          </div>
        {partners}
      </div>
    )
  }
});

module.exports = MessagingUsers;
