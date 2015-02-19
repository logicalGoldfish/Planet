var TopBar = require('./topBar.react.jsx');
var SearchBar = require('./searchBar.react.jsx');
var Carousel = require('./carousel.react.jsx');
var SearchResults = require('./searchResults.react.jsx');
var PostPage = require('./postPage.react.jsx');
var LentPage = require('./lentPage.react.jsx');
var BorrowedPage = require('./borrowedPage.react.jsx');

var React = require('react');

var HomePage = React.createClass({

  // getInitialState: function() {
  //   return null;
  //   // return getTodoState();
  // },

  componentDidMount: function() {
    // HomePageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    // TodoStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <TopBar name="User" />
        <SearchBar />
        <Carousel />
        <SearchResults />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    // this.setState(getTodoState());
  }

});

module.exports = HomePage;