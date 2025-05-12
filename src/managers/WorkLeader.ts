export class WorkLeader {
  static instructWorkers() {
    const { workers, mySpawn, myExtensions, myConstructionSites, sources, containers } = Colony;

    for (const worker of workers) {
      if (!worker || worker.data.isSpawning) continue;

      if (worker.store.getFreeCapacity(RESOURCE_ENERGY)) {
        const closestContainer = worker.pos.findClosestByRange(containers.filter((i) => i.store.energy > 0));
        const closestSource = worker.pos.findClosestByRange(sources);

        if (closestContainer) {
          if (worker.withdraw(closestContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            worker.moveTo(closestContainer);
          }
        } else if (closestSource) {
          if (worker.harvest(closestSource) === ERR_NOT_IN_RANGE) {
            worker.moveTo(closestSource);
          }
        }
      } else {
        const closestNonFullExtension = worker.pos.findClosestByRange(
          myExtensions.filter((i) => i.store.getFreeCapacity(RESOURCE_ENERGY)),
        );
        if (closestNonFullExtension) {
          if (worker.transfer(closestNonFullExtension, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            worker.moveTo(closestNonFullExtension);
          }
        } else if (mySpawn.store.getFreeCapacity(RESOURCE_ENERGY)) {
          if (worker.transfer(mySpawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            worker.moveTo(mySpawn);
          }
        } else if (myConstructionSites.length > 0) {
          const buildResult = worker.build(myConstructionSites[0]);
          // Todo - properly build stuff
          //console.log('build result', buildResult)
          if (buildResult === ERR_NOT_IN_RANGE) {
            worker.moveTo(myConstructionSites[0]);
          }
        } else {
          if (worker.transfer(mySpawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            worker.moveTo(mySpawn);
          }
        }
      }
    }
  }
}
