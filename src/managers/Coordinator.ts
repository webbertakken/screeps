import { useMemory } from '../utils/useMemory';

export class Coordinator {
  static planConstructionSites() {
    const [getIsPlanned, setIsPlanned] = useMemory<boolean>('isConstructionPlanned', false);

    if (!getIsPlanned()) {
      const { mySpawn } = Colony;

      mySpawn.room.createConstructionSite(
        { ...mySpawn.pos, x: mySpawn.pos.x + 2, y: mySpawn.pos.y + 2 },
        STRUCTURE_EXTENSION,
      );

      mySpawn.room.createConstructionSite(
        { ...mySpawn.pos, x: mySpawn.pos.x - 2, y: mySpawn.pos.y - 2 },
        STRUCTURE_EXTENSION,
      );

      mySpawn.room.createConstructionSite(
        { ...mySpawn.pos, x: mySpawn.pos.x - 2, y: mySpawn.pos.y + 2 },
        STRUCTURE_EXTENSION,
      );

      mySpawn.room.createConstructionSite(
        { ...mySpawn.pos, x: mySpawn.pos.x + 2, y: mySpawn.pos.y - 2 },
        STRUCTURE_EXTENSION,
      );

      Colony.myConstructionSites = mySpawn.room.find(FIND_MY_CONSTRUCTION_SITES).filter((i) => i.my);
      setIsPlanned(true);
    }
  }
}
