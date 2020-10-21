import { Strategy } from '../../strategy/model/StrategyMemory';
import { ColonyMemory } from './ColonyMemory';
import { StructuresMemory } from '../../structure/model/StructureMemory';
import { RoomsMemory } from '../../room/model/RoomMemory';
import { FlagsMemory } from '../../flag/model/FlagMemory';

declare global {
  interface Memory {
    colony: ColonyMemory;
    creeps: { [name: string]: CreepMemory };
    flags: FlagsMemory;
    rooms: RoomsMemory;
    strategy: Strategy;
    structures: StructuresMemory;
  }
}

export {};
