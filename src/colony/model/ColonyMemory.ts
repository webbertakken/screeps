import { StrategyMemory, type StrategyMemoryObject } from '../strategy';

export enum Stage {
  TheBeginning,
}

export interface ColonyMemoryMeta {
  startTick: number;
}

export interface ColonyMemoryObject {
  meta: ColonyMemoryMeta;
  stage: Stage;
  strategy: StrategyMemoryObject;
}

export class ColonyMemory {
  public static get(): ColonyMemory | undefined {
    return Memory.colony;
  }

  public static reset() {
    console.log('Colony memory has been reset!');
    Memory.colony = this.create();
  }

  public static create(): ColonyMemoryObject {
    return {
      meta: {
        startTick: Game.time,
      },
      stage: Stage.TheBeginning,
      strategy: StrategyMemory.create(),
    };
  }

  public static init(): void {
    if (this.get() === undefined) {
      this.reset();
    }
  }

  public static get startTick(): number | undefined {
    return Memory?.colony?.meta?.startTick;
  }

  public static setStage(stage: Stage) {
    Memory.colony.stage = stage;
    console.log(`The colony has reached ${Object.values(Stage)[stage]}`);
  }

  public static getStage(): Stage {
    return Memory.colony.stage;
  }
}
