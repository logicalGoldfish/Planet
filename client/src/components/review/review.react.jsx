var React = require('react');
var Reflux = require('reflux');
var reviewStore = require('../../stores/reviewStore.js');
var actions = require('../../actions/actions.js');

var review = React.createClass({

  //listens to reviewStore
  mixins: [Reflux.connect(reviewStore)],

  render: function(){
    console.log('why');
    return (
      <div>
        <p>{this.props.reviewInfo.userName}</p>
        <div>{this.props.reviewInfo.comments}</div>
      </div>
    )
  }
});

module.exports = review;
