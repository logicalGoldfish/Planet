var React = require('react');
var Reflux = require('reflux');
var actions = require('./../../actions/actions');
var borrowedStore = require('./../../stores/borrowedStore');

var BorrowedPage = React.createClass({
 
  mixins: [Reflux.connect(borrowedStore)],
 
  render: function() {
    var borrowedItems = this.state.items.filter(function(item){
      return item.Borrower_id === 3;
    })
      .map(function(item) {return <li> {item.name }| Borrower Id:{ item.Borrower_id}<button>Item Returned</button></li>});

    return (
      <div>
      <p>Borrowed</p>
        <ul>
          {borrowedItems}
        </ul>
      </div>
    )
  }
});

module.exports = BorrowedPage;