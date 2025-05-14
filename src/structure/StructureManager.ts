import { IBinding } from '../colony/interface/IBinding';
import { StructureMemory } from './model/StructureMemory';

export type StructureWithEnergyStore =
  | StructureExtension
  | StructurePowerSpawn
  | StructureSpawn
  | StructureTower
  | StructureLab
  | StructureNuker;

export class StructureManager<T extends Structure | OwnedStructure = Structure> implements IBinding {
  public id: Id<Structure>;
  public type: string;
  public structure: T;
  public roomName: string;
  public storesEnergy: boolean;

  public constructor(id: Id<T>, structure: T) {
    this.id = id;
    this.type = structure.structureType;
    this.structure = structure;
    this.roomName = structure.room.name;
    this.storesEnergy = typeof (structure as StructureWithEnergyStore).store !== 'undefined';
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
    const structure = Game.getObjectById<Structure>(this.id) as T;

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
