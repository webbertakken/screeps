import { IBinding } from '../colony/interface/IBinding';
import { FlagMemory } from './model/FlagMemory';

export class FlagManager implements IBinding {
  name: string;
  flag: Flag;

  constructor(name: string, flag: Flag) {
    this.name = name;
    this.flag = flag;
  }

  rehydrate(): void {
    const flag = Game.flags[this.name];

    if (!flag) {
      const id = Colony.flags.findIndex((manager) => manager.name === this.name);
      delete Colony.flags[id];
      FlagMemory.delete(this.name);
      console.log(`Removed flag ${this.name}`);
      return;
    }

    this.flag = flag;
  }
}
