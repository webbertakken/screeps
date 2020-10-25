import { BuildQueueItem } from '../buildQueue/BuildQueue';

declare global {
  interface RoomMemory {
    name: string;
    queue: BuildQueueItem[];
  }
  type RoomMemoryObject = RoomMemory;
}

export class RoomMemory {
  public static get(name: string): RoomMemoryObject | undefined {
    return Memory.rooms?.[name];
  }

  public static delete(name: string): void {
    delete Memory.rooms[name];
  }

  public static init(name: string) {
    if (!this.get(name)) {
      _.set(Memory, `rooms.${name}`, this.create(name));
    }
  }

  public static create(name: string): RoomMemoryObject {
    return {
      name,
      queue: [],
    };
  }
}
