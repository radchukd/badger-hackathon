import { action, extendObservable } from 'mobx';
import { RouterStore } from 'mobx-router';
import fetch from 'node-fetch';
import { Account } from '../model/account.interface';
import { SettBalance } from '../model/sett-balance.interface';
import { SettVault } from '../model/sett-vault.interface';

//declare let window: Window & { ethereum };

export class RootStore {
  private baseUrl = 'https://api.badger.finance/v2';
  public router: RouterStore<RootStore>;
  public account?: Account;
  public prices?: Record<string, number>;
  public vaults?: SettVault[];

  constructor() {
    this.router = new RouterStore<RootStore>(this);

    extendObservable(this, {
      account: this.account,
      prices: this.prices,
      vaults: this.vaults,
    });

    this.loadAccount();
    this.loadPrices();
    this.loadVaults();
  }

  loadAccount = action(async (): Promise<void> => {
    /* if (!window.ethereum) {
      console.log('Non-Ethereum browser detected.');
    }

    const addresses: Array<string> = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (addresses.length < 0) {
      console.log('No account found.');
    }

    const web3 = new Web3(Web3.givenProvider);

    addresses.forEach(async (address) => {
      const res = await fetch(`${this.baseUrl}/accounts/${address}`);

      if (res.ok) {
        this.account = await res.json();
        throw new Error('Account is found.');
      }
    }); */

    const res = await fetch(`${this.baseUrl}/accounts/0x4e65175f05b4140a0747c29cce997cd4bb7190d4`);
    if (res.ok) {
      this.account = await res.json();
    }
  });

  loadPrices = action(async (): Promise<void> => {
    const res = await fetch(`${this.baseUrl}/prices`);
    if (res.ok) {
      this.prices = (await res.json()) || [];
    }
  });

  loadVaults = action(async (): Promise<void> => {
    const res = await fetch(`${this.baseUrl}/setts`);
    if (res.ok) {
      this.vaults = (await res.json()) || [];
    }
  });

  get isLoading(): boolean {
    return (
      typeof this.account === 'undefined' || typeof this.prices === 'undefined' || typeof this.vaults === 'undefined'
    );
  }

  get roiPercentage(): number {
    if (!this.account?.value || !this.account?.earnedValue) return 0;
    return this.account?.earnedValue / this.account?.value;
  }

  get totalClaimable(): number {
    return this.account?.claimableBalances?.reduce((prev, cur) => prev + (cur?.balance ?? 0), 0) ?? 0;
  }

  get earnedBadger(): number {
    if (!this.prices) return 0;

    const badgerPrice = this.prices['0x3472A5A71965499acd81997a54BBA8D852C6E53d'];

    if (!badgerPrice || !this.account?.earnedValue) return 0;

    return this.account?.earnedValue / badgerPrice;
  }

  assetValue = (balance: SettBalance): number => {
    return balance.balance ? balance.value / balance.balance : 0;
  };

  assetValueBTC = (balance: SettBalance): number => {
    if (!this.prices) return 0;

    const btcPrice = this.prices['0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'];

    if (!btcPrice) return 0;

    return this.assetValue(balance) / btcPrice;
  };

  allocationDistribution = (type: 'balance' | 'strategy'): Array<{ name: string; value: number }> => {
    const totalAllocation = this.totalAllocation(true, type);

    if (!totalAllocation) return [];

    const top4 =
      this.account?.balances
        ?.slice()
        ?.sort((b1, b2) =>
          type === 'balance'
            ? Math.abs(b2.value) - Math.abs(b1.value)
            : Math.abs(b2.earnedValue) - Math.abs(b1.earnedValue),
        )
        ?.slice(0, 4)
        ?.map(({ asset, value, earnedValue }) => ({
          name: asset,
          value: Math.abs((type === 'balance' ? value : earnedValue) / totalAllocation),
        })) ?? [];
    const top4total = top4?.reduce((prev, cur) => prev + cur.value ?? 0, 0);
    const other = { name: 'Other', value: 1 - top4total };
    return [...top4, other];
  };

  allocationPerAsset = (value: number, type: 'balance' | 'strategy'): number => {
    const totalAllocation = this.totalAllocation(true, type);

    if (!totalAllocation) return 0;

    return Math.abs(value / totalAllocation);
  };

  totalAllocation = (abs: boolean, type: 'balance' | 'strategy'): number => {
    return (
      this.account?.balances?.reduce((prev, cur) => {
        const curValue = (type === 'balance' ? cur.value : cur.earnedValue) ?? 0;
        return prev + (abs ? Math.abs(curValue) : curValue);
      }, 0) ?? 0
    );
  };

  strategyROI = (asset: string): number => {
    if (!this.vaults) return 0;

    const vault = this.vaults.find((vault) => vault.asset === asset);

    if (!vault) return 0;

    return vault.apr;
  };
}

const store = new RootStore();

export default store;
