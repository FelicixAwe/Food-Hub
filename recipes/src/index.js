import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Site extends React.component
{
	render()
	{
		const siteName = '10 Minute Recipes';

		return( <body>{siteName}</body> );
	};
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Site />);

