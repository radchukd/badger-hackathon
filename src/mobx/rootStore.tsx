import { RouterStore } from 'mobx-router';
import React from 'react';

import { AccountStore } from './accountStore';
import { PortfolioStore } from './portfolioStore';

export class RootStore {
  public router: RouterStore<RootStore>;

  constructor() {
    this.router = new RouterStore<RootStore>(this);
  }
}

export const rootStore = new RootStore();

export const accountStore = new AccountStore({ preload: true });

export const portfolioStore = new PortfolioStore();

export interface IStoreContext {
  rootStore: RootStore;
  accountStore: AccountStore;
  portfolioStore: PortfolioStore;
}

export const StoreContext = React.createContext({} as IStoreContext);

export const StoreProvider = StoreContext.Provider;
