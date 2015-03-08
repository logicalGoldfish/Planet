var React 			= require('react');
var Search 			= require('../search/Search.react.jsx');


/* Defines Top Level App Component */
var APP = React.createClass({
	render: function(){
		return (
				<div>
          <p>hello</p>
					<Search/>
				</div>
			);
	}
});

module.exports = APP;