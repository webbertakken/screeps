declare global {
  interface StructureMemory {
    id: string;
    type: string;
  }
  type StructureMemoryObject = StructureMemory;
}

export class StructureMemory {
  public static get(id: Id<Structure>): StructureMemoryObject | undefined {
    return Memory.structures?.[id];
  }

  public static delete(id: Id<Structure>) {
    delete Memory.structures[id];
  }

  public static init(id: Id<Structure>, type: string) {
    if (!this.get(id)) {
      _.set(Memory, `structures.${id}`, this.create(id, type));
    }
  }

  public static create(id: Id<Structure>, type: string): StructureMemoryObject {
    return {
      id,
      type,
    };
  }
}
