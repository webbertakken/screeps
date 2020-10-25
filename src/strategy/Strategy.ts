import { hasRespawned } from '../service/hasRespawned';
import { ColonyMemory } from '../colony/model/ColonyMemory';

export class Strategy {
  static update() {
    console.log('tick');

    if (hasRespawned()) {
      ColonyMemory.delete();
      console.log(`You're witnessing the beginnings of a new colony. May it flourish!`);
    }
  }
}
