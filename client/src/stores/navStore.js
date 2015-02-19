var actions = require('../actions/actions');
var Reflux = require('reflux');

var navStore = Reflux.createStore({
    listenables: [actions],
    onClickProfilePic: function() {
        console.log('PROFILE CLICKED');
    },
    onClickHamburger: function() {
        console.log('HAMBURGER CLICKED');
    },
    
    updateName: function(name){
        this.userName = name;
        this.trigger(name);
    }
});

module.exports = navStore;
