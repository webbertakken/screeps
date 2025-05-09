import { IBinding } from '../colony/interface/IBinding';
import { RoomMemory } from './model/RoomMemory';
import { SpawnManager } from '../spawn/SpawnManager';
import { RoomTactician } from './tactics/RoomTactician';
import { StructureManager } from '../structure/StructureManager';

export class RoomManager implements IBinding {
  name: string;
  room: Room;
  spawns: SpawnManager[];
  structures: StructureManager[];

  private _myStructures: Structure[] = [];

  public constructor(name: string, room: Room, spawns: SpawnManager[], structures: StructureManager[]) {
    this.name = name;
    this.room = room;
    this.spawns = spawns;
    this.structures = structures;
    RoomMemory.init(name);
  }

  public run(): void {
    const instructions = RoomTactician.getInstructions();
    if (!instructions) {
      console.log(`No instructions were given for room ${this.room.name}`);
      return;
    }

    console.log(`Running instructions for room ${this.room.name}`);

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

    this.structures = Colony.structures.filter((structure) => structure.roomName === this.name);
    this.spawns = Colony.spawns.filter((spawn) => spawn.roomName === this.name);
    this.room = room;
  }

  public getMyStructures() {
    return this.structures.filter((s) => s.owned);
  }

  public getStructuresThatStoreEnergy() {
    return this.structures.filter((s) => s.storesEnergy);
  }
}
