import { BuildQueue } from '../room/buildQueue/BuildQueue';
import { CreepBlueprintFactory } from '../creep/model/CreepBlueprintFactory';

export class Strategy {
  static execute() {
    console.log('executing', Game.time);
    Colony.cleanup();

    // Initial quick setup
    for (const room of Rooms) {
      const spawn = Spawns.find((spawn) => spawn.room.name === room.name) as StructureSpawn;

      // Initial stage
      if (room.energyCapacityAvailable <= 300) {
        if (Creeps.length <= 0) {
          // Can't build any creep yet
          if (room.energyAvailable < 150) {
            return;
          }

          // Build the queue if any
          const firstQueueItem = BuildQueue.peek(room);
          console.log(firstQueueItem);
          if (firstQueueItem) {
            const { layout, name } = firstQueueItem.blueprint;
            if (OK === spawn.spawnCreep(layout, name, { dryRun: true })) {
              const { layout, name } = BuildQueue.dequeue(room).blueprint;
              spawn.spawnCreep(layout, name);
            }

            return;
          }

          // Best case queue schedule
          if (room.energyAvailable >= 300) {
            BuildQueue.enqueue(room, CreepBlueprintFactory.createInitialDedicatedHarvesterBlueprint());
            BuildQueue.enqueue(room, CreepBlueprintFactory.createInitialUniversalBringerBlueprint());
            return;
          }

          // Worst case queue schedule
          BuildQueue.enqueue(room, CreepBlueprintFactory.createCheapInitialHybridHarvesterBlueprint());
        }
      }
    }
  }
}
