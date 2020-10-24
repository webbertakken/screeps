import { BuildQueueItem } from '../buildQueue/BuildQueue';

declare global {
  interface RoomMemory {
    name: string;
    queue: BuildQueueItem[];
  }
}

export interface RoomsMemory {
  [name: string]: RoomMemory;
}
