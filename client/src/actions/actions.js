var Reflux = require('reflux');

var actions = Reflux.createActions([
  "nextCarousel",
  "prevCarousel",
  "clickProfilePic", 
  "clickHamburger", 
  "searchSubmit",
  "requestLentPage",
  "requestBorrowedPage"
]);

module.exports = actions;

