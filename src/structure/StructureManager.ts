import { IBinding } from '../colony/interface/IBinding';
import { StructureMemory } from './model/StructureMemory';
import { SpawnMemory } from '../spawn/model/SpawnMemory';

export type StructureWithEnergyStore =
  | StructureExtension
  | StructurePowerSpawn
  | StructureSpawn
  | StructureTower
  | StructureLab
  | StructureNuker;

export class StructureManager implements IBinding {
  public id: Id<Structure>;
  public type: string;
  public structure: Structure;
  public roomName: string;
  public owned: boolean;
  public storesEnergy: boolean;

  public constructor(id: Id<Structure>, structure: Structure) {
    this.id = id;
    this.type = structure.structureType;
    this.structure = structure;
    this.roomName = structure.room.name;
    this.owned = (structure as AnyOwnedStructure) !== null;
    this.storesEnergy = (structure as StructureWithEnergyStore) !== null;
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
