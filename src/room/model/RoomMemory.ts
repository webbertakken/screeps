import { BuildQueueItem } from '../buildQueue/BuildQueue';

declare global {
  interface RoomMemory {
    name: string;
    queue: BuildQueueItem[];
  }
}

class RoomMemory {
  public static delete(name: string): void {
    delete Memory.rooms[name];
  }
}

export { RoomMemory };
