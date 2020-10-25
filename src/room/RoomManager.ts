import { BuildQueue } from './buildQueue/BuildQueue';
import { CreepBlueprintFactory } from '../creep/model/CreepBlueprintFactory';
import { IBinding } from '../colony/interface/IBinding';
import { RoomMemory } from './model/RoomMemory';
import { SpawnManager } from '../spawn/SpawnManager';

export class RoomManager implements IBinding {
  name: string;
  room: Room;
  isDefeated?: boolean;

  public constructor(name: string, room: Room) {
    this.name = name;
    this.room = room;
    RoomMemory.init(name);
  }

  public run() {
    const manager = Colony.spawns.find((manager) => manager.spawn.room.name === this.room.name) as SpawnManager;
    const spawn = manager.spawn;

    // Initial stage
    if (this.room.energyCapacityAvailable <= 300) {
      if (Colony.creeps.length <= 0) {
        // Can't build any creep yet
        if (this.room.energyAvailable < 150) {
          return;
        }

        // Build the queue if any
        const firstQueueItem = BuildQueue.peek(this.room);
        console.log(firstQueueItem);
        if (firstQueueItem) {
          const { layout, name, role } = firstQueueItem.blueprint;
          const memory = { role, name, id: name as Id<Creep> };
          if (OK === spawn.spawnCreep(layout, name, { dryRun: true, memory })) {
            BuildQueue.dequeue(this.room).blueprint;
            spawn.spawnCreep(layout, name, { memory });
          }

          return;
        }

        // Best case queue schedule
        if (this.room.energyAvailable >= 300) {
          BuildQueue.enqueue(this.room, CreepBlueprintFactory.createInitialDedicatedHarvesterBlueprint());
          BuildQueue.enqueue(this.room, CreepBlueprintFactory.createInitialUniversalBringerBlueprint());
          return;
        }

        // Worst case queue schedule
        BuildQueue.enqueue(this.room, CreepBlueprintFactory.createCheapInitialHybridHarvesterBlueprint());
      }
    }
  }

  rehydrate(): void {
    const room = Game.rooms[this.name];

    if (!room) {
      const id = Colony.rooms.findIndex((manager) => manager.name === this.name);
      delete Colony.rooms[id];
      RoomMemory.delete(this.name);
      console.log(`Removed room ${this.name}`);
      return;
    }

    this.room = room;
  }
}
