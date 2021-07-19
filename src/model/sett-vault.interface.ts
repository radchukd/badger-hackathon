import { SettSource } from './sett-source.interface';
import { TokenBalance } from './token-balance.interface';

export interface SettVault {
  name: string;
  asset: string;
  state: string;
  underlyingToken: string;
  vaultToken: string;
  value: number;
  balance: number;
  ppfs: number;
  tokens: TokenBalance[];
  apr: number;
  boostable: boolean;
  minApr: number;
  maxApr: number;
  sources: SettSource[];
  hasBouncer: boolean;
  experimental: false;
}
