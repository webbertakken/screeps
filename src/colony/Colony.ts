import { ColonyMemory } from './model/ColonyMemory';
import { RoomManager } from '../room/RoomManager';
import { CreepManager } from '../creep/CreepManager';
import { GlobalsInjector } from './component/GlobalsInjector';
import { BindingRehydrator } from './component/BindingRehydrator';
import { FlagManager } from '../flag/FlagManager';
import { SpawnManager } from '../spawn/SpawnManager';
import { StructureManager } from '../structure/StructureManager';

export class Colony {
  public rooms: RoomManager[];
  public creeps: CreepManager[];
  public flags: FlagManager[];
  public spawns: SpawnManager[];
  public structures: StructureManager[];

  private globalsInjector: GlobalsInjector;
  private bindings: BindingRehydrator;

  public constructor() {
    this.rooms = [];
    this.creeps = [];
    this.flags = [];
    this.spawns = [];
    this.structures = [];
    this.globalsInjector = new GlobalsInjector(this);
    this.bindings = new BindingRehydrator();
    ColonyMemory.init();
  }

  public update() {
    this.globalsInjector
      .injectFlags(Game.flags)
      .injectSpawns(Game.spawns)
      .injectStructures(Game.structures)
      .injectRooms(Game.rooms)
      .injectCreeps(Game.creeps);

    this.bindings.update([this.rooms, this.creeps, this.flags, this.spawns, this.structures]);
  }

  public venture() {
    // Initial quick setup
    for (const room of this.rooms) {
      room.run();
    }

    for (const creep of this.creeps) {
      creep.performRole();
    }
  }
}
