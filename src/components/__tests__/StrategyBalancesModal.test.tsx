import '@testing-library/jest-dom';

import React from 'react';

import { render } from '@testing-library/react';

import { AccountStore } from '../../mobx/accountStore';
import { PortfolioStore } from '../../mobx/portfolioStore';
import { RootStore, StoreProvider } from '../../mobx/rootStore';
import StrategyBalancesModal from '../StrategyBalancesModal';

describe('StrategyBalancesModal', () => {
  const rootStore = new RootStore();
  const accountStore = new AccountStore({ preload: false });
  const portfolioStore = new PortfolioStore();
  const store = { rootStore, accountStore, portfolioStore };

  it('renders correctly', () => {
    const tree = render(
      <StoreProvider value={store}>
        <StrategyBalancesModal onClose={() => null} />
      </StoreProvider>,
    );

    expect(tree).toMatchSnapshot();
  });
});
