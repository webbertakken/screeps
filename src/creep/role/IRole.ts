import { CreepManager } from '../CreepManager';

export interface IRole {
  new (): any;
  perform: ((manager: CreepManager, creep: Creep) => void) | (() => void);
}
