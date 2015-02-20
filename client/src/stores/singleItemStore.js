var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/actions.js');

var singleItemStore = Reflux.createStore({

  data: {item: {itemName: "hammer", itemDescription: "It's cool i guess", ownerName: "Bob", ownerRating: 0}},

  //listens to actions
  listenables: [actions],

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
    return this.data.item;
  }

})

module.exports = singleItemStore;