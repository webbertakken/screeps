import { CreepRole } from './model/CreepRole';
import { DedicatedHarvester } from './role/DedicatedHarvester';
import { UniversalBringer } from './role/UniversalBringer';
import { IRole } from './role/IRole';

export const Roles: { [role in CreepRole]: IRole | undefined } = {
  hybridHarvester: undefined,
  dedicatedHarvester: DedicatedHarvester,
  universalBringer: UniversalBringer,
  dedicatedTruck: undefined,
  dedicatedBuilder: undefined,
  tank: undefined,
};
