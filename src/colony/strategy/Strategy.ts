import { hasRespawned } from '../../service/hasRespawned';
import { ColonyMemory } from '../model/ColonyMemory';
import { Strategies as StrategyOption, StrategyMemory } from './model/StrategyMemory';

export class Strategy {
  public static update() {
    console.log('tick');

    if (hasRespawned()) {
      ColonyMemory.delete();
      console.log(`You're witnessing the beginnings of a new colony. May it flourish!`);
    }
  }

  public static setTo(strategy: StrategyOption) {
    StrategyMemory.setCurrent(strategy);
    Colony._strategy = strategy;
  }
}
