var React 			= require('react');
var actions 		= require('../../actions/actions.js');
var _						= require('lodash');
var userStore 	= require('../../stores/user.js');

var LentItem = React.createClass({

	// [Note] ReturnItem Needs to do the following:
			// make a put request to server which updates the item record with the following:
					// borrowed set to false
					// sets borrower_id to null
			//  
	returnItem: function(lender_id, borrower_id, item_id){
		actions.returnItem(lender_id, borrower_id, item_id);
	},

	render: function() {

		var lender_id = userStore.getProp('id');
		var borrower_id = this.props.item.borrower_id;
		var item_id = this.props.item.id;

		var borrower = this.props.item.borrower;

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
		// 	<p>Item_ID: {this.props.item.id}</p>
		// 	<p>Description: {this.props.item.description}</p>
		// 	<p>BeeBucks: {this.props.item.beebucks}</p>
		// 	<p>Borrower: {this.props.item.borrower_id}</p>
		// 	<button onClick={this.returnItem.bind(this, lender_id, borrower_id, item_id)}>Item Was Returned</button>
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
								<span>{borrower.firstname + " " +borrower.lastname}</span>
							</div>
							<div>
								<i className="tiny money icon"></i>
								<span>{this.props.item.beebucks}</span>
							</div>
						</div>
					</div>	
				</div>
				<div className="ui green button" onClick={this.returnItem.bind(this, lender_id, borrower_id, item_id)}>Item Returned</div>
			</div>			
		);
	}
});

var Items_lent = React.createClass({

	// <div>
	// <h5>Lent Items</h5>
	// 	{LentItems}
	// </div>

	render: function() {

		var LentItems = _.map(this.props.item, function(item){
			return <LentItem item={item}/>;
		});

		return (
			<div>
				<h1 className="ui horizontal header divider">
					Lent
				</h1>
				<div className="ui center aligned stackable four column grid">
					{LentItems}
				</div>
			</div>
		);
	}

});

module.exports = Items_lent;