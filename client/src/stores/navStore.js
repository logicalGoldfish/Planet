var actions = require('../actions/actions');
var Reflux = require('reflux');

var navStore = Reflux.createStore({
  // listen for actions
  listenables: [actions],

  // initialize the showSideBar state to false
  showSideBar: false,

  // Handler for Profile Pic Click
  onClickProfilePic: function() {
    console.log('Profile Clicked');
  },

  // Handler for SideNav Click
  onToggleSideNav: function() {
    console.log('side-nav clicked');
    this.showSideBar = !this.showSideBar;
    $('#sideNav').addClass('animated slideInRight');
    this.trigger({showSideBar: this.showSideBar});
  },

  // Set the initial state based on initialized value for showSideBar
  getInitialState: function(){
    return {
      showSideBar: this.showSideBar
    }
  }
});

module.exports = navStore;
