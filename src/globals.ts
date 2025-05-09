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
  // @ts-ignore
  global.Kernel = new Kernel();
  // @ts-ignore
  global.Colony = ColonyFactory.create();
};
