var React = require('react');
var Reflux = require('reflux');
var profileStore = require('../stores/profileStore.js');
var actions = require('../actions/actions.js');

var profile = React.createClass({

  //listens to profileStore
  mixins: [Reflux.connect(profileStore)],

  render: function(){
    return (
      <div>
        <img src="#" href="#" alt="user"/>
        <p>{this.state.userName}</p>
        <p>{this.state.userRating}</p>
        <p>{this.state.about}</p>
      </div>
    )
  }
});

module.exports = profile;
