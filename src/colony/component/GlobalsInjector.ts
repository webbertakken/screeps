import { Colony } from '../Colony';
import { CreepManager } from '../../creep/CreepManager';
import { RoomManager } from '../../room/RoomManager';
import { FlagManager } from '../../flag/FlagManager';
import { SpawnManager } from '../../spawn/SpawnManager';
import { StructureManager } from '../../structure/StructureManager';
import { DependencyNotLoadedException } from '../../kernel/exceptions/DependencyNotLoadedException';

enum Dependency {
  Flags,
  Structures,
  Spawns,
  Rooms,
  Creeps,
}

export class GlobalsInjector {
  colony: Colony;
  loaded: Dependency[] = [];

  constructor(Colony: Colony) {
    this.colony = Colony;

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

    this.loaded.push(Dependency.Flags);
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

    this.loaded.push(Dependency.Spawns);
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

    this.loaded.push(Dependency.Structures);
    return this;
  }

  public injectRooms(rooms: { [name: string]: Room }) {
    this.checkPrerequisites([Dependency.Spawns]);

    const existingRoomNames = this.colony.rooms.map((room) => room.name);
    for (const key in rooms) {
      const room = rooms[key];
      const { name } = room;
      if (!existingRoomNames.includes(name)) {
        const spawns = this.colony.spawns.filter((spawn) => spawn.roomName === room.name);
        this.colony.rooms.push(new RoomManager(name, room, spawns));
      }
    }

    this.loaded.push(Dependency.Rooms);
    return this;
  }

  public injectCreeps(creeps: { [name: string]: Creep }) {
    this.checkPrerequisites([Dependency.Rooms]);

    const existingCreepIds = this.colony.creeps.map((creep) => creep.id);
    for (const key in creeps) {
      const creep = creeps[key];
      const { id } = creep;
      if (!existingCreepIds.includes(id)) {
        const room = this.colony.rooms.find((room) => room.name === creep.room.name) as RoomManager;
        this.colony.creeps.push(new CreepManager(id, creep, room));
        console.log(`Added creep: ${creep.name}`);
      }
    }

    this.loaded.push(Dependency.Creeps);
    return this;
  }

  private checkPrerequisites(dependencies: Dependency[]): void {
    for (const dependency of dependencies) {
      if (!this.loaded.includes(dependency)) {
        throw new DependencyNotLoadedException(
          `Missing ${Object.values(Dependency)[dependency]}-dependency. Inject them first`,
        );
      }
    }
  }
}
