import '@testing-library/jest-dom';

import React from 'react';

import { render } from '@testing-library/react';

import { AccountStore } from '../../mobx/accountStore';
import { formatNumber } from '../../utils/numberUtils';
import BalanceTableCard from '../BalanceTableCard';
import testAccount from './testAccount.json';

describe('BalanceTableCard', () => {
  const accountStore = new AccountStore({ preload: false });
  accountStore.account = testAccount;

  it('renders correctly', () => {
    const { account, totalAllocation, allocationPerAsset, assetValue, assetValueBTC } = accountStore;

    const tree = render(
      <BalanceTableCard
        title="Asset Balances"
        title2={formatNumber(totalAllocation(false, 'balance'), 'currency')}
        subtitle1="Assets that are in your wallet"
        subtitle2="Your total asset holdings"
        headCells={[
          { value: 'Tokens', align: 'left' },
          { value: 'Portfolio % Alloc.', align: 'center' },
          { value: 'Price', align: 'right' },
          { value: 'Balance', align: 'right' },
        ]}
        bodyCells={
          account?.balances?.map((balance) => [
            {
              value: [balance.asset, formatNumber(balance.value, 'currency')],
              align: 'left',
            },
            {
              value: formatNumber(allocationPerAsset(balance.value, 'balance'), 'percent'),
              align: 'center',
            },
            {
              value: [
                formatNumber(assetValue(balance), 'currency'),
                `${formatNumber(assetValueBTC(balance), 'decimal', 5)} BTC`,
              ],
              align: 'right',
            },
            {
              value: [formatNumber(balance.balance, 'currency'), formatNumber(balance.value, 'currency')],
              align: 'right',
            },
          ]) ?? []
        }
      />,
    );

    expect(tree).toMatchSnapshot();
  });
});
