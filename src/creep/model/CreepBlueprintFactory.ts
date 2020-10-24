import { CreepBlueprint } from './CreepBlueprint';
import { CreepLayoutFactory } from './CreepLayoutFactory';

export class CreepBlueprintFactory {
  public static createCheapInitialHybridHarvesterBlueprint(): CreepBlueprint {
    return new CreepBlueprint('hybridHarvester', CreepLayoutFactory.createCheapInitialHybridHarvesterLayout());
  }

  public static createInitialDedicatedHarvesterBlueprint(): CreepBlueprint {
    return new CreepBlueprint('dedicatedHarvester', CreepLayoutFactory.createInitialDedicatedHarvesterLayout());
  }

  public static createInitialUniversalBringerBlueprint(): CreepBlueprint {
    return new CreepBlueprint('universalBringer', CreepLayoutFactory.createInitialUniversalBringerLayout());
  }
}
