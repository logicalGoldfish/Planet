var React = require('react');
var Reflux = require('reflux');
var actions = require('../actions/actions');
var navStore = require('../stores/navStore');

var TopBar = React.createClass({
  mixins: [Reflux.connect(navStore)],
  
  handleHamburgerClick: function(evt) {
      actions.clickHamburger();
      // actions.requestLentPage();
      actions.requestBorrowedPage();
  },

  handleProfileClick: function(evt) {
    actions.clickProfilePic();
  },

  render: function() {
    return (
        <div className="panel-body">
          <a href="#" className="glyphicon glyphicon-menu-hamburger" onClick={this.handleHamburgerClick}></a>
          <span>Welcome, {this.props.name}
          <a href="#" ><img className="profilePicture" src="../css/images/profilePlaceholder.png" onClick={this.handleProfileClick} /></a>
          </span>
        </div>
    );
  },

  _onSave: function(text) {

  }

});

module.exports = TopBar;