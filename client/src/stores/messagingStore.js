var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/actions.js');

var messagingStore = Reflux.createStore({

  data: {messages: []},

  //listens to actions
  listenables: [actions],

  onLenderMessaged: function(lenderId, lenderUsername) {
//TODO: CREATE FIRST MESSAGE HERE, GRAB FORM. NAME FORM FIELD = MESSAGE;
    // request.post("/api/messages/samin" + "" + lenderId + "", function(res) {
    //   console.log('MESSAGES RECIEVED', res);
    // });
    this.data.lender = lenderUsername;
    var that = this;
    request("/api/messages/samin/", function(res) {
      
      that.data.messages = JSON.parse(res.text).filter(function(message) {
        return message.lender_id === lenderId || message.borrower_id === lenderId;
      });
        for (var i = 0; i < that.data.messages; i++) {
          var msg = that.data.messages[i];
            if (msg.lender_id === lenderId) {
              msg.from = lenderUsername;
              console.log('ADDING FROM HERE')
            } else {
              msg.from = 'You';
            }
        }
        console.log('DIS THE DATA', that.data);
        that.trigger(that.data);

    });
  },

  //gets the item info from the database and sets the data to the item info
  init: function(){
   //  request.get("/api/items/:user", function(res){
   //    console.log(res.body);
   //    this.data.item = res.body;
   //    this.trigger(this.data);
   // })
  },

  //sets the state to the item data
  getInitialState: function(){
    return this.data;
  }

})

module.exports = messagingStore;
