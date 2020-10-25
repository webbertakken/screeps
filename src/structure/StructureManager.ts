import { IBinding } from '../colony/interface/IBinding';
import { StructureMemory } from './model/StructureMemory';
import { SpawnMemory } from '../spawn/model/SpawnMemory';

export class StructureManager implements IBinding {
  id: Id<Structure>;
  type: string;
  structure: Structure;
  isDead: boolean;

  public constructor(id: Id<Structure>, structure: Structure) {
    this.id = id;
    this.type = structure.structureType;
    this.structure = structure;
    this.isDead = false;
    StructureMemory.init(id, this.type);
  }

  rehydrate(): void {
    const structure = Game.getObjectById<Structure>(this.id);

    if (!structure) {
      const id = Colony.structures.findIndex((manager) => manager.id === this.id);
      delete Colony.structures[id];
      StructureMemory.delete(this.id);
      console.log(`Removed ${this.type} ${this.id}`);
      return;
    }

    this.structure = structure;
  }
}
