var React 		= require('react');
var Reflux 		= require('reflux');
var actions 	= require('../actions/actions.js');
var request 	= require('superagent');
var makeUrl 	= require('make-url');
var api 			= require('../utils/url-paths');
var userStore 	= require('./user.js');

var notificationStore = Reflux.createStore({
	// might have to also connect this store to userstore to get the username/user_id info for get request
	listenables: [actions],
	data: {notifications: []},

	init: function(){

	},

	onGetNotifications: function(){
		var userId = userStore.getProp('id');
		request(makeUrl(api.notifications.getNotifications, {user: userId}), function(res) {
			console.log(res.body);
			this.data.notifications = res.body
			this.trigger(this.data);
		}.bind(this));
	},

	onItemRequestAccepted: function(borrower, item) {
		request.del("/api/notifications/accept/" + "" + item + "/" + borrower + "", function(res) {
			if (res.error) {
				console.log('[error] [notifications] error accepting notification: ', error)
			} else {
				console.log('[notification] Item has been borrowed');
				actions.getNotifications();
			}
		}.bind(this));
	},

	onItemRequestDeclined: function(borrower, item) {
		var that = this;
		request.del("/api/notifications/accept/" + "" + borrower + "/" + item + "", function(res) {
			if (res.error) {
				console.log('error occurred: ', error)
			} else {
				console.log('item is now borrowed');
				actions.getNotifications();
			}
		});
	},

	 getInitialState: function() {
        return this.data;
    }
});


module.exports = notificationStore;