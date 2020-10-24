import { BuildQueue } from '../room/buildQueue/BuildQueue';
import { CreepBlueprintFactory } from '../creep/model/CreepBlueprintFactory';
import { RoomManager } from '../room/RoomManager';
import { hasRespawned } from '../service/hasRespawned';
import { ColonyMemory } from '../colony/model/ColonyMemory';

export class Strategy {
  static execute() {
    console.log('tick', Game.time);

    if (hasRespawned()) {
      ColonyMemory.reset(Game.time);
      console.log(`You're witnessing the beginnings of a new colony. May it flourish!`);
    }

    // Initial quick setup
    for (const room of Colony.rooms) {
      room.run();
    }
  }
}
