import '@testing-library/jest-dom';

import { runInAction } from 'mobx';
import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { AccountStore } from '../../mobx/accountStore';
import { PortfolioStore } from '../../mobx/portfolioStore';
import { RootStore, StoreProvider } from '../../mobx/rootStore';
import Portfolio from '../Portfolio';
import testAccount from './testAccount.json';

describe('Portfolio', () => {
  const rootStore = new RootStore();
  const accountStore = new AccountStore({ preload: false });
  const portfolioStore = new PortfolioStore();
  const store = { rootStore, accountStore, portfolioStore };
  accountStore.account = testAccount;
  accountStore.prices = {};
  accountStore.vaults = [];

  it('renders correctly', () => {
    const tree = render(
      <StoreProvider value={store}>
        <Portfolio />
      </StoreProvider>,
    );

    expect(tree).toMatchSnapshot();
  });

  it('shows spinner when loading', () => {
    accountStore.account = undefined;

    render(
      <StoreProvider value={store}>
        <Portfolio />
      </StoreProvider>,
    );

    const spinner = screen.getByTestId('portfolio-loading-spinner');

    expect(spinner).toBeVisible();

    runInAction(() => {
      accountStore.account = testAccount;
    });
  });

  it('opens modal on vault selection', () => {
    render(
      <StoreProvider value={store}>
        <Portfolio />
      </StoreProvider>,
    );

    store.portfolioStore.setSelectedVault('wBTC/Digg');

    const strategyBalancesModal = screen.getByTestId('portfolio-strategy-balances-modal');

    expect(strategyBalancesModal).toBeVisible();
  });

  it('closes modal on outside click', () => {
    render(
      <StoreProvider value={store}>
        <Portfolio />
      </StoreProvider>,
    );

    store.portfolioStore.setSelectedVault('wBTC/Digg');

    const modalBackdrop = screen.getByTestId('portfolio-strategy-balances-modal-backdrop');

    fireEvent.click(modalBackdrop);

    const strategyBalancesModal = screen.queryByTestId('portfolio-strategy-balances-modal');

    expect(strategyBalancesModal).toBeNull();
  });
});
