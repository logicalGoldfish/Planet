var React = require('react');
var _			= require('lodash');

var ItemBorrowed = React.createClass({

	render: function(){

		var lender = this.props.item.lender;

		// <i className="circular tiny gift icon bee-fill"></i>
		// <span>{this.props.item.title}</span>

		// <i className="quote tiny left icon"></i>
		// <span>{this.props.item.description}</span>
		// <i className="quote tiny right icon"></i>			
		var beeColor = {
			backgroundColor: "#FFD34E"
		}

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


var AllItemsBorrowed = React.createClass({

		// <h2 className="ui horizontal header divider">
	 //  	Currently Borrowed
		// </h2>

	render: function() {
		// console.log('Items container with props', this.props.item);
		var borrowedItems = _.map(this.props.item, function(item){
			return <ItemBorrowed item={item}/>;
		});

		return (
			<div>
				<h1 className="ui horizontal header divider">
					Borrowed
				</h1>
				<div className="ui center aligned stackable four column grid">
						{borrowedItems}
				</div>
			</div>
		);
	}

});

module.exports = AllItemsBorrowed;