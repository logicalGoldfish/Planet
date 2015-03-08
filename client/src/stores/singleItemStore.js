var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/actions.js');
var userStore   = require('./user.js');



var singleItemStore = Reflux.createStore({

  data: {item: {}, lender: {}},

  //listens to actions
  listenables: [actions],

  onSelectItem: function(item, lender) {
   this.data.item = item;
   this.data.lender= lender;
   this.trigger(this.data);
   
  }, 

  // currentItem: {
  //  //trigger(this.itemSelected);
  //  //component renders current item. 
  // },

  onItemRequestSubmitted: function(itemId, userId) {
    //request DB to notify other user;
    // console.log('item requested', "/api/notifications/" + "" + itemName + "/" + borrower + "");
    request.post("/api/notifications/" + "" + itemId + "/" + userId + "", function(res) {
      if (res.ok) {
        $('#successMessage').addClass("success");
        console.log('Request sent for item')
      } else {
        console.log('error!')
      }
    })
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

module.exports = singleItemStore;