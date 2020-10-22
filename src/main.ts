import { ErrorMapper } from 'utils/ErrorMapper';
import { initialise } from 'colony/initialise';
import { cleanup } from './colony/cleanup';
import { operations } from './colony/operations';
import { showStats } from './colony/showStats';

export const loop = ErrorMapper.wrapLoop(() => {
  initialise();
  cleanup();
  operations();
  showStats();
});
