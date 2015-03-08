var React 	= require('react');
var Reflux 	= require('reflux');
var actions = require('../actions/actions.js');
var makeUrl = require('make-url');
var api 		= require('../utils/url-paths');
var request = require('superagent');

var userStore = Reflux.createStore({
	listenables: [actions],

	data: {},

	  // "id": 1,
	  // "fbid": "10100142512325989",
	  // "username": "Devin Otway",
	  // "firstname": "Devin",
	  // "lastname": "Otway",
	  // "fbprofile": "https://www.facebook.com/app_scoped_user_id/10100142512325989/",
	  // "rating": 0,
	  // "beebucks": 20,
	  // "city": "San Francisco",
	  // "state": "California",
	  // "street": "60 Rausch Street",
	  // "country": "USA",
	  // "zipcode": null,
	  // "fbpicture": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/v/t1.0-1/s200x200/10299096_920941902919_2601413335839246066_n.jpg?oh=d84be81325ef4dcc58166902813efe01&oe=557D7078&__gda__=1434617394_8d24dde889280975ed645fcb3ee1e515",
	  // "createdAt": "2015-02-28T02:23:15.000Z",
	  // "updatedAt": "2015-02-28T02:23:15.000Z"

	// init: function(){
	// 	// TODO: Listen to actions called form APP component for initializing the app and fetching initual user data
	// 	this._fake_fetchUserData();
	// },

	// // TODO: Remove this when we actually fetching userData from server...I need this to propogate userdata to all stores on app load
	// _fake_fetchUserData: function(){
	// 	setTimeout(function(){
	// 		console.log('userStore triggering with', this.data);
	// 		this.trigger(this.data)
	// 	}.bind(this), 100)
	// },

	// TODO: Currently nothing is calling fetchUserData, we need to figure out where to trigger it (App Component?)
	// and also where to get the fbid (session/cookie?)

	// fetchUserData: function(){
	// 	// [Warning] this.data.city, is the this context correct?
	// 	request(makeUrl(api.user.fetchUserData, {fbid: this.data.fbid}), function(err, res){
	// 		if(err) {console.error('error fetching user data', err);}
	// 		else {
	// 			console.log(res.body);
	// 			this.data = res.body;
	// 			this.trigger(this.data);
	// 		}
	// 	}.bind(this));
	// },


	onMountUser: function(data){
		console.log('USER INFO ', this.data);
	  var url = "/api/users/init/" + data.id + "";
	  request.get(url, function(err, res){
	    if ( err ) {
	      console.err('error trying to get item information for user', err);
	    }
	    else {
	      actions.randomItems(res.body.id);
	      this.data = res.body;
	      // console.log('users userStore data', this.data);
	      this.trigger(this.data);
	      this.getProp('id');
	    }
	  }.bind(this));
	}, 

// 	fetchUserData: function(){
// 		// [Warning] this.data.city, is the this context correct?
// 		request(makeUrl(api.user.fetchUserData, {fbid: this.data.fbid}), function(err, res){
// 			if(err) {console.error('error fetching user data', err);}
// 			else {
// 				console.log('MATTS USER DATA HERE', res.body);
// 				this.data = res.body;
// 				this.trigger(this.data);
// 			}
// 		}.bind(this));
// 	},
	
	getProp: function(prop) {
		return this.data[prop] ? this.data[prop] : null;
	},

	getInitialState: function() {
		return this.data;
	}
});

module.exports = userStore;