import { CssBaseline } from '@material-ui/core';
import { startRouter } from 'mobx-router';
import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import routes from './config/routes';
import store, { RootStore } from './mobx/store';

export const StoreContext = createContext({} as RootStore);
export const StoreProvider = StoreContext.Provider;

startRouter(routes, store, {
  html5history: true,
});

ReactDOM.render(
  <StoreProvider value={store}>
    <CssBaseline />
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);
