import { CreepRole } from './CreepRole';

declare global {
  interface CreepMemory {
    name: string;
    role: CreepRole;
    task?: string;
    sourceId?: Id<Source>;
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
      Memory.creeps[name] = this.create(name, memory);
    }
  }

  public static create(name: string, memory: CreepMemoryObject): CreepMemoryObject {
    return { ...memory, name };
  }

  public static getRole(name: string) {
    return this.get(name)?.role;
  }

  public static getTask(creep: Creep): string | undefined {
    return creep.memory.task || undefined;
  }

  public static setTask(creep: Creep, task: string | undefined) {
    creep.memory.task = task;
  }
}
