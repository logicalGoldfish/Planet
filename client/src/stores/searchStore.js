var actions = require('../actions/actions');
var request = require('superagent');
var Reflux = require('reflux');

var searchStore = Reflux.createStore({
    listenables: [actions],
    data: {items: []},
    lenderId: null,
    
    init: function() {
      var that = this;
        request("/api/items/" + "" + $('#searchBar').val() + "", function(res){
          // that.data.items = res;
          that.data.items = JSON.parse(res.text);
          that.trigger(that.data);
        })
      },

    onSearchSubmit: function() {
        // this.searchInput = $('#searchBar').val();
        // console.log('SEARCHINP', this.searchInput);
        // $('#searchBar').val('');
        this.init();
    },

    getInitialState: function() {
        return this.data;
    }
});

module.exports = searchStore;