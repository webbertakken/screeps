import { IBinding } from '../colony/interface/IBinding';
import { SpawnMemory } from './model/SpawnMemory';
import { CreepBlueprint } from '../creep/model/CreepBlueprint';
import { ImplementationException } from '../kernel/exceptions/ImplementationException';

export class SpawnManager implements IBinding {
  id: Id<StructureSpawn>;
  roomName: string;
  spawn: StructureSpawn;

  public constructor(id: Id<StructureSpawn>, spawn: StructureSpawn) {
    this.id = id;
    this.spawn = spawn;
    this.roomName = spawn.room.name;
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

  public build(blueprint: CreepBlueprint): boolean {
    if (!this.canBuild(blueprint)) {
      return false;
    }

    const { layout, name, role } = blueprint;
    const memory = { role, name };
    if (OK === this.spawn.spawnCreep(layout, name, { memory })) {
      return true;
    }

    throw new ImplementationException('Did not expect spawn to fail after canBuild check');
  }

  canBuild(blueprint: CreepBlueprint): boolean {
    const { layout, name } = blueprint;

    return OK === this.spawn.spawnCreep(layout, name, { dryRun: true });
  }
}
