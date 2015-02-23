var React = require('react');

/* Shared App Level Component(s) */
var TopBar = require('../app/TopBar.react.jsx');

/* Sub-components for Search Component  */
var SearchBar = require('./SearchBar.react.jsx');
var Carousel = require('./Carousel.react.jsx');
var SearchResults = require('./SearchResults.react.jsx');
var PostPage = require('../postPage.react.jsx');
var SingleItem = require('./singleItem.react.jsx');

var Search = React.createClass({

  render: function() {
    return (
      <div>
        <SearchBar />
        <Carousel />
        <SearchResults />
      </div>
    );
  }
});

module.exports = Search;