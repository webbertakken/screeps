import { CreepRole } from './model/CreepRole';
import { DedicatedHarvester } from './role/DedicatedHarvester';

export const Roles: { [role in CreepRole]: IRole | undefined } = {
  hybridHarvester: undefined,
  dedicatedHarvester: DedicatedHarvester,
  universalBringer: undefined,
  dedicatedTruck: undefined,
  dedicatedBuilder: undefined,
  tank: undefined,
};
