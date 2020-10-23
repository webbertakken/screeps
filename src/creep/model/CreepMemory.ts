import { CreepRole } from './CreepRole';

declare global {
  interface CreepMemory {
    name: string;
    role: CreepRole;
  }
}

class CreepMemory {
  public static create(name: string, role: CreepRole): CreepMemory {
    return {
      name,
      role,
    };
  }

  public static delete(name: string): void {
    delete Memory.creeps[name];
  }
}

export { CreepMemory };
