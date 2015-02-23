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
  "lenderMessaged",
  "borrowedItemReturned",
  "itemRequestSubmitted",
  "messageFormSubmitted"
]);

module.exports = actions;

