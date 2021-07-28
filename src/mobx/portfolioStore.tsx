import { action, makeAutoObservable } from 'mobx';

export type Vault = { id: number; value: string; tags: Array<string> };

export class PortfolioStore {
  public selectedVault?: Vault;
  public vaults: Array<Array<Vault>> = [
    [
      { id: 0, value: 'wBTC/Digg', tags: ['UNI'] },
      { id: 1, value: 'Badger/wBTC', tags: ['UNI'] },
    ],
    [
      { id: 2, value: 'Wrapped BTC/Digg', tags: ['SUSHI'] },
      { id: 3, value: 'Wrapped BTC/Badger', tags: ['SUSHI'] },
      { id: 4, value: 'Wrapped BTC/Wrapped Ether', tags: ['SUSHI'] },
    ],
    [
      { id: 5, value: 'crvRenWBTC', tags: ['CURVE'] },
      { id: 6, value: 'renBTC/wBTC/sBTC', tags: ['CURVE'] },
      { id: 7, value: 'tBTC/sBTCCrv LP', tags: ['CURVE'] },
      { id: 8, value: 'crvRenWBTC', tags: ['CURVE', 'HARVEST'] },
    ],
  ];
  public selectedVaults: Array<number> = this.vaults.flat().map((vault) => vault.id);

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedVault = action((vault: string | undefined): void => {
    if (vault === undefined) {
      this.selectedVault = undefined;
    } else {
      const normalizedName = vault.replace('Sushiswap ', '').replace('Convex ', '');
      this.selectedVault = this.vaults.flat().find((v) => v.value === normalizedName);
    }
  });

  get areAllSelected(): boolean {
    return this.vaults.flat().length === this.selectedVaults.length;
  }

  isVaultSelected = (vault: Vault): boolean => {
    return this.selectedVaults.includes(vault.id);
  };

  onAllClick = action((): void => {
    if (this.areAllSelected) this.selectedVaults = [];
    else this.selectedVaults = this.vaults.flat().map((vault) => vault.id);
  });

  onVaultClick = action((vault: Vault): void => {
    this.selectedVaults = this.isVaultSelected(vault)
      ? this.selectedVaults.filter((selectedVaultId) => selectedVaultId !== vault.id)
      : [...this.selectedVaults, vault.id];
  });
}
