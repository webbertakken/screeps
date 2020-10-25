export interface ColonyMemoryMeta {
  startTick: number;
}

export interface ColonyMemory {
  meta: ColonyMemoryMeta;
}

export class ColonyMemory {
  public static get(): ColonyMemory | undefined {
    return Memory.colony;
  }

  public static delete(): void {
    delete Memory.colony;
  }

  public static init() {
    if (!this.get()) {
      _.set(Memory, 'colony', this.create());
    }
  }

  public static create(): ColonyMemory {
    return {
      meta: {
        startTick: Game.time,
      },
    };
  }

  public static get startTick(): number | undefined {
    return Memory?.colony?.meta?.startTick;
  }
}
