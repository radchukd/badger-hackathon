import '@testing-library/jest-dom';

import React from 'react';

import { render, screen } from '@testing-library/react';

import { AccountStore } from '../../mobx/accountStore';
import AllocationCard, { IAllocationCard } from '../AllocationCard';

describe('AllocationCard', () => {
  const accountStore = new AccountStore({ preload: false });
  const { loadAccount, allocationDistribution } = accountStore;

  let props: IAllocationCard;

  beforeAll(async () => {
    await loadAccount();

    props = {
      title: 'Asset Allocation',
      subtitle: 'Subtext',
      data: allocationDistribution('balance'),
    };
  });

  it('renders correctly', () => {
    const tree = render(
      <AllocationCard
        {...{
          ...props,
          data: [
            {
              name: 'DIGG',
              value: 0.6193641151985265,
            },
            {
              name: 'crvsBTC',
              value: 0.12364468850869027,
            },
            {
              name: 'SLP-DIGG-WBTC',
              value: 0.08224361422643128,
            },
            {
              name: 'crvtBTC',
              value: 0.06387563501650294,
            },
            {
              name: 'Other',
              value: 0.11087194704984904,
            },
          ],
        }}
      />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('displays black circle for other assets', () => {
    render(<AllocationCard {...props} />);

    const otherListItem = screen.getByTestId('allocation-card-Other');
    const otherListItemAvatar = otherListItem.firstChild;
    expect(otherListItemAvatar?.firstChild).toHaveStyle({ backgroundColor: 'rgb(0, 0, 0)' });
  });
});
