import { implementsStatic } from '../../utils/decorators/staticImplementsDecorator';
import { CreepMemory } from '../model/CreepMemory';
import { ImplementationException } from '../../kernel/exceptions/ImplementationException';
import { CreepManager } from '../CreepManager';
import { IRole } from './IRole';

type BringerTask = undefined | 'gathering' | 'bringing';

@implementsStatic<IRole>()
export class UniversalBringer {
  public static perform(manager: CreepManager, creep: Creep): void {
    const task = this.getTask(creep);
    switch (task) {
      case undefined:
        return this.findTask(creep);
      case 'gathering':
        return this.gather(creep, manager);
      case 'bringing':
        return this.bring(creep, manager);
      default:
        throw new ImplementationException(`Task '${task}' is not handled for ${typeof UniversalBringer}`);
    }
  }

  private static findTask(creep: Creep) {
    this.setTask(creep, 'gathering');
  }

  private static gather(creep: Creep, manager: CreepManager) {
    const energySources = this.findEnergy(creep);
    if (energySources.length >= 1) {
      const [first] = energySources;
      const result = creep.pickup(first);
      switch (result) {
        case ERR_NOT_IN_RANGE: {
          creep.moveTo(first);
          break;
        }
        case OK: {
          if (creep.store.getFreeCapacity(RESOURCE_ENERGY) <= 0) {
            this.setTask(creep, 'bringing');
            this.perform(manager, creep);
          }
          break;
        }
        case ERR_FULL: {
          this.setTask(creep, 'bringing');
          this.perform(manager, creep);
        }
        default:
          console.log(`[UB][Gather] unhandled case ${result}`);
      }
    }
  }

  private static bring(creep: Creep, manager: CreepManager) {
    const energyTakers = manager.room.getEnergyTakers();
    // console.log(JSON.stringify(energyTakers, null, 2));
    if (energyTakers.length >= 1) {
      // const result = creep.transfer(energyTakers[0], 'energy')
    }
  }

  private static findEnergy(creep: Creep) {
    return creep.room.find(FIND_DROPPED_RESOURCES);
  }

  private static getTask(creep: Creep): BringerTask {
    return CreepMemory.getTask(creep) as BringerTask;
  }

  private static setTask(creep: Creep, task: BringerTask) {
    CreepMemory.setTask(creep, task);
  }
}
