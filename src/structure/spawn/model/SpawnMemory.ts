declare global {
  interface SpawnMemory {
    name: string;
  }
}

export interface SpawnsMemory {
  [name: string]: SpawnMemory;
}

export {};
