import { ColonyMemoryObject } from './model/ColonyMemory';

declare global {
  interface ExtendedMemory {
    [key: string]: any;
    colony: ColonyMemoryObject;
    rooms: { [name: string]: RoomMemoryObject };
    creeps: { [name: string]: CreepMemoryObject };
    flags: { [name: string]: FlagMemoryObject };
    spawns: { [name: string]: SpawnMemoryObject };
    structures: { [name: string]: StructureMemoryObject };
  }

  interface Memory extends ExtendedMemory {}
}

export {};
