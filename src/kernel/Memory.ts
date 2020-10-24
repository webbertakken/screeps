import { Strategy } from '../strategy/model/StrategyMemory';
import { ColonyMemory } from '../colony/model/ColonyMemory';
import { RoomMemory } from '../room/model/RoomMemory';
import { FlagMemory } from '../flag/model/FlagMemory';
import { SpawnMemory } from '../spawn/model/SpawnMemory';
import { CreepMemory } from '../creep/model/CreepMemory';
import { StructureMemory } from '../structure/model/StructureMemory';

declare global {
  interface Memory {
    strategy: Strategy;
    colony: ColonyMemory;
    // @ts-ignore
    creeps: { [name: string]: CreepMemory };
    // @ts-ignore
    flags: { [name: string]: FlagMemory };
    // @ts-ignore
    rooms: { [name: string]: RoomMemory };
    // @ts-ignore
    spawns: { [name: string]: SpawnMemory };
    // @ts-ignore
    structures: { [name: string]: StructureMemory };
  }
}

export {};
