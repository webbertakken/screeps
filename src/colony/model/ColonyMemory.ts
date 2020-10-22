export interface ColonyMemoryMeta {
  startTick: number;
}
export interface ColonyMemory {
  name: string;
  home: string;
  meta: ColonyMemoryMeta;
}

export class ColonyMemory {
  public static get startTick(): number {
    return Memory.colony.meta.startTick;
  }
}
