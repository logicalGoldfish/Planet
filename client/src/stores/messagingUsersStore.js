var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/actions.js');
var userStore = require('./user.js');
var api       = require('../utils/url-paths');
var makeUrl   = require('make-url');

var messagingUsersStore = Reflux.createStore({

  data: {conversations: [], partners: [], partnerNames: [], partnerName: null, partnerId: null},

  //listens to actions
  listenables: [actions],

  onConversationCalled: function(partnerId, partnerName) {
    this.data.partnerName = partnerName;
    this.data.partnerId = partnerId;
    this.trigger(this.data);
  },

  onMessageFormSubmitted: function() {
    actions.fetchConversations();
  },

  //gets the item info from the database and sets the data to the item info
  onFetchConversations: function(){
    var that = this;
    var userId = userStore.getProp("id");
    var userName = userStore.getProp("username");
    request("/api/messages/" + userId + "", function(res) {
      that.data.conversations = JSON.parse(res.text);
      
      that.data.conversations.forEach(function(conversation) { 
        if (that.data.partnerNames.indexOf(conversation.to.username) === -1 && conversation.to.username !== "null" && conversation.to.username !== "undefined" && conversation.to.username !== userName) {
          that.data.partnerNames.push(conversation.to.username);
          that.data.partners.push(conversation.to);
        }
      });
      console.log('lES CONVERSIONES YO', that.data.conversations);
      that.trigger(that.data);
    });
  },

  //sets the state to the item data
  getInitialState: function(){
    return this.data;
  }

})

module.exports = messagingUsersStore;
