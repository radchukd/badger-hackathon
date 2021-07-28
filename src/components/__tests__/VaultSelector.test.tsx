import '@testing-library/jest-dom';

import React from 'react';

import { render } from '@testing-library/react';

import { AccountStore } from '../../mobx/accountStore';
import { PortfolioStore } from '../../mobx/portfolioStore';
import { RootStore, StoreProvider } from '../../mobx/rootStore';
import VaultSelector from '../VaultSelector';

describe('VaultSelector', () => {
  const rootStore = new RootStore();
  const accountStore = new AccountStore({ preload: false });
  const portfolioStore = new PortfolioStore();
  const store = { rootStore, accountStore, portfolioStore };

  it('renders correctly', () => {
    const tree = render(
      <StoreProvider value={store}>
        <VaultSelector onClose={() => null} />
      </StoreProvider>,
    );

    expect(tree).toMatchSnapshot();
  });
});
