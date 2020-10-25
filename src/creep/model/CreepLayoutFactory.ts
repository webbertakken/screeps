import { CreepLayout } from './CreepLayout';

class CreepLayoutFactory {
  public static createCheapInitialHybridHarvesterLayout(): CreepLayout {
    return [MOVE, CARRY, WORK];
  }

  public static createInitialDedicatedHarvesterLayout(): CreepLayout {
    return [MOVE, WORK];
  }

  public static createInitialUniversalBringerLayout(): CreepLayout {
    return [MOVE, CARRY, WORK];
  }
}

export { CreepLayoutFactory };
