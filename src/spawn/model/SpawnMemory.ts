declare global {
  interface SpawnMemory {
    id: Id<StructureSpawn>;
  }
  type SpawnMemoryObject = SpawnMemory;
}

export class SpawnMemory {
  public static get(id: Id<StructureSpawn>): SpawnMemoryObject | undefined {
    return Memory.spawns?.[id];
  }

  public static delete(id: Id<StructureSpawn>) {
    delete Memory.spawns[id];
  }

  public static init(id: Id<StructureSpawn>) {
    if (!this.get(id)) {
      Memory.spawns[id] = this.create(id);
    }
  }

  public static create(id: Id<StructureSpawn>): SpawnMemoryObject {
    return {
      id,
    };
  }
}
