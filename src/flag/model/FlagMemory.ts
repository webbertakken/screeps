// Global because it's declared in @types/screeps
declare global {
  interface FlagMemory {
    name: string;
  }
}

export interface FlagsMemory {
  [name: string]: FlagMemory;
}
