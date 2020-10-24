import { ColonyFactory } from './colony/ColonyFactory';
import { Colony } from './colony/Colony';
import { Kernel } from './kernel/Kernel';

declare global {
  namespace NodeJS {
    interface Global {
      Kernel: Kernel;
      Colony: Colony;
    }
  }
  let Kernel: Kernel;
  let Colony: Colony;
}

export const init = () => {
  global.Kernel = new Kernel();
  global.Colony = ColonyFactory.create();
};
