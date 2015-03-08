var React = require('react');
var _ 		= require('lodash');

var InventoryItem = React.createClass({

	render: function() {

		var lender = this.props.item.lender;

		var elementStyle = {
		  position: "absolute",
		  bottom: "10%",
		  textAlign: "left",
		  left: "7%",
		  color: "white",
		  backgroundColor: "black",
		  opacity: "0.75",
		  padding: "2%",
		  borderRadius: "5px"
		};

		// <div>
		// 	<p>Item: {this.props.item.title}</p>
		// 	<p>Description: {this.props.item.description}</p>
		// 	<p>BeeBucks: {this.props.item.beebucks}</p>
		// 	<hr></hr>
		// </div>

		return (
			<div className="column">
				<div className="ui segment">
					<div>
						<img className="ui fluid image crop" src={this.props.item.imageurl}></img>
						<div style={elementStyle}>
							<div>
								<i className="tiny user icon"></i>
								<span>{lender.firstname + " " +lender.lastname}</span>
							</div>
							<div>
								<i className="tiny money icon"></i>
								<span>{this.props.item.beebucks}</span>
							</div>
						</div>
					</div>	
				</div>
			</div>			
		);
	}

});

var Items_inventory = React.createClass({

	render: function() {

		// <div>
		// <h5>Your Inventory</h5>
		// 	{InventoryItems}
		// </div>

		var InventoryItems = _.map(this.props.item, function(item){
			return <InventoryItem item={item}/>
		});

		return (
			<div>
				<h1 className="ui horizontal header divider">
					Inventory
				</h1>
				<div className="ui center aligned stackable four column grid">
					{InventoryItems}
				</div>
			</div>
		);
	}

});

module.exports = Items_inventory;
