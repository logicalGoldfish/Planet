var React = require('react');
var Reflux = require('reflux');
var actions = require('./../../actions/actions');
var lentStore = require('./../../stores/lentStore');

var LentPage = React.createClass({
 
  mixins: [Reflux.connect(lentStore)],
 
  render: function() {
    var lentItems = this.state.items.filter(function(item){
      return item.Lender_id === 1;
    })
      .map(function(item) {return <li> {item.name }| Lender Id:{ item.Lender_id}<button>Item Returned</button></li>});

    return (
      <div>
      <p>Lent</p>
        <ul>
          {lentItems}
        </ul>
      </div>
    )
  }
});

module.exports = LentPage;