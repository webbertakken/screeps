declare global {
  interface FlagMemory {
    name: string;
  }
}

export interface FlagsMemory {
  [name: string]: FlagMemory;
}
