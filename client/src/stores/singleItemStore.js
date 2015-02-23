var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/actions.js');

var singleItemStore = Reflux.createStore({

  data: {item: {}, lender: {}},

  //listens to actions
  listenables: [actions],

  onSelectItem: function(itemName, itemPrice, itemDescription, lenderId) {
   console.log('args', arguments);
   var that = this;
   this.data.item = {name: itemName, description:itemDescription, price: itemPrice, lender: lenderId};
   request("/api/users/" + "" + this.data.item.lender + "", function(res) {
    console.log('this is the lender', JSON.parse(res.text));
    var lenderInfo = JSON.parse(res.text);
    that.data.lender.username = lenderInfo.username;
    that.data.lender.firstname = lenderInfo.firstname;
    that.data.lender.lastname = lenderInfo.lastname;
    that.data.lender.reputation = lenderInfo.reputation;
    that.data.lender.city = lenderInfo.city;
    that.data.lender.state = lenderInfo.state;
    that.trigger(this.data);
   })
   
  }, 

  // currentItem: {
  //  //trigger(this.itemSelected);
  //  //component renders current item. 
  // },

  onItemRequestSubmitted: function() {
    //request DB to notify other user;
    console.log('item requested');
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