export interface ColonyMemoryMeta {
  startTick: number;
}
export interface ColonyMemory {
  meta: ColonyMemoryMeta;
}

export class ColonyMemory {
  public static get startTick(): number {
    return Memory.colony.meta.startTick;
  }

  public static reset(startTick: number): void {
    Memory.colony = {
      meta: {
        startTick,
      },
    };
  }
}
