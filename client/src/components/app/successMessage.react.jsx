var React = require('react');
var Reflux = require('reflux');

var PostPage = React.createClass({

  handleClose: function() {
    $('#successMessage').removeClass("success");
  },

  render: function() {
    return (
    <div id="successMessageContainer">
    <div ref="successMsg" id="successMessage">
     <div className="ui positive message">
       <i className="close icon" onClick={this.handleClose}></i>
       <div className="header">
         {this.props.message + "  "}
       </div>
     </div>
     </div>
     </div>
    );
  },

  _onChange: function() {
  }

});

module.exports = PostPage;
