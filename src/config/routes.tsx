import { Route } from 'mobx-router';
import React from 'react';

import Portfolio from '../components/Portfolio';
import { RootStore } from '../mobx/rootStore';

const routes = {
  home: new Route<RootStore>({
    path: '/',
    component: <Portfolio />,
  }),
};

export default routes;
