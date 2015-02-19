$(document).ready(function() {
  var React = require('react');
  var HomePage = require('./components/homePage.react.jsx');

  React.render(<HomePage />, document.getElementById('main'));

});