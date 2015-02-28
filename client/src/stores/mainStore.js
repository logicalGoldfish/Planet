var React = require('react');
var Reflux = require('reflux');
var actions = require('../actions/actions.js');
var request = require('superagent');

var userStore = Reflux.createStore({
  listenables: [actions],

  data: {},

  // onMountUser: function(data){
  //   var url = "/api/users/init/"+data.id;
  //   request.get(url, function(err, res){
  //     if ( err ) {
  //       console.err('error trying to get item information for user', err);
  //     }
  //     else {
  //       console.log('USERINFO RECIEVED: ', res.body);
  //       this.data = res.body;
  //       trigger(this.data);
  //     }
  //   }.bind(this));  

  // }

  // onLoginToggle: function(status){
  //   if(status===true){
  //     // console.log("IN THE SYSTEM");
  //     this.data.loggedIn = true;
  //     this.trigger(this.data)
  //   }else{
  //     // console.log("OUT OF IT");
  //     this.data.loggedIn = false;
  //     this.trigger(this.data)
  //   }
  // },

  // getInitialState: function(){
  //  return this.data;
  // },
});

module.exports = userStore;