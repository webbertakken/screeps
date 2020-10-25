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
    const { name, memory } = creep;

    this.id = id;
    this.name = name;
    this.role = memory.role;
    this.creep = creep;
    this.isDead = false;

    // Only as backup for self-init
    CreepMemory.init(name, memory);
  }

  rehydrate(): void {
    const creep = Game.getObjectById<Creep>(this.id);

    if (!creep) {
      // Remove from colony
      const id = Colony.creeps.findIndex((manager) => manager.id === this.id);
      delete Colony.creeps[id];

      // Remove its memory
      const role = CreepMemory.getRole(this.name);
      if (role) {
        CreepMemory.delete(this.name);
        console.log(`Removed ${role} creep ${this.name}`);
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
