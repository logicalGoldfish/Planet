var React = require('react');
var Reflux = require('reflux');
var postItemStore = require('../stores/postItemStore');
var actions = require('../actions/actions');

var PostPage = React.createClass({

  // getInitialState: function() {
  //   return null;
  //   // return getTodoState();
  // },

  mixins: [Reflux.connect(postItemStore)],

  componentDidMount: function() {
   
  },

  componentWillUnmount: function() {
  },

  handlePostSubmit: function(e) {
   e.preventDefault();
   actions.postFormSubmitted($('#itemPostTitle').val(), $('#itemPostDescription').val(), 
    $('#itemPostBeeBucks').val());

   // request
   //    .post('/api/items/christine')
   //    .field('title', $('#itemPostTitle').val())
   //    .field('description', $('#itemPostDescription').val())
   //    .field('pollenprice', $('#itemPostPollenPrice').val())
   //    .attach('photos', $('#itemPostPhotos').val())
   //    .end(function() {
   //      console.log('your item was successfully posted');
   //    });
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      //later: plug in " + session.username + "
      <form className="postForm" onSubmit={this.handlePostSubmit}>
        <div className="form-group">
          <label for="itemName">Enter Item</label>
          <input type="text" className="form-control" id="itemPostTitle" placeholder="Enter Item Name (ie 'Hammer')" name="title" />
        </div>
        <div className="form-group">
        <label for="itemName">Enter Description</label>
        <textarea className="form-control" id="itemPostDescription" rows="3" placeholder="Describe Your Item" name="description"></textarea>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Enter BeeBucks</label>
          <input type="number" min="1" step="1" className="form-control" id="itemPostBeeBucks" placeholder="$$$" name="beebucks" />
        </div>
        <div className="form-group">
          <label for="exampleInputFile">Add Photos</label>
          <input type="file" id="itemPostPhotos" name="photos" />
          <p className="help-block">Upload Item Photos</p>
        </div>
        <button type="submit" class="btn btn-warning" onClick={this.handlePostSubmit}>Submit</button>
        </form>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    // this.setState(getTodoState());
  }

});

module.exports = PostPage;