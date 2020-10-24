declare global {
  interface StructureMemory {
    name: string;
  }
}

class StructureMemory {
  public static delete(name: string) {
    delete Memory.structures[name];
  }
}

export { StructureMemory };
