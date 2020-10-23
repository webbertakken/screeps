declare global {
  interface RoomMemory {
    name: string;
  }
}

export interface RoomsMemory {
  [name: string]: RoomMemory;
}
