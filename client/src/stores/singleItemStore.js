var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/actions.js');


var singleItemStore = Reflux.createStore({

  data: {item: {}, lender: {}},

  //listens to actions
  listenables: [actions],

  onSelectItem: function(item, lender) {
    console.log('ITEMZ SELECTED YO', item);
    console.log('ENDER SELECTED', lender);
   this.data.item = item;
   this.data.lender= lender;
    // that.data.lender.firstname = lenderInfo.firstname;
    // that.data.lender.lastname = lenderInfo.lastname;
    // that.data.lender.reputation = lenderInfo.reputation;
    // that.data.lender.city = lenderInfo.city;
    // that.data.lender.state = lenderInfo.state;
    this.trigger(this.data);
   
  }, 

  // currentItem: {
  //  //trigger(this.itemSelected);
  //  //component renders current item. 
  // },

  onItemRequestSubmitted: function(itemId, borrower) {
    //request DB to notify other user;
    // console.log('item requested', "/api/notifications/" + "" + itemName + "/" + borrower + "");
    request.post("/api/notifications/" + "" + itemId + "/" + borrower + "", function(res) {
      if (res.ok) {
        console.log('yay')
      } else {
        console.log('error!')
      }
    })
  },


  //gets the item info from the database and sets the data to the item info
  init: function(){
   //  request.get("/api/items/:user", function(res){
   //    console.log(res.body);
   //    this.data.item = res.body;
   //    this.trigger(this.data);
   // })
  },

  //sets the state to the item data
  getInitialState: function(){
    return this.data;
  }

})

module.exports = singleItemStore;