import '@testing-library/jest-dom';

import React from 'react';

import { render, screen } from '@testing-library/react';

import PendingCard from '../PendingCard';
import { RootStore, StoreProvider } from '../../mobx/store';

describe('PendingCard', () => {
  const store = new RootStore({ preload: false });
  const { loadAccount } = store;

  beforeAll(async () => {
    await loadAccount();
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
