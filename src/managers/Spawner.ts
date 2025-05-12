import { InitialSetup } from '../room/tactics/generic/InitialSetup';

export class Spawner {
  static spawnWhatIsNeeded() {
    const { mySpawn, workers, soldiers, spawns } = Colony;

    const firstRoom = Colony.rooms.find((room) => room.name == mySpawn.room.name)!;

    InitialSetup.execute(firstRoom);
    // Todo - change from Arena to Colony style spawning
    // Spawn
    // if (workers.length < 1) {
    //   const initialTruck = UnitData.initialTruck(workers.length);
    //   if (mySpawn.spawnCreep(initialTruck.body, initialTruck.name) === OK) {
    //     const worker = Game.creeps[initialTruck.name] as Worker | undefined;
    //     if (!worker) console.error('Unexpected error: worker not found');
    //     if (worker) workers.push(Worker.create(worker, initialTruck));
    //   }
    // } else if (workers.length < 2) {
    //   const initialBuilder = UnitData.secondTruck(workers.length);
    //   mySpawn.spawnCreep(initialBuilder.body, initialBuilder.name);
    //   const worker = Game.creeps[initialBuilder.name] as Worker | undefined;
    //   if (worker) workers.push(Worker.create(worker, initialBuilder));
    // } else if (workers.length < 3) {
    //   const firstBuilder = UnitData.firstWorker(workers.length);
    //   mySpawn.spawnCreep(firstBuilder.body, firstBuilder.name);
    //   const worker = Game.creeps[firstBuilder.name] as Worker | undefined;
    //   if (worker) workers.push(Worker.create(worker, firstBuilder));
    // } else if (soldiers.length < 6) {
    //   const firstRanged = UnitData.firstRanged(soldiers.length);
    //   mySpawn.spawnCreep(firstRanged.body, firstRanged.name);
    //   const soldier = Game.creeps[firstRanged.name] as Soldier | undefined;
    //   if (soldier) soldiers.push(Soldier.create(soldier, firstRanged));
    // } else if (soldiers.length < 7) {
    //   const firstHealer = UnitData.firstHealer(soldiers.length);
    //   mySpawn.spawnCreep(firstHealer.body, firstHealer.name);
    //   const soldier = Game.creeps[firstHealer.name] as Soldier | undefined;
    //   if (soldier) soldiers.push(Soldier.create(soldier, firstHealer));
    // }
  }

  static checkIfSpawningIsComplete() {
    const { mySpawn, myUnits } = Colony;

    for (const unit of myUnits) {
      if (unit.data.isSpawning) {
        unit.moveTo(mySpawn);
        console.log(
          'unit',
          unit.pos.x,
          unit.pos.y,
          !unit.pos.x || !unit.pos.y,
          mySpawn.pos.x === unit.pos.x && mySpawn.pos.y === unit.pos.y,
        );
        if (!unit.pos.x || !unit.pos.y) continue;
        if (mySpawn.pos.x === unit.pos.x && mySpawn.pos.y === unit.pos.y) continue;
        unit.data.isSpawning = false;
      }
    }
  }
}
