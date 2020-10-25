import { Strategy } from '../strategy/model/StrategyMemory';
import { ColonyMemory } from '../colony/model/ColonyMemory';

declare global {
  interface Memory {
    strategy: Strategy;
    colony: ColonyMemory;
    // @ts-ignore
    rooms: { [name: string]: RoomMemoryObject };
    // @ts-ignore
    creeps: { [name: string]: CreepMemoryObject };
    // @ts-ignore
    flags: { [name: string]: FlagMemoryObject };
    // @ts-ignore
    spawns: { [name: string]: SpawnMemoryObject };
    // @ts-ignore
    structures: { [name: string]: StructureMemoryObject };
  }
}

export {};
