import { CreepRole } from './CreepRole';

declare global {
  interface CreepMemory {
    id: Id<Creep>;
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

  public static init(id: Id<Creep>, name: string, memory: CreepMemoryObject) {
    if (!this.get(name)?.id) {
      _.set(Memory, `creeps.${name}`, this.create(id, name, memory));
    }
  }

  public static create(id: Id<Creep>, name: string, memory: CreepMemoryObject): CreepMemoryObject {
    return { ...memory, id, name };
  }

  static getRole(name: string) {
    return this.get(name)?.role;
  }
}
