var React = require('react');
var Reflux = require('reflux');
var actions = require('../../actions/actions');
var navStore = require('../../stores/navStore');
var SideNavBar = require('./SideNavBar.react.jsx');
var Router = require('react-router');
var Link = Router.Link;

var TopBar = React.createClass({
  mixins: [Reflux.connect(navStore)],
  
  handleSideNavClick: function(evt) {
    actions.toggleSideNav();
  },

  // handleProfileClick: function(evt) {
  //   actions.clickProfilePic();
  // },

  render: function() {

    return (
        <div className="panel-body">
          <div className="glyphicon glyphicon-menu-hamburger" onClick={this.props.toggleSideNavBar}></div>
          <span>Welcome, {this.props.name}
          <a href="#" ><Link to="profile"><img className="profilePicture" src="../css/images/profilePlaceholder.png" onClick={this.handleProfileClick} /></Link></a>
          </span>
        </div>
    );
  }
});

module.exports = TopBar;