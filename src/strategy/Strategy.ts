import { hasRespawned } from '../service/hasRespawned';
import { ColonyMemory } from '../colony/model/ColonyMemory';

export class Strategy {
  static execute() {
    console.log('tick', Game.time);

    if (hasRespawned()) {
      ColonyMemory.delete();
      console.log(`You're witnessing the beginnings of a new colony. May it flourish!`);
    }

    // Initial quick setup
    for (const room of Colony.rooms) {
      room.run();
    }
  }
}
