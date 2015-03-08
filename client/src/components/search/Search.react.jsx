var React = require('react');

/* Shared App Level Component(s) */
var TopBar = require('../app/TopBar.react.jsx');
/* Sub-components for Search Component  */
var SearchBar = require('./SearchBar.react.jsx');
var Carousel = require('./Carousel.react.jsx');
var SearchResults = require('./SearchResults.react.jsx');
var PostPage = require('../postPage.react.jsx');
var SingleItem = require('./singleItem.react.jsx');
var SuccessMessage = require('../app/successMessage.react.jsx');
var Router = require('react-router')
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Search = React.createClass({

  render: function() {
    return (
      <div>
        <SearchBar />
        <RouteHandler />
        <Carousel />
      </div>
    );
  }
});

module.exports = Search;