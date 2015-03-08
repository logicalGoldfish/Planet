var React = require('react');
var Reflux = require('reflux');
var actions = require('../../actions/actions');
var searchStore = require('../../stores/searchStore');
var SearchResults = require('./SearchResults.react.jsx');
var Router = require("react-router");
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var searchBar = React.createClass({
 
 mixins: [Reflux.connect(searchStore), Router.Navigation],
 
 handleSubmit: function() {
  actions.searchSubmit($('#search-bar').val());
  console.log($('#searchBar').val());
  this.transitionTo('ResultsMap');
  //TODO: Connect to DB and display items
 },

 // <div className="input-group">
 //   <input type="text" className="form-control" placeholder="Search for..." id="searchBar" />
 //     <span className="input-group-btn">
 //       <button className="btn btn-warning" type="submit" onClick={this.handleSubmit}>Go!</button>
 //     </span>
 // </div>

  render: function() {
    return (
      <div className="ui fluid icon input searchBar">
        <input type="text" placeholder="Search..." id="search-bar"></input>
        <i className="circular search icon" onClick={this.handleSubmit}></i>
      </div>
    )
  }
});

module.exports = searchBar;






