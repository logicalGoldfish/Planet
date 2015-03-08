
// var React = require('react');
// var Reflux = require('reflux');
// var request = require('superagent');
// var actions = require('../actions/actions.js');
// var userStore = require('../stores/user.js');
// var api       = require('../utils/url-paths');
// var makeUrl   = require('make-url');

// var messagingStore = Reflux.createStore({

//   // data: {messages: [], reviews: [{person:"bob",message:"hi"},{person:"larry",message:"yo"},{person:"bob",message:"gimme everything"}]},
//   data: {message: []},

//   propTypes: {
//     messageInfo: React.PropTypes.object
//   },

//   //listens to actions
//   listenables: [actions],

//   onLenderMessaged: function(lenderId) {
// //TODO: CREATE FIRST MESSAGE HERE, GRAB FORM. NAME FORM FIELD = MESSAGE;
//     // request.post("/api/messages/samin" + "" + lenderId + "", function(res) {
//     //   console.log('MESSAGES RECIEVED', res);
//     // });
//     var userId = userStore.getProp("id");
//     this.data.lender = lenderUsername;
//     var that = this;
//     request("/api/messages/" + userId + "", function(res) {
      
//       that.data.messages = JSON.parse(res.text)
//         console.log('MESSAGES ON MESSAGES STORE', that.data);
//         that.trigger(that.data);
//         // .filter(function(message) {
//         //         return message.to_id === lenderId || message.from_id === lenderId;
//         //       });
//         //         for (var i = 0; i < that.data.messages; i++) {
//         //           var msg = that.data.messages[i];
//         //             if (msg.lender_id === lenderId) {
//         //               msg.from = lenderUsername;
//         //               console.log('ADDING FROM HERE')
//         //             } else {
//         //               msg.from = 'You';
//         //             }

//     });
//   },

//   //gets the item info from the database and sets the data to the item info
//   init: function(){
//    //  request.get("/api/items/:user", function(res){
//    //    console.log(res.body);
//    //    this.data.item = res.body;
//    //    this.trigger(this.data);
//    // })
//   },

//   //sets the state to the item data
//   getInitialState: function(){
//     return this.data;
//   }

// })

// module.exports = messagingStore;
