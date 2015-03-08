/* API Endpoint Urls for easier referencing */

// var makeUrl = require('make-url');

var api = {};

api.user = {
	signup: '/api/users/signup',
	signin: '/api/users/signin', /* Is this what is going to fetch all the user data on app load */
	// update: '/api/users/:username',
	// delete: '/api/users/:username',
	fetchUserData: '/api/users/:user'
};

api.items = {
	create: '/api/items/:userId',
	search: '/api/items/:title',
	searchByCity: '/api/items/city/:userId/:title',
	fetch: '/api/items/user/:user',
	update: '/api/items/return/:itemsId'
};

api.messages = {
	create: '/api/messages/:user/:item',
	fetch: '/api/messages/:user/:item'
};

api.reviews = {
	getReviews: '/api/reviews/user/:user',
	fetchOutstandingReviews: '/api/reviews/:user',
	createPending: '/api/reviews/users/:lender_id/:borrower_id/:item_id',
	updateReview: '/api/reviews/:reviewId/update'
};

api.notifications = {
	getNotifications: '/api/notifications/:user'
};

module.exports = api;