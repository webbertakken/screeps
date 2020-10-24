import { IBinding } from '../colony/interface/IBinding';
import { CreepMemory } from './model/CreepMemory';

export class CreepManager implements IBinding {
  id: Id<Creep>;
  creep: Creep;
  isDead: boolean;

  public constructor(id: Id<Creep>, creep: Creep) {
    this.id = id;
    this.creep = creep;
    this.isDead = false;
  }

  rehydrate(): void {
    const creep = Game.getObjectById<Creep>(this.id);

    if (!creep) {
      const id = Colony.creeps.findIndex((manager) => manager.id === this.id);
      delete Colony.creeps[id];
      const role = CreepMemory.getRole(this.id);
      if (role) {
        CreepMemory.delete(this.id);
        console.log(`Removed ${role} creep ${this.id}`);
      }
      return;
    }

    this.creep = creep;
  }
}
