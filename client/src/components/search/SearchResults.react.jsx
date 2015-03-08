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
    // console.log('ZE PROPS', this.props.item, this.props.lender, this.props.itemName);
    // <Link to="SingleItem" onClick={this.handleClick}>
    // <p>{this.props.itemInfo.title}</p>
    // <img className="ui huge image" src={this.props.itemInfo.imageurl} alt={this.props.itemInfo.title} />
    // </Link>
    // <i className="fa fa-tag"/><span>{"   " + this.props.itemInfo.beebucks}</span>
    // <i className="fa fa-user"/><span>{"   " + this.props.itemInfo.lender.username}</span>
    // <i className="fa fa-star"/><span>{"   " + this.props.itemInfo.lender.rating}</span>

    //  <div className="searchresultDiv">
    // <Link to="SingleItem" onClick={this.handleClick}>{this.props.itemName}</Link>
    // </div>
    return (
      <div className="item">
          <div className="ui tiny image">
            <Link to="SingleItem" onClick={this.handleClick}>
              <img src={this.props.itemimg} />
            </Link>
          </div>
          <div className="middle aligned content">
            <span onClick={this.handleClick}>{this.props.itemName}</span>
                 <div><i className="tiny quote left icon"/><span>{"   " + this.props.item.description}</span></div>
                 <div><i className="tiny money icon"></i><span>{"   " + this.props.item.beebucks}</span></div>
                 <div><i className="tiny user icon"/><span>{"   " + this.props.item.lender.username}</span></div>
                 <div><i className="tiny star icon"/><span>{"   " + this.props.item.lender.rating}</span></div>
          </div>
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
      return (<ResultDiv item={item} itemName={item.title} itemimg={item.imageurl} lender={item.lender} />)
    });
    return (
      <div className="searchResultsList">
        <div className="ui divided items">
            {matchedItems}
        </div>
      </div>
    )
  }

});

module.exports = searchResults;
