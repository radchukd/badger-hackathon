import '@testing-library/jest-dom';

import React from 'react';

import { render } from '@testing-library/react';

import BalanceTableCard from '../BalanceTableCard';

describe('BalanceTableCard', () => {
  it('renders correctly', () => {
    const tree = render(
      <BalanceTableCard
        title="Asset Balances"
        title2="$392,319.77"
        subtitle1="Assets that are in your wallet"
        subtitle2="Your total asset holdings"
        headCells={[
          { value: 'Tokens', align: 'left' },
          { value: 'Portfolio % Alloc.', align: 'center' },
          { value: 'Price', align: 'right' },
          { value: 'Balance', align: 'right' },
        ]}
        bodyCells={[
          [
            [
              {
                value: 'BADGER',
                align: 'left',
              },
              {
                value: '$145.10',
                align: 'left',
              },
            ],
            {
              value: '1.62%',
              align: 'center',
            },
            {
              value: '3.39%',
              color: 'info.main',
              align: 'center',
            },
            [
              {
                value: '18.16',
                align: 'right',
              },
              {
                value: '$145.10',
                align: 'right',
              },
            ],
          ],
          [
            [
              {
                value: 'cvxCRV',
                align: 'left',
              },
              {
                value: '$11.06',
                align: 'left',
              },
            ],
            {
              value: '0.12%',
              align: 'center',
            },
            {
              value: '58.45%',
              color: 'info.main',
              align: 'center',
            },
            [
              {
                value: '7.13',
                align: 'right',
              },
              {
                value: '$11.06',
                align: 'right',
              },
            ],
          ],
          [
            [
              {
                value: 'WBTC',
                align: 'left',
              },
              {
                value: '-$506.13',
                align: 'left',
              },
            ],
            {
              value: '5.65%',
              align: 'center',
            },
            {
              value: '2.29%',
              color: 'info.main',
              align: 'center',
            },
            [
              {
                value: '-0.02',
                align: 'right',
              },
              {
                value: '-$506.13',
                align: 'right',
              },
            ],
          ],
          [
            [
              {
                value: 'CVX',
                align: 'left',
              },
              {
                value: '$11.65',
                align: 'left',
              },
            ],
            {
              value: '0.13%',
              align: 'center',
            },
            {
              value: '62.92%',
              color: 'info.main',
              align: 'center',
            },
            [
              {
                value: '3.04',
                align: 'right',
              },
              {
                value: '$11.65',
                align: 'right',
              },
            ],
          ],
          [
            [
              {
                value: 'crvpBTC',
                align: 'left',
              },
              {
                value: '$56.33',
                align: 'left',
              },
            ],
            {
              value: '0.63%',
              align: 'center',
            },
            {
              value: '22.8%',
              color: 'info.main',
              align: 'center',
            },
            [
              {
                value: '0',
                align: 'right',
              },
              {
                value: '$56.33',
                align: 'right',
              },
            ],
          ],
          [
            [
              {
                value: 'SLP-WBTC-ETH',
                align: 'left',
              },
              {
                value: '$0.00',
                align: 'left',
              },
            ],
            {
              value: '0%',
              align: 'center',
            },
            {
              value: '14.74%',
              color: 'info.main',
              align: 'center',
            },
            [
              {
                value: '0',
                align: 'right',
              },
              {
                value: '$0.00',
                align: 'right',
              },
            ],
          ],
          [
            [
              {
                value: 'DIGG',
                align: 'left',
              },
              {
                value: '-$5,544.45',
                align: 'left',
              },
            ],
            {
              value: '61.94%',
              align: 'center',
            },
            {
              value: '24.44%',
              color: 'info.main',
              align: 'center',
            },
            [
              {
                value: '-0.22',
                align: 'right',
              },
              {
                value: '-$5,544.45',
                align: 'right',
              },
            ],
          ],
          [
            [
              {
                value: 'SLP-DIGG-WBTC',
                align: 'left',
              },
              {
                value: '$736.23',
                align: 'left',
              },
            ],
            {
              value: '8.22%',
              align: 'center',
            },
            {
              value: '68.21%',
              color: 'info.main',
              align: 'center',
            },
            [
              {
                value: '0',
                align: 'right',
              },
              {
                value: '$736.23',
                align: 'right',
              },
            ],
          ],
          [
            [
              {
                value: 'SLP-IBBTC-WBTC',
                align: 'left',
              },
              {
                value: '$0.00',
                align: 'left',
              },
            ],
            {
              value: '0%',
              align: 'center',
            },
            {
              value: '13.41%',
              color: 'info.main',
              align: 'center',
            },
            [
              {
                value: '0',
                align: 'right',
              },
              {
                value: '$0.00',
                align: 'right',
              },
            ],
          ],
          [
            [
              {
                value: 'crvhBTC',
                align: 'left',
              },
              {
                value: '$30.31',
                align: 'left',
              },
            ],
            {
              value: '0.34%',
              align: 'center',
            },
            {
              value: '23.43%',
              color: 'info.main',
              align: 'center',
            },
            [
              {
                value: '0',
                align: 'right',
              },
              {
                value: '$30.31',
                align: 'right',
              },
            ],
          ],
          [
            [
              {
                value: 'crvtBTC',
                align: 'left',
              },
              {
                value: '$571.80',
                align: 'left',
              },
            ],
            {
              value: '6.39%',
              align: 'center',
            },
            {
              value: '11.78%',
              color: 'info.main',
              align: 'center',
            },
            [
              {
                value: '0.03',
                align: 'right',
              },
              {
                value: '$571.80',
                align: 'right',
              },
            ],
          ],
          [
            [
              {
                value: 'crvTricrypto',
                align: 'left',
              },
              {
                value: '$231.93',
                align: 'left',
              },
            ],
            {
              value: '2.59%',
              align: 'center',
            },
            {
              value: '43.49%',
              color: 'info.main',
              align: 'center',
            },
            [
              {
                value: '0.28',
                align: 'right',
              },
              {
                value: '$231.93',
                align: 'right',
              },
            ],
          ],
          [
            [
              {
                value: 'crvsBTC',
                align: 'left',
              },
              {
                value: '$1,106.85',
                align: 'left',
              },
            ],
            {
              value: '12.36%',
              align: 'center',
            },
            {
              value: '7.95%',
              color: 'info.main',
              align: 'center',
            },
            [
              {
                value: '0.03',
                align: 'right',
              },
              {
                value: '$1,106.85',
                align: 'right',
              },
            ],
          ],
        ]}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
