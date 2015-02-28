var Reflux = require('reflux');

var actions = Reflux.createActions([
  "nextCarousel",
  "prevCarousel",
  "clickProfilePic", 
  "requestLentPage",
  "requestBorrowedPage",
  "toggleSideNav",
  "searchSubmit",
  "selectItem",
  "searchResComplete",
  "lenderMessaged",
  "borrowedItemReturned",
  "itemRequestSubmitted",
  "messageFormSubmitted",
  "loginToggle",
  "mapMounted",

  /* User Login/Bootstrap Functions */
  /* [Question] Several stores will be listening to these events and will kick off some server requests (Is that an antipattern?) */ 
  /* [Question] If several events are listening to initialize user, how do we ensure the order? (We need user store to load before items/messages/etc)*/
  "initializeUser",
  "authenticateUser",
  "conversationCalled",
  "itemRequestAccepted",
  "itemRequestDeclined",
  "getNotifications",
  "postFormSubmitted",
  /* Items API */
  "fetchItems",
  "returnItem",

  /* Notifications API */
  "acceptRequestToBorrow",
  "declineRequestToBorrow",
  "fetchNotifications",

  /* Reviews API */
  "fetchPendingReviews"
  
  


]);

module.exports = actions;
