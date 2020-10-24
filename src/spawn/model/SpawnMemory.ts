declare global {
  interface SpawnMemory {
    name: string;
  }
}

class SpawnMemory {
  public static delete(name: string) {
    delete Memory.spawns[name];
  }
}

export { SpawnMemory };
