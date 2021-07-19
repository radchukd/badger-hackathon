import { startRouter } from 'mobx-router';
import React, { createContext } from 'react';
import ReactDOM from 'react-dom';

import { CssBaseline, ThemeProvider } from '@material-ui/core';

import App from './App';
import routes from './config/routes';
import theme from './config/theme';
import store, { RootStore } from './mobx/store';

export const StoreContext = createContext({} as RootStore);
export const StoreProvider = StoreContext.Provider;

startRouter(routes, store, {
  html5history: true,
});

ReactDOM.render(
  <StoreProvider value={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StoreProvider>,
  document.getElementById('root'),
);
