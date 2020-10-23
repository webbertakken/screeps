import { ErrorMapper } from 'utils/ErrorMapper';
import { Strategy } from './strategy';
import { init, updateGlobals } from './globals';
import { showStats } from './service/showStats';

init();

export const loop = ErrorMapper.wrapLoop(() => {
  updateGlobals();

  if (Colony.hasRespawned()) {
    Colony.reset();
    return;
  }

  Strategy.execute();

  showStats();
});
