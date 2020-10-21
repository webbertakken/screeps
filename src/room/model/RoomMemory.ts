// Global because it's declared in @types/screeps
declare global {
  interface RoomMemory {
    name: string;
  }
}

export interface RoomsMemory {
  [name: string]: RoomMemory;
}
