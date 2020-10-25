import { Stage } from '../../colony/model/ColonyMemory';
import { IRoomTactic } from './IRoomTactic';
import { InitialSetup } from './generic/InitialSetup';
import { Strategies } from '../../colony/strategy';

const GenericTactics: { [k in Stage]: IRoomTactic | undefined } = {
  [Stage.TheBeginning]: InitialSetup,
};

export const Tactics: { [s in Strategies]: { [k in Stage]: IRoomTactic | undefined } } = {
  [Strategies.None]: GenericTactics,
};
