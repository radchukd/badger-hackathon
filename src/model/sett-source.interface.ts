import { SettPerformance } from './sett-performance.interface';

export interface SettSource {
  name: string;
  apr: number;
  boostable: boolean;
  harvestable: boolean;
  performance: SettPerformance;
  minApr: number;
  maxApr: number;
}
