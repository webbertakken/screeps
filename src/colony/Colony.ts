import { hasRespawned } from '../service/hasRespawned';
import { ColonyMemory } from './model/ColonyMemory';
import { CreepMemory } from '../creep/model/CreepMemory';

export class Colony {
  public hasRespawned(): boolean {
    return hasRespawned();
  }

  public reset(): this {
    ColonyMemory.reset(Game.time);

    this.reIndexExisting();
    console.log(`You're witnessing the beginnings of a new colony. May it flourish!`);

    return this;
  }

  private reIndexExisting(): void {
    // Todo - index all creeps, structures and rooms
  }

  public cleanup() {
    // Delete memory of missing creeps
    for (const name in Memory.creeps) {
      if (Game.creeps[name] === undefined) {
        CreepMemory.delete(name);
      }
    }
  }
}
