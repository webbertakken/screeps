import { Strategies as StrategyOption, StrategyMemory } from './model/StrategyMemory';

export class Strategy {
  public static update() {
    console.log('tick', Game.time);
  }

  public static setTo(strategy: StrategyOption) {
    StrategyMemory.setCurrent(strategy);
    Colony._strategy = strategy;
  }
}
