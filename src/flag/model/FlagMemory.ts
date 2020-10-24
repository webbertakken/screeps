declare global {
  interface FlagMemory {
    name: string;
  }
}

class FlagMemory {
  public static delete(name: string) {
    delete Memory.flags[name];
  }
}

export { FlagMemory };
