import { IBinding } from '../colony/interface/IBinding';
import { CreepMemory } from './model/CreepMemory';
import { CreepRole } from './model/CreepRole';
import { Roles } from './Roles';
import { RoomManager } from '../room/RoomManager';
import { Icon } from '../service/Icon';

export class CreepManager implements IBinding {
  id: Id<Creep>;
  name: string;
  role: CreepRole;
  room: RoomManager;
  creep: Creep;

  public constructor(id: Id<Creep>, creep: Creep, room: RoomManager) {
    const { name, memory } = creep;

    this.id = id;
    this.name = name;
    this.role = memory.role;
    this.creep = creep;
    this.room = room;

    // Only as backup for self-init
    CreepMemory.init(name, memory);
  }

  rehydrate(): void {
    const creep = Game.getObjectById<Creep>(this.id);

    if (!creep) return this.remove();

    this.creep = creep;
  }

  performRole(): void {
    const role = Roles[this.role];

    if (!role) {
      this.creep.say(`No role ${Icon.sad}`);
      return;
    }

    role.perform(this, this.creep);

    const { ticksToLive } = this.creep;
    if (ticksToLive && ticksToLive <= 45) {
      this.creep.say(Icon.death);
    }
  }

  remove(): void {
    // Remove from colony
    const index = Colony.creeps.findIndex((manager) => manager.id === this.id);
    Colony.creeps.splice(index, 1);

    // Remove its memory
    const role = CreepMemory.getRole(this.name);
    if (role) {
      CreepMemory.delete(this.name);
      console.log(`Removed ${role} creep ${this.name}`);
    }
  }
}
