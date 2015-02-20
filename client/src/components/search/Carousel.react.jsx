var React = require('react');
var Reflux = require('reflux');
var carouselStore = require('../../stores/CarouselStore.js');
var actions = require('../../actions/actions.js');

var carousel = React.createClass({

  mixins: [Reflux.connect(carouselStore)],

  handleLeftArrowClick: function(evt){
    actions.prevCarousel();
  },

  handleRightArrowClick: function(evt){
    actions.nextCarousel();
  },

  render: function(){
    return (
    <div className="carousel">
      <p>{this.state}</p>
      <img src="#" href="#" alt="previous item set" className="inline arrow" onClick={this.handleLeftArrowClick}/>
      <ul className="inline">
        <li><img src="#" href="#" alt="image A"/></li>
        <li><img src="#" href="#" alt="image B"/></li>
        <li><img src="#" href="#" alt="image C"/></li>
      </ul>
      <img src="#" href="#" alt="next item set" className="inline arrow" onClick={this.handleRightArrowClick}/>
    </div>
    )
  }
})

module.exports = carousel;
