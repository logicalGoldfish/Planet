var actions = require('../actions/actions.js');
var request = require('superagent');
var Reflux = require('reflux');

var postItemStore = Reflux.createStore({
    listenables: [actions],
    data: {items: []},
    
    onPostFormSubmitted: function(title, description, price, photos) {
      request
         .post('/api/items/1')
         .send({'title': title, 'description': description, 'pollenprice': price, 'photos': photos})
         .end(function(err, res) {
            if(err) {
                console.log("error on post: ", err)
            }
            $('#itemPostTitle').val("")
            $('#itemPostDescription').val("")
            $('#itemPostPollenPrice').val("")
            $('#itemPostPhotos').val("")

           alert('Your item is now posted!');
         });
    }
});

module.exports = postItemStore;