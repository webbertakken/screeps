import { CreepBlueprint } from '../../creep/model/CreepBlueprint';

interface BuildQueueItem {
  blueprint: CreepBlueprint;
  memory: CreepMemory;
}

// Todo - add to some room manager, static for now

class BuildQueue {
  public static size(room: Room) {
    return room.memory.queue.length;
  }

  public static ensure(room: Room) {
    room.memory.queue = [];
  }

  public static enqueue(room: Room, blueprint: CreepBlueprint, memory: Omit<CreepMemory, 'name' | 'role'> = {}): void {
    const { name, role } = blueprint;
    const queueItem: BuildQueueItem = {
      blueprint,
      memory: { ...memory, name, role },
    };

    room.memory.queue.push(queueItem);
  }

  public static peek(room: Room): BuildQueueItem {
    return room.memory.queue[0];
  }

  public static dequeue(room: Room): BuildQueueItem {
    return room.memory.queue.shift() as BuildQueueItem;
  }
}

export { BuildQueue, BuildQueueItem };
