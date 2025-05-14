import { implementsStatic } from '../../../utils/decorators/staticImplementsDecorator';
import { IRoomTactic } from '../IRoomTactic';
import { RoomManager } from '../../RoomManager';
import { BuildQueue } from '../../buildQueue/BuildQueue';
import { CreepBlueprintFactory } from '../../../creep/model/CreepBlueprintFactory';

@implementsStatic<IRoomTactic>()
export class InitialSetup {
  public static execute(manager: RoomManager) {
    this.ensureStarterCreeps(manager);
    this.buildFromQueue(manager);
  }

  private static ensureStarterCreeps(manager: RoomManager) {
    const { room } = manager;

    // Every source should have a harvester and bringer, they should scale from 150 to 300 energy.
    manager.getSources().forEach((source) => {
      const harvesters = room.find(FIND_MY_CREEPS, {
        filter: (creep) => creep.memory.role === 'dedicatedHarvester' && creep.memory.sourceId === source.id,
      });

      if (harvesters.length <= 0) {
        BuildQueue.enqueue(room, CreepBlueprintFactory.createInitialDedicatedHarvesterBlueprint(), {
          sourceId: source.id,
        });
      }

      const bringers = room.find(FIND_MY_CREEPS, {
        filter: (creep) => creep.memory.role === 'universalBringer' && creep.memory.sourceId === source.id,
      });

      if (bringers.length <= 0) {
        BuildQueue.enqueue(room, CreepBlueprintFactory.createInitialUniversalBringerBlueprint(), {
          sourceId: source.id,
        });
      }
    });
  }

  private static buildFromQueue(manager: RoomManager): void {
    const { room, spawns } = manager;

    // Let each spawn try to build something
    for (const spawn of spawns) {
      // Continue with other things
      const firstQueueItem = BuildQueue.peek(room);
      if (!firstQueueItem) {
        return;
      }

      const { blueprint, memory } = firstQueueItem;
      if (spawn.build(blueprint, memory)) {
        BuildQueue.dequeue(room);
      }
    }
  }
}
