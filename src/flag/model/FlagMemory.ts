declare global {
  interface FlagMemory {
    name: string;
  }
  type FlagMemoryObject = FlagMemory;
}

export class FlagMemory {
  public static get(name: string): FlagMemoryObject | undefined {
    return Memory.flags?.[name];
  }

  public static delete(name: string) {
    delete Memory.flags[name];
  }

  public static init(name: string) {
    if (!Memory.flags) {
      Memory.flags = {};
    }

    if (!this.get(name)) {
      Memory.flags[name] = this.create(name);
    }
  }

  public static create(name: string): FlagMemoryObject {
    return {
      name,
    };
  }
}
