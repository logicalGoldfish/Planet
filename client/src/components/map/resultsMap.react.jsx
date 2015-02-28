var React = require('react');
var Reflux = require('reflux');
var mapStore = require('../../stores/map');
var actions = require('./../../actions/actions');
var SearchBar = require('../search/SearchBar.react.jsx');
var Map = require('./map.react.jsx');
var SearchBar = require('../search/SearchBar.react.jsx');
var SearchResults = require('../search/SearchResults.react.jsx');
var Router = require('react-router')
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var resultsMap = React.createClass({

  mixins: [Reflux.connect(mapStore), Router.Navigation],

  componentDidMount: function() {
  },

  showList: function() {
   this.transitionTo('SearchResults');
  },

  render: function() {

    return (
      <div>
      <div id="mapPanel">
        <button className="btn btn-warning" onClick={this.showList}>View as List</button>
      </div>
      <Map />
      </div>
    )
  }
});

module.exports = resultsMap;