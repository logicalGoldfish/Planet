var React     = require('react');
var Reflux    = require('reflux');
var request   = require('superagent');
var actions   = require('../actions/actions.js');
var makeUrl   = require('make-url');
var api       = require('../utils/url-paths');
var userStore = require('./user.js');
var reviewStore = require('./reviews.js');
var _         = require('lodash');

var profileStore = Reflux.createStore({

  data: {
    user: null,
    reviews: null
  },

  listenables: [actions],

  // listens to the userStore and updates the user data in the profile store 
  init: function(){
    this.listenTo(userStore, this.updateUserData);
  },

  // [Note] listens for triggers from userStore and updates it's own state
  updateUserData: function(user){
    // console.log("profile store just updated its user data ", user);
    this.data.user = user;
    this.trigger(this.data);
  },

  onFetchReviews: function(){
    console.log('fetching reviews ');
    var userId = userStore.getProp('id');
    request.get(makeUrl(api.reviews.getReviews, {user: userId}), function(err, res){
      if(err) {console.error('error fetching reivew information', err);}
      else {
        this.data.reviews = _.filter(res.body, function(review){
          return review.review !== null;
        });

        this.trigger(this.data);
      }
    }.bind(this));
  },

  //sets the state to the item data
  // does this even do anything from the store???? dunno.....
  getInitialState: function(){
    return this.data;
  }

})

module.exports = profileStore;