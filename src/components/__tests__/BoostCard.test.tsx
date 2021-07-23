import '@testing-library/jest-dom';

import React from 'react';

import { render } from '@testing-library/react';

import { RootStore, StoreProvider } from '../../mobx/store';
import BoostCard from '../BoostCard';
import testAccount from './testAccount.json';

describe('BoostCard', () => {
  const store = new RootStore({ preload: false });
  store.account = testAccount;

  it('renders correctly', () => {
    const tree = render(
      <StoreProvider value={store}>
        <BoostCard />
      </StoreProvider>,
    );

    expect(tree).toMatchSnapshot();
  });
});
