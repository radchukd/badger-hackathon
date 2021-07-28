import '@testing-library/jest-dom';

import React from 'react';

import { render } from '@testing-library/react';

import { AccountStore } from '../../mobx/accountStore';
import { PortfolioStore } from '../../mobx/portfolioStore';
import { RootStore, StoreProvider } from '../../mobx/rootStore';
import BoostCard from '../BoostCard';
import testAccount from './testAccount.json';

describe('BoostCard', () => {
  const rootStore = new RootStore();
  const accountStore = new AccountStore({ preload: false });
  const portfolioStore = new PortfolioStore();
  const store = { rootStore, accountStore, portfolioStore };
  accountStore.account = testAccount;

  it('renders correctly', () => {
    const tree = render(
      <StoreProvider value={store}>
        <BoostCard />
      </StoreProvider>,
    );

    expect(tree).toMatchSnapshot();
  });
});
