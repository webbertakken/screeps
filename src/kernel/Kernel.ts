import { Strategy } from '../colony/strategy';
import { showStats } from '../service/showStats';
import { Coordinator } from '../managers/Coordinator';
import { Spawner } from '../managers/Spawner';
import { WorkLeader } from '../managers/WorkLeader';
import { Commander } from '../managers/Commander';
import { hasRespawned } from '../service/hasRespawned';
import { ColonyMemory } from '../colony/model/ColonyMemory';

export class Kernel {
  public runMainThread() {
    this.before();
    this.logic();
    this.after();
  }

  private before() {
    Colony.loadInformation();

    if (hasRespawned()) {
      ColonyMemory.reset();
      console.log(`You're witnessing the beginnings of a new colony. May it flourish!`);
    }

    Strategy.update();
  }

  private logic() {
    Coordinator.planConstructionSites();
    Spawner.checkIfSpawningIsComplete();
    Spawner.spawnWhatIsNeeded();

    // Todo - make sure work leader can work with new roles
    WorkLeader.instructWorkers();
    Commander.instructSoldiers();

    // Initial quick setup
    // for (const room of this.rooms) {
    //   room.run();
    // }
    //

    for (const creep of Colony.creeps) {
      creep.performRole();
    }
  }

  private after() {
    showStats();
  }
}
