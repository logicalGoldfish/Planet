var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/actions.js');

var reviewStore = Reflux.createStore({

  data: {item: {userName: "Bob", userRating: 0, about: "I am the best"}},

  propTypes: {
    reviewInfo: React.PropTypes.object
  },

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

module.exports = reviewStore;
