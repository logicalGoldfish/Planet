var React = require('react');
var Reflux = require('reflux');
var actions = require('../../actions/actions');
var searchStore = require('../../stores/searchStore');
var SingleItem = require('./singleItem.react.jsx');
var SearchBar = require('./SearchBar.react.jsx');
var Router = require('react-router');
var Link = Router.Link;

var ResultDiv = React.createClass({

  mixins: [Router.Navigation],
  // proptypes: {
  //   itemName: React.PropTypes.string,
  //   itemId: React.PropTypes.number,
  //   itemPrice: React.PropTypes.number,
  //   itemDescription: React.PropTypes.string,
  //   lenderId: React.PropTypes.number,
  // },

  handleClick: function() {
   actions.selectItem(this.props.item, this.props.lender);
   // this.transitionTo('SingleItem');
  },
  
  //onClick = change Route;
      //trigger action that takes current item, createsActiveItem in store, 
      //singleItem listening to store, 
  render: function() {
    return (
      <div className="searchresultDiv">
      <Link to="SingleItem" onClick={this.handleClick}>{this.props.itemName}</Link>
      </div>
      )
  }
});

var searchResults = React.createClass({
 
 mixins: [Reflux.connect(searchStore)],

  handleSearch: function() {
    actions.searchSubmit();
  //TODO: Connect to DB and display items
 },

  render: function() {
    
    var matchedItems = this.state.items.map(function(item) {
      console.log('THE ITEM FROM THE SEARCHRES', item);
      return <ResultDiv item={item} lender={item.lender} onClick={ResultDiv.handleClick} />
    });

    return (
      <div className="resultsContainer">
      <h1>Results</h1>
      {matchedItems}
      </div>
    )
  }

});

module.exports = searchResults;
