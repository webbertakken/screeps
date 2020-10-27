import { implementsStatic } from '../../utils/decorators/staticImplementsDecorator';
import { IRole } from './IRole';
import { CreepManager } from '../CreepManager';
import { Icon } from '../../service/Icon';

@implementsStatic<IRole>()
export class DedicatedHarvester {
  public static perform(manager: CreepManager, creep: Creep): void {
    const sources = this.findSources(creep);
    const result = creep.harvest(sources[0]);
    switch (result) {
      case ERR_NOT_IN_RANGE:
        creep.say(Icon.gather, true);
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        break;
      case OK:
        creep.say(Icon.gather, true);
        break;
      default:
        creep.say(Icon.error, true);
        console.log(`[DH] unhandled case ${result}`);
    }
  }

  private static findSources(creep: Creep) {
    return creep.room.find(FIND_SOURCES);
  }
}
