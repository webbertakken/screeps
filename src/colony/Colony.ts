import { GlobalsInjector } from './component/GlobalsInjector';
import { BindingRehydrator } from './component/BindingRehydrator';
import { RoomManager } from '../room/RoomManager';
import { CreepManager } from '../creep/CreepManager';
import { FlagManager } from '../flag/FlagManager';
import { SpawnManager } from '../spawn/SpawnManager';
import { StructureManager } from '../structure/StructureManager';
import { Stage, ColonyMemory } from './model/ColonyMemory';
import { Strategies, StrategyMemory } from './strategy';
import { Unit } from '../creep/model/Unit';
import { Worker } from '../creep/model/Worker';
import { Soldier } from '../creep/model/Soldier';

export class Colony {
  public rooms: RoomManager[];
  public creeps: CreepManager[];
  public flags: FlagManager[];
  public spawns: SpawnManager[];
  public structures: StructureManager[];

  public myUnits: Unit[] = [];
  public enemyCreeps: Creep[] = [];
  public workers: Worker[] = [];
  public soldiers: Soldier[] = [];
  public enemies: { medics: Creep[]; uncategorised: Creep[]; rangers: Creep[]; melees: Creep[] } = {
    medics: [],
    uncategorised: [],
    rangers: [],
    melees: [],
  };
  public enemyCount: number = 0;
  public enemyStructures: (StructureTower | StructureExtension | StructureSpawn | StructureRampart)[] = [];
  public sources: Source[] = [];
  public myExtensions: StructureExtension[] = [];
  public mySpawn: StructureSpawn = {} as StructureSpawn;
  public myConstructionSites: ConstructionSite[] = [];
  public walls: StructureWall[] = [];
  public containers: StructureContainer[] = [];

  private globalsInjector: GlobalsInjector;
  private bindings: BindingRehydrator;

  private _stage?: Stage;
  public _strategy?: Strategies;

  public get stage(): Stage {
    if (this._stage === undefined) {
      this._stage = ColonyMemory.getStage();
    }

    return this._stage;
  }

  public get strategy(): Strategies {
    if (this._strategy === undefined) {
      this._strategy = StrategyMemory.getCurrent();
    }

    return this._strategy;
  }

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

  public loadInformation() {
    this.globalsInjector
      .injectFlags(Game.flags)
      .injectSpawns(Game.spawns)
      .injectStructures(Game.structures)
      .injectRooms(Game.rooms)
      .injectCreeps(Game.creeps);

    this.bindings.update([this.rooms, this.creeps, this.flags, this.spawns, this.structures]);
  }
}
