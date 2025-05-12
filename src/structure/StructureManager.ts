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
  public storesEnergy: boolean;

  public constructor(id: Id<Structure>, structure: Structure) {
    this.id = id;
    this.type = structure.structureType;
    this.structure = structure;
    this.roomName = structure.room.name;
    this.storesEnergy = (structure as StructureWithEnergyStore) !== null;
    StructureMemory.init(id, this.type);
  }

  public isMine(): boolean {
    return StructureManager.isOwnable(this.structure) && this.structure.my;
  }

  public isOwnable(): boolean {
    return StructureManager.isOwnable(this.structure);
  }

  private static isOwnable(structure: Structure): structure is AnyOwnedStructure {
    return (structure as AnyOwnedStructure) !== null;
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
