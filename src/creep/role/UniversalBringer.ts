import { implementsStatic } from '../../utils/decorators/staticImplementsDecorator';
import { CreepMemory } from '../model/CreepMemory';
import { ImplementationException } from '../../kernel/exceptions/ImplementationException';
import { CreepManager } from '../CreepManager';
import { IRole } from './IRole';
import { Icon } from '../../service/Icon';

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
          creep.say(Icon.hauling, true);
          creep.moveTo(first);
          if (creep.store.getFreeCapacity(RESOURCE_ENERGY) <= 0) {
            this.setTask(creep, 'bringing');
            this.perform(manager, creep);
          }
          break;
        }
        case OK:
        case ERR_FULL: {
          creep.say(Icon.check, true);
          if (creep.store.getFreeCapacity(RESOURCE_ENERGY) <= 0) {
            this.setTask(creep, 'bringing');
            this.perform(manager, creep);
          }
          break;
        }
        case ERR_BUSY: {
          creep.say(Icon.sprout, true);
          break;
        }
        default: {
          creep.say(Icon.error, true);
          console.log(`[UB][Gather] unhandled case ${result}`);
        }
      }
    }
  }

  private static bring(creep: Creep, manager: CreepManager) {
    const energyTakers = manager.room.getStructuresThatStoreEnergy();

    if (energyTakers.length <= 0) {
      creep.say(Icon.error, true);
      console.log(`There are ${energyTakers.length} takers for energy.`);
      return;
    }

    const target = energyTakers[0].structure;
    const result = creep.transfer(target, 'energy');
    switch (result) {
      case OK:
        if (creep.store.energy <= 3) {
          creep.say(Icon.exclamation, true);
        } else {
          creep.say(Icon.transfer, true);
        }
        break;
      case ERR_NOT_ENOUGH_ENERGY: {
        this.setTask(creep, 'gathering');
        this.perform(manager, creep);
        break;
      }
      case ERR_NOT_IN_RANGE: {
        creep.say(Icon.transfer, true);
        creep.moveTo(target);
        creep.transfer(target, 'energy');
        break;
      }
      default:
        creep.say(Icon.error, true);
        console.log(`[UB][Bring] Unhandled result ${result}`);
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
