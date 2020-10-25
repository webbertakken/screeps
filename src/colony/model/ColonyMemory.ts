export enum Stage {
  TheBeginning,
}

export interface ColonyMemoryMeta {
  startTick: number;
}

export interface ColonyMemory {
  meta: ColonyMemoryMeta;
  stage: Stage;
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
      stage: Stage.TheBeginning,
    };
  }

  public static get startTick(): number | undefined {
    return Memory?.colony?.meta?.startTick;
  }

  public static setStage(stage: Stage) {
    Memory.colony.stage = stage;
    console.log(`The colony has reached ${Object.values(Stage)[stage]}`);
  }
}
