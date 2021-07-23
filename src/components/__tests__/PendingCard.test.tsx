import '@testing-library/jest-dom';

import React from 'react';

import { render, screen } from '@testing-library/react';

import { RootStore, StoreProvider } from '../../mobx/store';
import PendingCard from '../PendingCard';
import testAccount from './testAccount.json';

describe('PendingCard', () => {
  const store = new RootStore({ preload: false });
  store.account = testAccount;

  it('renders correctly', () => {
    const tree = render(
      <StoreProvider value={store}>
        <PendingCard />
      </StoreProvider>,
    );

    expect(tree).toMatchSnapshot();
  });

  it('disables button if there are no claimable balances', () => {
    render(
      <StoreProvider value={store}>
        <PendingCard />
      </StoreProvider>,
    );

    const claimButton = screen.getByTestId('pending-card-claim-button');

    if (claimButton.textContent?.includes('(')) {
      expect(claimButton.getAttribute('disabled')).toBeNull();
    } else {
      expect(claimButton.getAttribute('disabled')).toBe('');
    }
  });
});
