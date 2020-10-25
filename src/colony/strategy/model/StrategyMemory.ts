import { FancyLog } from '../../../service/FancyLog';

export enum Strategies {
  None,
}

export interface StrategyMemoryObject {
  current: Strategies;
}

export class StrategyMemory {
  public static create(): StrategyMemoryObject {
    return {
      current: Strategies.None,
    };
  }

  public static setCurrent(strategy: Strategies): void {
    Memory.colony.strategy.current = strategy;
    console.log(new FancyLog().add(`Strategy was set to ${Object.values(Strategies)[strategy]}.`));
  }

  public static getCurrent(): Strategies {
    return Memory.colony.strategy.current;
  }
}
