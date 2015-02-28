var actions = require('../actions/actions');
var request = require('superagent');
var Reflux = require('reflux');

var searchStore = Reflux.createStore({
    listenables: [actions],
    data: {items: [], searched: null},
    
    init: function() {
      // this.data.searched = $('#searchBar').val();
      
      },

    onSearchSubmit: function(searchedVal) {
      var that = this;
      //hard-coded user-ID to 1 currently
        request("/api/items/city/1/" + "" + searchedVal + "", function(res){
          // that.data.items = res;
          console.log('THE DATA RETURNED FROM THE SEARCH', JSON.parse(res.text))
          that.data.items = JSON.parse(res.text);
          that.trigger(that.data);
          actions.searchResComplete(that.data.items);
        });
    },

    getInitialState: function() {
        return this.data;
    }
});

module.exports = searchStore;