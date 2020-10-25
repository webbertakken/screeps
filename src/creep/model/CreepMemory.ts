import { CreepRole } from './CreepRole';

declare global {
  interface CreepMemory {
    name: string;
    role: CreepRole;
  }
  type CreepMemoryObject = CreepMemory;
}

export class CreepMemory {
  public static get(name: string): CreepMemoryObject | undefined {
    return Memory.creeps?.[name];
  }

  public static delete(name: string): void {
    delete Memory.creeps[name];
  }

  public static init(name: string, memory: CreepMemoryObject) {
    if (!this.get(name)?.name) {
      _.set(Memory, `creeps.${name}`, this.create(name, memory));
    }
  }

  public static create(name: string, memory: CreepMemoryObject): CreepMemoryObject {
    return { ...memory, name };
  }

  static getRole(name: string) {
    return this.get(name)?.role;
  }
}
