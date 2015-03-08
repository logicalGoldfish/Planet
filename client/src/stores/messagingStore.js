var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/actions.js');
var userStore = require('./user.js');
var api       = require('../utils/url-paths');
var makeUrl   = require('make-url');

var messagingStore = Reflux.createStore({

  data: {messages: [], lenderId: null, userId: null, userName: null, lenderName: null},

  //listens to actions
  listenables: [actions],

  onLenderMessaged: function(lenderId) {
    var userId = userStore.getProp("id");
    this.data.userId = userId;
    this.data.lenderId = lenderId;
    this.trigger(this.data);
    var that = this;
    request("/api/messages/" + userId + "", function(res) {
      that.data.messages = JSON.parse(res.text).filter(function(message) { 
        return ((message.to_id === userId || message.from_id === userId) && (message.from_id === lenderId || message.to_id === lenderId)) 
        });
        that.trigger(that.data);
    });
    request("/api/users/" + userId + "", function(res) {
      that.data.userName = JSON.parse(res.text).username;
      that.data.fbpic = JSON.parse(res.text).fbpicture;
      that.trigger(that.data);
    });
    request("/api/users/" + lenderId + "", function(res) {
      that.data.lenderName = JSON.parse(res.text).username;
      that.trigger(that.data);
    });
  },

  onMessageFormSubmitted: function(message, recipient) {
  var userId = userStore.getProp("id");
    var that = this;
      request
            .post("/api/messages/"+ userId + "/" + recipient + "")
            .send({'message': message})
            .end(function(err, res) {
              // if (err) {
              //   console.log("send message error", err);
              // }
              // else {
                $('#messageBoxText').val("");
                actions.lenderMessaged(recipient);
              // }

            });
  },
  

  //gets the item info from the database and sets the data to the item info
  init: function(){
  },

  //sets the state to the item data
  getInitialState: function(){
    return this.data;
  }

})

module.exports = messagingStore;
