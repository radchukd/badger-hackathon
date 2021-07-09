import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import routes from './config/routes';
import { startRouter } from 'mobx-router';

import store from './mobx/store';

startRouter(routes, store, {
	html5history: true, // or false if you want to use hash based routing
});

ReactDOM.render(<App store={store} />, document.getElementById('root'));
