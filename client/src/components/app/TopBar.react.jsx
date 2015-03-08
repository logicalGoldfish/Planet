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


      // <div id="topbar" className="ui menu">
      //   <div className="item">
      //   </div>          
      // </div>
      // <i className="align justify icon large" onClick={this.props.toggleSideNavBar}></i>     

  render: function() {
    var imgStyle = {
      width: "22px",
      height: "22px",
      display: "inline-block",
    };

    var beeStyle = {
      display: "inline-block",
    };

    var topbarPadding = {
      padding: "0.5em"
    };

    var titleStyle = {
      paddingTop: "3px",
      fontFamily: 'Pacifico',
      fontSize: "18px"
    };

    return (
      <div style={topbarPadding} id="topbar" className="ui segment">
        <div className="alignleft">
          <img style={imgStyle} className="ui mini image" src="/dist/assets/hivebar.png" onClick={this.props.toggleSideNavBar}></img>
          <img style={beeStyle} className="ui tiny image" src="/dist/assets/bee_transparent.png"></img>
        </div>  
        <div>
          <span style={titleStyle} className="aligncenter">LenderBee</span>
        </div>
      </div>
    );
  }
});

module.exports = TopBar;