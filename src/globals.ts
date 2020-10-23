import { ColonyFactory } from './colony/ColonyFactory';
import { Colony } from './colony/Colony';

declare global {
  namespace NodeJS {
    interface Global {
      Colony: Colony;
      Creeps: Creep[];
      Flags: Flag[];
      Rooms: Room[];
      Structures: Structure[];
      Spawns: StructureSpawn[];
    }
  }
  let Colony: Colony;
  let Creeps: Creep[];
  let Flags: Flag[];
  let Rooms: Room[];
  let Structures: Structure[];
  let Spawns: StructureSpawn[];
}

export const init = () => {
  global.Colony = ColonyFactory.create();
};

export const updateGlobals = () => {
  global.Creeps = Object.values(Game.creeps);
  global.Flags = Object.values(Game.flags);
  global.Rooms = Object.values(Game.rooms);
  global.Structures = Object.values(Game.structures);
  global.Spawns = Object.values(Game.spawns);
};
