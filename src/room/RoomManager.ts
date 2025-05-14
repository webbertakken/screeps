import { IBinding } from '../colony/interface/IBinding';
import { RoomMemory } from './model/RoomMemory';
import { SpawnManager } from '../spawn/SpawnManager';
import { RoomTactician } from './tactics/RoomTactician';
import { StructureManager } from '../structure/StructureManager';

const energyBringPriority = [
  STRUCTURE_SPAWN,
  STRUCTURE_EXTENSION,
  STRUCTURE_TOWER,
  STRUCTURE_LAB,
  STRUCTURE_POWER_SPAWN,
  STRUCTURE_NUKER,
];

const energyBringSort = (
  a: StructureManager<StructureWithEnergyStore>,
  b: StructureManager<StructureWithEnergyStore>,
) => {
  const aPriority = energyBringPriority.indexOf(a.structure.structureType);
  const bPriority = energyBringPriority.indexOf(b.structure.structureType);

  if (aPriority !== bPriority) {
    return aPriority - bPriority;
  }

  return a.structure.store.getUsedCapacity(RESOURCE_ENERGY) - b.structure.store.getUsedCapacity(RESOURCE_ENERGY);
};

export class RoomManager implements IBinding {
  name: string;
  room: Room;
  spawns: SpawnManager[];
  structures: StructureManager[];

  private _myStructures: Structure[] = [];

  public constructor(name: string, room: Room, spawns: SpawnManager[], structures: StructureManager[]) {
    this.name = name;
    this.room = room;
    this.spawns = spawns;
    this.structures = structures;
    RoomMemory.init(name);
  }

  public run(): void {
    const instructions = RoomTactician.getInstructions();
    if (!instructions) {
      console.log(`No instructions were given for room ${this.room.name}`);
      return;
    }

    console.log(`Running instructions for room ${this.room.name}`);

    instructions.execute(this);
  }

  rehydrate(): void {
    const room = Game.rooms[this.name];

    if (!room) {
      const id = Colony.rooms.findIndex((manager) => manager.name === this.name);
      delete Colony.rooms[id];
      RoomMemory.delete(this.name);
      console.log(`Removed room ${this.name}`);
      return;
    }

    this.structures = Colony.structures.filter((structure) => structure.roomName === this.name);
    this.spawns = Colony.spawns.filter((spawn) => spawn.roomName === this.name);
    this.room = room;
  }

  public getMyStructures() {
    return this.structures.filter((s) => s.isMine());
  }

  public getStructuresThatStoreEnergy(): StructureManager<StructureWithEnergyStore | StructureController>[] {
    const structures = this.structures.filter(
      (s) => s.storesEnergy && s.isMine(),
    ) as StructureManager<StructureWithEnergyStore>[];

    const sortedStructuresThatNeedEnergy = structures
      .sort(energyBringSort)
      .filter((i) => i.structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);

    const controller = this.structures.find(
      (s) => s.type === STRUCTURE_CONTROLLER,
    ) as StructureManager<StructureController>;
    const priorityStructures: StructureManager<StructureWithEnergyStore | StructureController>[] =
      sortedStructuresThatNeedEnergy;

    // If controller is almost downgrading, put it at the front of the list, otherwise at the end
    controller.isMine() && controller.structure.ticksToDowngrade < 3100 // 3100 = 100 ticks before the email
      ? priorityStructures.unshift(controller)
      : priorityStructures.push(controller);

    // Bring order
    // console.log('bring order is now', priorityStructures.map((i) => i.structure.structureType));

    return priorityStructures;
  }

  public getSources(): Source[] {
    return this.room.find(FIND_SOURCES);
  }

  public getContainers() {
    return this.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return structure.structureType === STRUCTURE_CONTAINER;
      },
    });
  }
}
