import { IBinding } from '../colony/interface/IBinding';
import { SpawnMemory } from './model/SpawnMemory';

export class SpawnManager implements IBinding {
  id: Id<StructureSpawn>;
  roomName: string;
  spawn: StructureSpawn;
  isDead: boolean;

  public constructor(id: Id<StructureSpawn>, spawn: StructureSpawn) {
    this.id = id;
    this.spawn = spawn;
    this.roomName = spawn.room.name;
    this.isDead = false;
    SpawnMemory.init(id);
  }

  rehydrate(): void {
    const spawn = Game.getObjectById<StructureSpawn>(this.id);

    if (!spawn) {
      const id = Colony.spawns.findIndex((manager) => manager.id === this.id);
      delete Colony.spawns[id];
      SpawnMemory.delete(this.id);
      console.log(`Removed spawn ${this.id}`);
      return;
    }

    this.spawn = spawn;
  }
}
