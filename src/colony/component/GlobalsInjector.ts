import { Colony } from '../Colony';
import { CreepManager } from '../../creep/CreepManager';
import { RoomManager } from '../../room/RoomManager';
import { FlagManager } from '../../flag/FlagManager';
import { SpawnManager } from '../../spawn/SpawnManager';
import { StructureManager } from '../../structure/StructureManager';

export class GlobalsInjector {
  colony: Colony;

  constructor(Colony: Colony) {
    this.colony = Colony;

    return this;
  }

  public injectRooms(rooms: { [name: string]: Room }) {
    const existingRoomNames = this.colony.rooms.map((room) => room.name);
    for (const key in rooms) {
      const room = rooms[key];
      const { name } = room;
      if (!existingRoomNames.includes(name)) {
        this.colony.rooms.push(new RoomManager(name, room));
        console.log(`Added room: ${name}`);
      }
    }

    return this;
  }

  public injectCreeps(creeps: { [name: string]: Creep }) {
    const existingCreepIds = this.colony.creeps.map((creep) => creep.id);
    for (const key in creeps) {
      const creep = creeps[key];
      const { id } = creep;
      if (!existingCreepIds.includes(id)) {
        this.colony.creeps.push(new CreepManager(id, creep));
        console.log(`Added creep: ${creep.name}`);
      }
    }

    return this;
  }

  public injectFlags(flags: { [p: string]: Flag }) {
    const existingFlagNames = this.colony.flags.map((flag) => flag.name);
    for (const key in flags) {
      const flag = flags[key];
      const { name } = flag;
      if (!existingFlagNames.includes(name)) {
        this.colony.flags.push(new FlagManager(name, flag));
        console.log(`Added flag: ${flag.name}`);
      }
    }

    return this;
  }

  public injectSpawns(spawns: { [p: string]: StructureSpawn }) {
    const existingSpawnIds = this.colony.spawns.map((spawn) => spawn.id);
    for (const key in spawns) {
      const spawn = spawns[key];
      const { id } = spawn;
      if (!existingSpawnIds.includes(id)) {
        this.colony.spawns.push(new SpawnManager(id, spawn));
        console.log(`Added spawn: ${spawn.name}`);
      }
    }

    return this;
  }

  public injectStructures(structures: { [p: string]: Structure }) {
    const existingStructureIds = this.colony.structures.map((structure) => structure.id);
    for (const key in structures) {
      const structure = structures[key];
      const { id } = structure;
      if (!existingStructureIds.includes(id)) {
        this.colony.structures.push(new StructureManager(id, structure));
        console.log(`Added structure: ${structure.structureType}`);
      }
    }

    return this;
  }
}
