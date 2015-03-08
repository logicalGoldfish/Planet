var React = require('react');

var ratingStar = React.createClass({

	componentWillMount: function() {
		// alert('stars are mounting');
	},

	hoverStar: function(){
		// [Note] sets the rating components state property hoverIndex equal to this stars index
		// [Note] this will cause a re-render with highlighted stars
		this.props.hover(this.props.index);
	},

	leaveStar: function(){
		// [Note] this sets the rating components state hoverIndex to -1 (nothing should be highlighted)
		this.props.leave(this.props.index);
	},

	setRating: function(){
		this.props.data.rating = this.props.index;
		// event.preventDefault();
		// TODO: This should also set a state property in the review container to equal the rating they have selected
		// TODO: Onsubmit of the actual form, it will also capture the selected rating from the rating component for the put request 
		// this.props.data.save();
	},

	selectRating: function(){
		var rating = this.props.index;
		this.props.selectRating(rating);
		console.log('user has select a rating of ', rating);
	},


	// [Note] Assigns classes based on user events and element properties
	getClasses: function(){
		var classes = ['fa'];
		if (this.props.fill || this.props.hoverFill) {
			classes.push('fa-star');
		} 
		else {
			classes.push('fa-star-o');
		}
		if (this.props.hoverFill) {
			classes.push('rating-highlight');
		} else {
			classes.push('rating-normal');
		}
		return classes;
	},

	render: function() {
	var starClasses = this.getClasses().join(' ');
		return (
			<span onClick={this.selectRating} onMouseOver={this.hoverStar} onMouseLeave={this.leaveStar}>
				<i className={starClasses}></i>
			</span>
		);
	}

});

module.exports = ratingStar;