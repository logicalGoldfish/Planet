var React = require('react');
var Reflux = require('reflux');
var messageStore = require('./../../stores/messageStore.js');
var actions = require('./../../actions/actions.js');

var message = React.createClass({

  //listens to messageStore

  render: function(){
    return (
      <div>
        <p>{this.props.from + ":"}{this.props.message}</p>
      </div>
    )
  }
});

module.exports = message;
