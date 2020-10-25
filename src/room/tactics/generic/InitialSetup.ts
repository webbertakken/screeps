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
    if (Colony.creeps.length <= 0 && BuildQueue.size(room) <= 0) {
      BuildQueue.enqueue(room, CreepBlueprintFactory.createInitialDedicatedHarvesterBlueprint());
      BuildQueue.enqueue(room, CreepBlueprintFactory.createInitialUniversalBringerBlueprint());
    }
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

      const { blueprint } = firstQueueItem;
      if (spawn.build(blueprint)) {
        BuildQueue.dequeue(room);
      }
    }
  }
}
