import { implementsStatic } from '../../utils/decorators/staticImplementsDecorator';
import { IRole } from './IRole';
import { CreepManager } from '../CreepManager';

@implementsStatic<IRole>()
export class DedicatedHarvester {
  public static perform(manager: CreepManager, creep: Creep): void {
    const sources = this.findSources(creep);
    if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
    }
  }

  private static findSources(creep: Creep) {
    return creep.room.find(FIND_SOURCES);
  }
}
