import '@testing-library/jest-dom';

import React from 'react';

import { render } from '@testing-library/react';

import { RootStore, StoreProvider } from '../../mobx/store';
import NetWorthCard from '../NetWorthCard';
import testAccount from './testAccount.json';

describe('NetWorthCard', () => {
  const store = new RootStore({ preload: false });
  store.account = testAccount;

  it('renders correctly', () => {
    const tree = render(
      <StoreProvider value={store}>
        <NetWorthCard />
      </StoreProvider>,
    );

    expect(tree).toMatchSnapshot();
  });
});
