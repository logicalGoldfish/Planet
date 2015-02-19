var React = require('react');
var Reflux = require('reflux');
var actions = require('../../actions/actions');
var navStore = require('../../stores/navStore');
var SideNavBar = require('./SideNavBar.react.jsx');
var Router = require('react-router');

var TopBar = React.createClass({
  mixins: [Reflux.connect(navStore)],
  
  handleSideNavClick: function(evt) {
    actions.toggleSideNav();
  },

  // handleProfileClick: function(evt) {
  //   actions.clickProfilePic();
  // },

  render: function() {
    // var _sideNavBar;
    // console.log('showSideBar', this.state.showSideBar);
    // if (this.state.showSideBar) {
    //   _sideNavBar = <SideNavBar/>;
    // }
    return (
        <div className="panel-body">
          {/*_sideNavBar*/}
          <a href="#" className="glyphicon glyphicon-menu-hamburger" onClick={this.props.toggleSideNavBar}></a>
          <span>Welcome, {this.props.name}
          <a href="#" ><img className="profilePicture" src="../css/images/profilePlaceholder.png" onClick={this.handleProfileClick} /></a>
          </span>
        </div>
    );
  }
});

module.exports = TopBar;