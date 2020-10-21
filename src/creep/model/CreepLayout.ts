class CreepLayout {
  public static createHarvester(): BodyPartConstant[] {
    return [MOVE, CARRY, WORK];
  }

  public static createTruck(): BodyPartConstant[] {
    return [MOVE, MOVE, CARRY];
  }

  public static createBuilder(): BodyPartConstant[] {
    return [MOVE, CARRY, WORK];
  }
}

export { CreepLayout };
