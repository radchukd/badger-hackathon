import { action, extendObservable } from 'mobx';
import { RouterStore } from 'mobx-router';
import fetch from 'node-fetch';
import { Account } from '../model/account.interface';

export class RootStore {
  private baseUrl = 'https://staging-api.badger.finance/v2';
  public router: RouterStore<RootStore>;
  public account?: Account;

  constructor() {
    this.router = new RouterStore<RootStore>(this);

    extendObservable(this, {
      account: this.account,
    });

    // load random test account
    this.loadAccount('0x4e65175f05b4140a0747c29cce997cd4bb7190d4');
  }

  loadAccount = action(async (address: string): Promise<void> => {
    const res = await fetch(`${this.baseUrl}/accounts/${address}`);
    if (res.ok) {
      this.account = await res.json();
    }
  });
}

const store = new RootStore();

export default store;
