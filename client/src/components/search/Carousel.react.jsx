var React = require('react');
var Reflux = require('reflux');
var carouselStore = require('../../stores/carouselStore.js');
var actions = require('../../actions/actions.js');
var searchStore = require('../../stores/searchStore');
var Router = require('react-router');
var Link = Router.Link;

var InnerImage = React.createClass({

  propTypes: {
    itemInfo: React.PropTypes.object
  },

  handleClick: function() {
   actions.selectItem(this.props.itemInfo, this.props.itemInfo.lender);
  },


  // <div className="column">
  //   <div className="ui segment">
      // <Link to="SingleItem" onClick={this.handleClick}>
  //     <p>{this.props.itemInfo.title}</p>
  //     <img className="ui huge image" src={this.props.itemInfo.imageurl} alt={this.props.itemInfo.title} />
  //     </Link>
  //     <i className="fa fa-tag"/><span>{"   " + this.props.itemInfo.beebucks}</span>
  //     <i className="fa fa-user"/><span>{"   " + this.props.itemInfo.lender.username}</span>
  //     <i className="fa fa-star"/><span>{"   " + this.props.itemInfo.lender.rating}</span>
  //   </div>
  // </div>

  render: function(){

    var elementStyle = {
      position: "absolute",
      bottom: "10%",
      textAlign: "left",
      left: "7%",
      color: "white",
      backgroundColor: "black",
      opacity: "0.75",
      padding: "2%",
      borderRadius: "5px",
      minWidth: "25%"
    };

    var itemInfo = this.props.itemInfo;

    return (
      <div className="column">
        <div className="ui segment">
          <Link to="SingleItem" onClick={this.handleClick}>
          <div>
            <img className="ui fluid image crop" src={itemInfo.imageurl} alt={itemInfo.title}></img>
            <div style={elementStyle}>
              <div>
                <i className="tiny tag icon"></i>
                <span>{itemInfo.title}</span>
              </div>
              <div>
                <i className="tiny money icon"></i>
                <span>{itemInfo.beebucks}</span>
              </div>
            </div>
          </div>
          </Link>  
        </div>
      </div>

    )
  }
})

var carousel = React.createClass({

  mixins: [Reflux.connect(carouselStore)],

  handleLeftArrowClick: function(evt){
    actions.prevCarousel();
  },

  handleRightArrowClick: function(evt){
    actions.nextCarousel();
  },

  render: function() {
    var items = this.state.items.map(function(item) {
      return (<InnerImage itemInfo={item} />);
    });

    return (
   <div className="ui stackable four column page grid carousel">
      <h2 className="ui horizontal header divider">Items in Your Area</h2>
      {items}
    </div>
    )
  }
})

module.exports = carousel;
