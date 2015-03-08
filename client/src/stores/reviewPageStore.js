/* [Deprecated] - this reviewPageStore is now stores/reviews.js*/
var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/actions.js');

var reviewPageStore = Reflux.createStore({

  data: {item: {userName: "Bob", userRating: 0, about: "I am the best"}, reviews: [{userName: "Bob", userRating: 5, comments: "it's cool"},{userName: "Bill", userRating: 3, comments: "it's bad"}]},

  //reviews: [{userName: "Bob", userRating: 5, comments: "The item was returned in good condition"}]

  //data: {reviews: {userName: "Bob", userRating: 5, reviewType: {type: "borrower", item: "drill"}, comments: "The item was returned in good condition"}, {userName: "Al", userRating: 3, reviewType: {type: "borrower", item: "hammer"}, comments: "The item was returned in ok condition"}},
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
    return this.data;
  }

})

module.exports = reviewPageStore;
