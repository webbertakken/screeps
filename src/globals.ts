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
  // @ts-expect-error it's not picking up the global declaration
  global.Kernel = new Kernel();
  // @ts-expect-error it's not picking up the global declaration
  global.Colony = ColonyFactory.create();
};

Object.defineProperty(Array.prototype, 'flat', {
  value: function (depth = 1) {
    return this.reduce(function (flat: any, toFlatten: any) {
      return flat.concat(Array.isArray(toFlatten) && depth > 1 ? toFlatten.flat(depth - 1) : toFlatten);
    }, []);
  },
});
