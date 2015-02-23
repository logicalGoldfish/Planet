var React 			= require('react');
var Search 			= require('../search/Search.react.jsx');


/* Defines Top Level App Component */
var APP = React.createClass({
	render: function(){
		return (
				<div>
					<Search/>
				</div>
			);
	}
});

module.exports = APP;