var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/actions.js');
var userStore = require('./user.js')

var carouselStore = Reflux.createStore({
  
  data: {count: 0, items: []},

  listenables: [actions],

  onNextCarousel: function(){
    this.shiftItems(true);
  },
  onPrevCarousel: function(){
    this.shiftItems(false);
  },

  shiftItems: function(change){
    var display = {items: []};
    if(change){
      if(this.data.count+3<this.data.items.length){
        this.data.count = this.data.count + 3;
      }
    } else {
      if (this.data.count>2){
        this.data.count = this.data.count - 3;
      } else {
        this.data.count = 0;
      }
    }
    for (var i=this.data.count; i<this.data.count+3; i++){
      display.items.push(this.data.items[i]);
    }
    this.trigger(display);
  },

  onRandomItems: function(info){
    var that = this;
    request.get('/api/items/allcity/'+info, function(res){
      console.log(res.body);
      that.data.items = that.shuffle(res.body);
      that.trigger(that.data);
    });
  },

  shuffle: function(array) {
      var counter = array.length, temp, index;
      while (counter > 0) {
          index = Math.floor(Math.random() * counter);
          counter--;
          temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }
      return array;
  },

  getInitialState: function() {
    // var stuff = []
    // for(var i=0; i<60; i++){
    //   stuff.push({img: "img"+i, itemid: "itemid"+i, cost: i, disc: "name"+i});
    // }
    // console.log("BIG STUFF: ", stuff);
    // this.data.items = stuff;    
    // var display = {items: []};
    // for (var i=0; i<3; i++){
    //   display.items.push(this.data.items[i]);
    // }
    return this.data;
  }
})

module.exports = carouselStore;
