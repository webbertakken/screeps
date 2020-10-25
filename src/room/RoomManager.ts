import { IBinding } from '../colony/interface/IBinding';
import { RoomMemory } from './model/RoomMemory';
import { SpawnManager } from '../spawn/SpawnManager';
import { RoomTactician } from './tactics/RoomTactician';

export class RoomManager implements IBinding {
  name: string;
  room: Room;
  spawns: SpawnManager[];
  isDefeated?: boolean;

  private _myStructures: Structure[] = [];

  public constructor(name: string, room: Room, spawns: SpawnManager[]) {
    this.name = name;
    this.room = room;
    this.spawns = spawns;
    RoomMemory.init(name);
  }

  public run(): void {
    const instructions = RoomTactician.getInstructions();
    if (!instructions) {
      console.log(`No instructions were given for room ${this.room.name}`);
      return;
    }

    instructions.execute(this);
  }

  rehydrate(): void {
    const room = Game.rooms[this.name];

    if (!room) {
      const id = Colony.rooms.findIndex((manager) => manager.name === this.name);
      delete Colony.rooms[id];
      RoomMemory.delete(this.name);
      console.log(`Removed room ${this.name}`);
      return;
    }

    this.spawns = Colony.spawns.filter((spawn) => spawn.roomName === this.name);
    this.room = room;
  }

  public getMyStructures() {
    if (this._myStructures === undefined) {
      this._myStructures = this.room.find(FIND_MY_STRUCTURES);
    }

    return this._myStructures;
  }

  getEnergyTakers(): (Creep | PowerCreep | Structure<StructureConstant>[])[] {
    const inNeed = [];
    inNeed.push(this.getMyStructures().filter((structure) => structure.structureType === STRUCTURE_SPAWN));
    return inNeed;
  }
}
