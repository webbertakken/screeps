import { CreepMemory } from '../creep/model/CreepMemory';

export const cleanup = (): void => {
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      CreepMemory.delete(name);
    }
  }
};
