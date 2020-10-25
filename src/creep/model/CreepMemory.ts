import { CreepRole } from './CreepRole';

declare global {
  interface CreepMemory {
    id: Id<Creep>;
    role?: CreepRole;
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

  public static init(id: Id<Creep>) {
    if (!this.get(id)) {
      _.set(Memory, `creeps.${id}`, this.create(id));
    }
  }

  public static create(id: Id<Creep>): CreepMemoryObject {
    return {
      id,
    };
  }

  static getRole(id: Id<Creep>) {
    return Memory.creeps[id]?.role;
  }
}
