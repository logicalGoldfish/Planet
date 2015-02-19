var React = require('react');
var Reflux = require('reflux');
var profileStore = require('../../stores/profileStore.js');
var actions = require('../../actions/actions.js');

var Profile = React.createClass({

  componentWillMount: function() {
    alert('switching to profile view');
  },
  //listens to profileStore
  mixins: [Reflux.connect(profileStore)],

  render: function(){
    return (
      <div>
        <h1>This is the Profile View</h1>
        <img src="#" href="#" alt="user"/>
        <p>{this.state.userName}</p>
        <p>{this.state.userRating}</p>
        <p>{this.state.about}</p>
      </div>
    )
  }
});

module.exports = Profile;
