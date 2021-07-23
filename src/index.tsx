import { startRouter } from 'mobx-router';
import React from 'react';
import ReactDOM from 'react-dom';

import { CssBaseline, ThemeProvider } from '@material-ui/core';

import App from './App';
import routes from './config/routes';
import theme from './config/theme';
import store, { StoreProvider } from './mobx/store';

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
  // for testing purposes
  document.getElementById('root') || document.createElement('div'),
);
