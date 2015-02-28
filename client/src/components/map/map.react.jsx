var React = require('react');
var Reflux = require('reflux');
var mapStore = require('../../stores/map');
var actions = require('./../../actions/actions');
var SearchBar = require('../search/SearchBar.react.jsx');


var map = React.createClass({

	// [Note] These are hard-coded properties, but we need to get the lat/long from the current address
	// TODO: Figure out how to get lat-long from address or use address with maps api for centering
	mixins: [Reflux.connect(mapStore)],

  // [Tip] Invoked once immediately after initial rendering, has DOM rep with this.getDOMNode()


  componentDidMount: function() {

    // var boxText = document.createElement("div");
    //   boxText.style.cssText = "margin-top: 1px; background: yellow; padding: 1px;";
    //   boxText.innerHTML = "City Hall, Sechelt<br>British Columbia<br>Canada";

    // var windowOptions = {
    //    content: boxText
    //   ,disableAutoPan: false
    //   ,maxWidth: 100
    //   ,pixelOffset: new google.maps.Size(-140, 0)
    //   ,zIndex: 5
    //   ,boxStyle: { 
    //     opacity: 0.75
    //     ,width: "280px"
    //    }
    //   ,infoBoxClearance: new google.maps.Size(-16, -11)
    //   ,isHidden: false
    //   ,pane: "floatPane"
    //   ,enableEventPropagation: false
    // };
        
    //   var infoBox = new InfoBox(windowOptions);

      $(".carousel").remove();
      var mapOptions = {center: new google.maps.LatLng(37.7836245,-122.4089988), zoom: 13};
      var gMap = new google.maps.Map(this.getDOMNode(), mapOptions);
      actions.mapMounted(gMap);
  },


  render: function() {
    return (
      <div className="map-container"/>
    )
  }
});

module.exports = map;