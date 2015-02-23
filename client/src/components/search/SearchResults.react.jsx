var React = require('react');
var Reflux = require('reflux');
var actions = require('../../actions/actions');
var searchStore = require('../../stores/searchStore');
var SingleItem = require('./singleItem.react.jsx');
var SearchBar = require('./SearchBar.react.jsx');

var ResultDiv = React.createClass({
  proptypes: {
    itemName: React.PropTypes.string,
    itemPrice: React.PropTypes.number,
    itemDescription: React.PropTypes.string,
    lenderId: React.PropTypes.number
  },

  handleClick: function() {
   actions.selectItem(this.props.itemName, this.props.itemPrice, this.props.itemDescription, this.props.lenderId);
  },
  
  //onClick = change Route;
      //trigger action that takes current item, createsActiveItem in store, 
      //singleItem listening to store, 
  render: function() {
    return (
      <div className="searchresultDiv">
      <a href="#" onClick={this.handleClick}>{this.props.itemName}</a>
      </div>
      )
  }
});

var searchResults = React.createClass({
 
 mixins: [Reflux.connect(searchStore)],

 searchInput: function() {
  console.log($('#searchBar').val());
 },

  handleSearch: function() {
    actions.searchSubmit();
  //TODO: Connect to DB and display items
 },

  render: function() {
    console.log('ITEMS FROM COMPONENT', this.state.items);
    var matchedItems = this.state.items.map(function(item) 
      {return <ResultDiv itemName={item.title} itemId={item.id} itemPrice={item.pollenprice} itemDescription={item.description}
      lenderId={item.lender_id}
      onClick={ResultDiv.handleClick} />});
    return (
      <div>
      <h1>Results</h1>
      {matchedItems}
      <SingleItem />
      </div>
    )
  }

});

module.exports = searchResults;
