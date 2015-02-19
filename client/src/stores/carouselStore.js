var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/actions.js');

var carouselStore = Reflux.createStore({
  
  data: {count: 0, items: ["lol","wat","cool","more","fun","pool","party","hooray","yay","k"]},

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

  init: function(){
   //  request.get("/api/items/:user", function(res){
   //    console.log(res.body);
   //    this.data.items[0] = res.body.hi;
   //    this.trigger(this.data);
   // })
  },

  getInitialState: function() {
    // var first = [];
    // for (var i=0; i<3; i++){
    //   first.push(this.data.items[i]);
    // }
    // return first;
    var display = {items: []};
    for (var i=0; i<3; i++){
      display.items.push(this.data.items[i]);
    }
    return display;
  }
})

module.exports = carouselStore;
