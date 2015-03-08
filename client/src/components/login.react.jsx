var React = require('react');
var Reflux = require('reflux');
//var reviewStore = require('../stores/reviewStore.js');
var actions = require('../actions/actions.js');

var review = React.createClass({

  //listens to reviewStore
  //mixins: [Reflux.connect(reviewStore)],

  render: function(){
    return (
      <div>
        <p> login time </p>
        <div className="fb-login-button" data-max-rows="1" data-size="large" data-show-faces="false" data-auto-logout-link="false"></div>
      </div>
    )
  }
});

module.exports = review;
