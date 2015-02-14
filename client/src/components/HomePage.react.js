/*** @jsx React.DOM */
var TopBar = require('./TopBar.react');
var React = require('react');

/**
 * Retrieve the current TODO data from the TodoStore
 */
// function getTodoState() {
//   return {
//     // allTodos: TodoStore.getAll(),
//     // areAllComplete: TodoStore.areAllComplete()
//   };
// }

var HomePage = React.createClass({

  getInitialState: function() {
    // return getTodoState();
  },

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
        <TopBar/>
        <h1>Welcome, {this.props.userName}</h1>
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