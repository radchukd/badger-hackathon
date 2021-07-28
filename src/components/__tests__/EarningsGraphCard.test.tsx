import '@testing-library/jest-dom';

import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { AccountStore } from '../../mobx/accountStore';
import { PortfolioStore } from '../../mobx/portfolioStore';
import { RootStore, StoreProvider } from '../../mobx/rootStore';
import EarningsGraphCard from '../EarningsGraphCard';
import testAccount from './testAccount.json';

describe('EarningsGraphCard', () => {
  const rootStore = new RootStore();
  const accountStore = new AccountStore({ preload: false });
  const portfolioStore = new PortfolioStore();
  const store = { rootStore, accountStore, portfolioStore };
  accountStore.account = testAccount;
  accountStore.lastUpdate = new Date('01.01.2021');

  it('renders correctly', () => {
    const tree = render(
      <StoreProvider value={store}>
        <EarningsGraphCard />
      </StoreProvider>,
    );

    expect(tree).toMatchSnapshot();
  });

  it('has week by default', () => {
    render(
      <StoreProvider value={store}>
        <EarningsGraphCard />
      </StoreProvider>,
    );

    const buttonGroup = screen.getByTestId('earnings-graph-card-period-group');
    const weekButton = buttonGroup.children[1];

    const isWeekSelected = weekButton.getAttribute('class')?.includes('makeStyles-selectedPeriodButton');
    expect(isWeekSelected).toBeTruthy();
  });

  it('switches periods', () => {
    render(
      <StoreProvider value={store}>
        <EarningsGraphCard />
      </StoreProvider>,
    );

    const buttonGroup = screen.getByTestId('earnings-graph-card-period-group');
    const dayButton = buttonGroup.children[0];
    const weekButton = buttonGroup.children[1];

    fireEvent.click(dayButton);

    const isDaySelected = dayButton.getAttribute('class')?.includes('makeStyles-selectedPeriodButton');
    const isWeekSelected = weekButton.getAttribute('class')?.includes('makeStyles-selectedPeriodButton');
    expect(isDaySelected).toBeTruthy();
    expect(isWeekSelected).toBeFalsy();
  });

  it('shows and closes vault selector on dropdown click', () => {
    render(
      <StoreProvider value={store}>
        <EarningsGraphCard />
      </StoreProvider>,
    );

    const dropdownButton = screen.getByTestId('earnings-graph-card-dropdown-button');

    fireEvent.click(dropdownButton);

    const vaultSelector = screen.getByTestId('vault-selector-container');
    expect(vaultSelector).toBeVisible();

    fireEvent.click(dropdownButton);

    expect(vaultSelector).not.toBeVisible();
  });

  it('has all vaults checked by default', () => {
    render(
      <StoreProvider value={store}>
        <EarningsGraphCard />
      </StoreProvider>,
    );

    const allCheckbox = screen.getByTestId('vault-selector-vault-all-checkbox');
    const isAllChecked = allCheckbox.getAttribute('class')?.includes('Mui-checked');

    expect(isAllChecked).toBeTruthy();
  });

  it('switches vault avatar on click', () => {
    render(
      <StoreProvider value={store}>
        <EarningsGraphCard />
      </StoreProvider>,
    );

    const vaults = screen.getAllByTestId('vault-selector-vault-list-item');
    const firstVault = vaults[0];

    expect(firstVault.firstChild?.firstChild?.nodeName.toLowerCase()).toBe('svg');

    fireEvent.click(firstVault);

    expect(firstVault.firstChild?.firstChild?.nodeName.toLowerCase()).toBe('img');

    fireEvent.click(firstVault);
  });

  it('unswitches all button on vault click', () => {
    render(
      <StoreProvider value={store}>
        <EarningsGraphCard />
      </StoreProvider>,
    );

    const allCheckbox = screen.getByTestId('vault-selector-vault-all-checkbox');

    expect(allCheckbox.getAttribute('class')?.includes('Mui-checked')).toBeTruthy();

    const vaults = screen.getAllByTestId('vault-selector-vault-list-item');
    const firstVault = vaults[0];

    fireEvent.click(firstVault);

    expect(allCheckbox.getAttribute('class')?.includes('Mui-checked')).toBeFalsy();
  });

  it('unswitches all vaults on all button click', () => {
    render(
      <StoreProvider value={store}>
        <EarningsGraphCard />
      </StoreProvider>,
    );

    const allCheckbox = screen.getByTestId('vault-selector-vault-all-checkbox');

    fireEvent.click(allCheckbox);

    const vaults = screen.getAllByTestId('vault-selector-vault-list-item');

    let areAllUnchecked = true;

    for (let i = 0; i < vaults.length; i++)
      areAllUnchecked = areAllUnchecked && !vaults[i].className.includes('Mui-selected');

    expect(areAllUnchecked).toBeTruthy();
  });
});
