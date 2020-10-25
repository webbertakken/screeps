import { IBinding } from '../colony/interface/IBinding';
import { CreepMemory } from './model/CreepMemory';
import { CreepRole } from './model/CreepRole';
import { Roles } from './Roles';

export class CreepManager implements IBinding {
  id: Id<Creep>;
  name: string;
  role: CreepRole;
  creep: Creep;
  isDead: boolean;

  public constructor(id: Id<Creep>, creep: Creep) {
    this.id = id;
    this.name = creep.name;
    this.role = creep.memory.role;
    this.creep = creep;
    this.isDead = false;
    // Only as backup for self-init
    CreepMemory.init(id, creep.name, creep.memory);
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

  performRole() {
    const role = Roles[this.role];

    if (!role) {
      this.creep.say(`No role 😢`);
      return;
    }

    role.perform(this.creep);
  }
}
