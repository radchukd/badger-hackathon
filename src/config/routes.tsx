import React from 'react';
import { Route } from 'mobx-router';
import { RootStore } from '../mobx/store';
import Portfolio from '../components/Portfolio';


const routes = {
	home: new Route<RootStore>({
		path: '/',
		component: (
			<Portfolio />
		),
	}),
};

export default routes;
